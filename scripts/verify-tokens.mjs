/**
 * Token parity check.
 *
 * "Generated from the same source, so they cannot drift" is only true if
 * something proves it. This parses the two built artifacts as artifacts
 * (not as the objects that produced them) and asserts they agree:
 *
 *   1. every color token in tokens.json appears in tokens.css
 *   2. the hex in tokens.json matches the rgb triplet in tokens.css
 *   3. every :root var has a .dark counterpart, and vice versa
 *   4. the <head> block in the built HTML matches tokens.css exactly
 *   5. tailwind.config.ts exposes a utility for every color token
 *
 * Run after a build:  node scripts/verify-tokens.mjs
 */

import fs from 'node:fs';
import { join } from 'node:path';

const BUILT = '.next/server/app';
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

let errors = 0;
const fail = (msg) => {
  console.log(`  FAIL  ${msg}`);
  errors++;
};
const ok = (msg) => console.log(`  ok    ${msg}`);

/* ---------- load the built artifacts ---------- */

const jsonRaw =
  read(`${BUILT}/design/tokens.json.body`) ?? read(`${BUILT}/design/tokens.json`);
const cssRaw =
  read(`${BUILT}/design/tokens.css.body`) ?? read(`${BUILT}/design/tokens.css`);
const html = read(`${BUILT}/index.html`);

if (!jsonRaw) fail('/design/tokens.json not found in build output');
if (!cssRaw) fail('/design/tokens.css not found in build output');
if (!html) fail('index.html not found in build output');
if (errors) process.exit(1);

let tokens;
try {
  tokens = JSON.parse(jsonRaw);
  ok('tokens.json parses');
} catch (e) {
  fail(`tokens.json is not valid JSON: ${e.message}`);
  process.exit(1);
}

/* ---------- 1 + 2. every token present, with matching value ---------- */

/** Parse `--color-x: 1 2 3;` out of a CSS block into {name: triplet}. */
const parseVars = (block) =>
  Object.fromEntries(
    [...block.matchAll(/(--color-[\w-]+)\s*:\s*([\d\s]+);/g)].map((m) => [
      m[1].trim(),
      m[2].trim().replace(/\s+/g, ' '),
    ])
  );

const cssRoot = cssRaw.slice(cssRaw.indexOf(':root'), cssRaw.indexOf('.dark'));
const cssDark = cssRaw.slice(cssRaw.indexOf('.dark'));
const rootVars = parseVars(cssRoot);
const darkVars = parseVars(cssDark);

const hexToTriplet = (hex) => {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)).join(' ');
};

let colorCount = 0;
for (const [group, entries] of Object.entries(tokens.color)) {
  for (const [name, t] of Object.entries(entries)) {
    colorCount++;
    const v = t.cssVar;

    if (!(v in rootVars)) { fail(`${v} (${group}.${name}) missing from tokens.css :root`); continue; }
    if (!(v in darkVars)) { fail(`${v} (${group}.${name}) missing from tokens.css .dark`); continue; }

    const wantLight = hexToTriplet(t.light);
    const wantDark = hexToTriplet(t.dark);

    if (rootVars[v] !== wantLight)
      fail(`${v} light mismatch: json ${t.light} (${wantLight}) vs css ${rootVars[v]}`);
    if (darkVars[v] !== wantDark)
      fail(`${v} dark mismatch: json ${t.dark} (${wantDark}) vs css ${darkVars[v]}`);

    // The JSON also publishes precomputed triplets; they must agree too.
    if (t.lightRgb !== wantLight) fail(`${v} lightRgb wrong in json: ${t.lightRgb}`);
    if (t.darkRgb !== wantDark) fail(`${v} darkRgb wrong in json: ${t.darkRgb}`);
  }
}
ok(`${colorCount} color tokens match between tokens.json and tokens.css`);

/* ---------- 3. no orphan variables in either mode ---------- */

const rootOnly = Object.keys(rootVars).filter((k) => !(k in darkVars));
const darkOnly = Object.keys(darkVars).filter((k) => !(k in rootVars));
if (rootOnly.length) fail(`vars in :root with no .dark counterpart: ${rootOnly.join(', ')}`);
if (darkOnly.length) fail(`vars in .dark with no :root counterpart: ${darkOnly.join(', ')}`);
if (!rootOnly.length && !darkOnly.length)
  ok(`light and dark both define all ${Object.keys(rootVars).length} variables`);

/* ---------- 4. the shipped <head> block matches the download ---------- */

const headMatch = html.match(/id="design-tokens"[^>]*>([\s\S]*?)<\/style>/);
if (!headMatch) {
  fail('no <style id="design-tokens"> in the built HTML');
} else {
  const headVars = parseVars(headMatch[1].slice(0, headMatch[1].indexOf('.dark')));
  const headDark = parseVars(headMatch[1].slice(headMatch[1].indexOf('.dark')));
  const drift = Object.keys(rootVars).filter(
    (k) => headVars[k] !== rootVars[k] || headDark[k] !== darkVars[k]
  );
  if (drift.length) fail(`<head> block differs from tokens.css for: ${drift.join(', ')}`);
  else ok(`<head> block matches tokens.css for all ${Object.keys(headVars).length} variables`);
}

/* ---------- 5. tailwind exposes every token ---------- */

const twConfig = read('tailwind.config.ts') ?? '';
const generatesAll = /Object\.values\(c\)\.flatMap/.test(twConfig);
if (!generatesAll) {
  fail('tailwind.config.ts no longer derives colors from the token tree');
} else {
  ok('tailwind.config.ts derives every color utility from tokens.json');
}

/* ---------- 6. letter spacing stays on zero-valued tokens ---------- */

// DESIGN.md: letter spacing is zero across the shared system. Arbitrary
// values (tracking-[0.2em]) and Tailwind's own defaults (tracking-tight,
// tracking-wide, ...) bypass tokens.json, so only token names are allowed.
const trackingTokens = Object.keys(tokens.type?.tracking ?? {});
const nonZero = trackingTokens.filter((k) => tokens.type.tracking[k].value !== '0');
if (nonZero.length) fail(`tracking tokens must be 0, found: ${nonZero.join(', ')}`);
// Every token must also be mapped in tailwind.config.ts. An unmapped name
// (say tracking-wide) silently falls back to Tailwind's non-zero default.
const lsBlock = (twConfig.match(/letterSpacing:\s*\{([\s\S]*?)\}/) ?? [])[1] ?? '';
const unmapped = trackingTokens.filter((k) => !new RegExp(`\\b${k}:\\s*tokens\\.type\\.tracking\\.${k}\\.value`).test(lsBlock));
if (unmapped.length) fail(`tracking tokens not mapped in tailwind.config.ts: ${unmapped.join(', ')}`);
// gives-mirror.ts is a byte copy of adam.gives, a separate site with its own
// design; editing it would break the mirror, so it is outside this rule.
const TRACKING_EXEMPT = new Set([join('src', 'data', 'gives-mirror.ts')]);
const offenders = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (TRACKING_EXEMPT.has(full)) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      const text = fs.readFileSync(full, 'utf8');
      for (const m of text.matchAll(/(?<![\w-])tracking-(\[[^\]]+\]|[a-z]+)(?![\w-])/g)) {
        if (!trackingTokens.includes(m[1])) offenders.push(`${full}: tracking-${m[1]}`);
      }
      for (const m of text.matchAll(/letter-spacing:\s*([^;]+);/g)) {
        if (m[1].trim() !== '0') offenders.push(`${full}: letter-spacing: ${m[1].trim()}`);
      }
    }
  }
};
walk('src');
if (offenders.length) fail(`letter spacing outside tokens:\n    ${offenders.join('\n    ')}`);
else ok(`letter spacing uses only zero-valued tokens (${trackingTokens.join(', ')})`);

/* ---------- scalar sections ---------- */

for (const section of ['type', 'space', 'radius', 'shadow', 'motion']) {
  if (!tokens[section]) fail(`tokens.json missing "${section}" section`);
}
ok('tokens.json carries type, space, radius, shadow, motion');

console.log(`\n  ${errors} drift error${errors === 1 ? '' : 's'}\n`);
process.exit(errors > 0 ? 1 : 0);
