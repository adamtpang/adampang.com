/**
 * WCAG 2.1 contrast verifier.
 *
 * Reads src/design/tokens.json (the single source of truth) and measures
 * every foreground/background pair listed in its `contrast` array,
 * including the alpha-composited ones (text-fg/70 and friends), which are
 * the pairs most likely to fail.
 *
 *   node scripts/contrast.mjs           report every pair
 *   node scripts/contrast.mjs --fail    exit 1 if any non-decorative pair fails
 *   node scripts/contrast.mjs --legacy  measure the pre-token values instead
 *
 * AA needs 4.5:1 for body text, 3:1 for large text and non-text UI.
 */

import tokens from '../src/design/tokens.json' with { type: 'json' };

/** The values the site shipped with, before the token pass. For the before/after. */
const LEGACY = {
  'content.muted': { light: '#64748b', dark: '#a1a1aa' },
  'content.faint': { light: '#94a3b8', dark: '#8b8b93' },
  'brand.accent-ink': { light: '#2563eb', dark: '#60a5fa' },
};

const legacy = process.argv.includes('--legacy');
const strict = process.argv.includes('--fail');

/* ---------- color math ---------- */

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};

const toHex = (rgb) =>
  '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');

/** Composite a foreground at `alpha` over an opaque background. */
const composite = (fgHex, alpha, bgHex) => {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  return toHex(fg.map((c, i) => c * alpha + bg[i] * (1 - alpha)));
};

/** WCAG 2.1 relative luminance. */
const luminance = (hex) =>
  hexToRgb(hex)
    .map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    })
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);

const ratio = (a, b) => {
  const [la, lb] = [luminance(a), luminance(b)];
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

/* ---------- resolve "group.token" against the token tree ---------- */

const resolve = (path, mode) => {
  if (legacy && LEGACY[path]) return LEGACY[path][mode];
  const [group, name] = path.split('.');
  const token = tokens.color[group]?.[name];
  if (!token) throw new Error(`unknown token: ${path}`);
  return token[mode];
};

/* ---------- report ---------- */

let failures = 0;

const rows = tokens.contrast.map((p) => {
  // A tinted fill (badge, chip) paints hue-at-alpha over the surface, and the
  // label then sits on THAT, not on the surface. Resolve the tint first.
  // Missing this is how the "live" badge shipped at 1.92:1.
  const surface = resolve(p.bg, p.mode);
  const bg = p.tint
    ? composite(resolve(p.tint.of, p.mode), p.tint.alpha, surface)
    : surface;

  const raw = resolve(p.fg, p.mode);
  // Resolve alpha pairs to the flat color the browser actually paints.
  const fg = p.alpha ? composite(raw, p.alpha, bg) : raw;
  const r = ratio(fg, bg);
  const need = p.large || p.decorative ? 3 : 4.5;
  const pass = r >= need;
  if (!pass && !p.decorative) failures++;
  return { ...p, fg, bg, r, need, pass };
});

const pad = (s, n) => String(s).padEnd(n);

console.log(`\n  ${legacy ? 'LEGACY (pre-token) values' : 'TOKEN values'}\n`);
console.log(
  '  ' + pad('MODE', 7) + pad('PAIR', 26) + pad('FG', 10) +
  pad('BG', 10) + pad('RATIO', 9) + pad('NEED', 6) + 'RESULT'
);
console.log('  ' + '-'.repeat(74));

for (const r of rows) {
  console.log(
    '  ' + pad(r.mode, 7) + pad(r.label, 26) + pad(r.fg, 10) + pad(r.bg, 10) +
    pad(r.r.toFixed(2) + ':1', 9) + pad(r.need.toFixed(1), 6) +
    (r.pass ? 'PASS' : r.decorative ? 'below 3.0 (decorative, exempt)' : 'FAIL')
  );
}

console.log('  ' + '-'.repeat(74));
console.log(
  `  ${rows.length} pairs . ${rows.filter((r) => r.pass).length} pass . ` +
  `${failures} blocking failure${failures === 1 ? '' : 's'}\n`
);

if (strict && failures > 0) process.exit(1);
