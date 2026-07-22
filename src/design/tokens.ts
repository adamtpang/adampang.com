/**
 * Typed accessors and generators over src/design/tokens.json.
 *
 * tokens.json holds the values. This file is the only place that knows how
 * to turn them into the three shapes the site needs:
 *
 *   cssVarBlock()   the :root / .dark custom properties injected in <head>
 *   buildTokensCss()  the downloadable /design/tokens.css
 *   buildTokensJson() the downloadable /design/tokens.json
 *
 * The /design page and tailwind.config.ts also import from here, so a hex
 * exists in exactly one place in the repo.
 */

import raw from './tokens.json';

export const tokens = raw;

export type Mode = 'light' | 'dark';

export type ColorToken = {
  /** Group in tokens.json, e.g. "surface". */
  group: string;
  /** Token name, e.g. "card". Unique across all groups. */
  name: string;
  /** The machine name shown on /design and used in CSS, e.g. "--color-card". */
  cssVar: string;
  light: string;
  dark: string;
  role: string;
};

/** Flatten color.<group>.<name> into an ordered list. */
export const colorTokens: ColorToken[] = Object.entries(raw.color).flatMap(
  ([group, entries]) =>
    Object.entries(entries as Record<string, { light: string; dark: string; role: string }>).map(
      ([name, t]) => ({
        group,
        name,
        cssVar: `--color-${name}`,
        light: t.light,
        dark: t.dark,
        role: t.role,
      })
    )
);

export const colorGroups = [...new Set(colorTokens.map((t) => t.group))];

/** "#2563eb" -> "37 99 235", the space-separated form Tailwind needs for /alpha. */
export function rgbTriplet(hex: string): string {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)).join(' ');
}

/**
 * A Tailwind color value that reads the custom property and still supports
 * opacity modifiers (text-muted/70). Mode-aware for free: the .dark block
 * swaps the variable, so one utility class works in both themes.
 */
export function varColor(name: string): string {
  return `rgb(var(--color-${name}) / <alpha-value>)`;
}

/** Every color token as Tailwind `colors` entries, keyed by token name. */
export function tailwindSemanticColors(): Record<string, string> {
  return Object.fromEntries(colorTokens.map((t) => [t.name, varColor(t.name)]));
}

/* ---------- CSS generation ---------- */

const declarations = (mode: Mode) =>
  colorTokens
    .map((t) => `    ${t.cssVar}: ${rgbTriplet(t[mode])}; /* ${t[mode]} */`)
    .join('\n');

const scalarBlock = (
  label: string,
  prefix: string,
  entries: Record<string, { value: string; role: string }>
) =>
  `  /* ${label} */\n` +
  Object.entries(entries)
    .map(([k, v]) => `    --${prefix}-${k}: ${v.value};`)
    .join('\n');

/** The :root and .dark custom-property block injected into <head>. */
export function cssVarBlock(): string {
  return `:root{\n${declarations('light')}\n}\n.dark{\n${declarations('dark')}\n}`;
}

/**
 * The full downloadable stylesheet. Same values as buildTokensJson, generated
 * from the same source in the same process, so the two cannot disagree.
 */
export function buildTokensCss(): string {
  const t = raw as typeof raw;
  return [
    `/* ${t.meta.name} v${t.meta.version}`,
    ` * ${t.meta.description}`,
    ` *`,
    ` * Generated from ${t.meta.source}. Do not edit by hand.`,
    ` * Machine-readable twin: https://adampang.com/design/tokens.json`,
    ` */`,
    ``,
    `:root {`,
    `  /* color . light */`,
    declarations('light'),
    ``,
    scalarBlock('type family', 'font', t.type.family as never),
    ``,
    `  /* type scale */`,
    Object.entries(t.type.scale)
      .map(([k, v]) => `    --text-${k}: ${v.size};\n    --leading-${k}: ${v.leading};`)
      .join('\n'),
    ``,
    scalarBlock('tracking', 'tracking', t.type.tracking as never),
    ``,
    scalarBlock('space', 'space', t.space as never),
    ``,
    scalarBlock('radius', 'radius', t.radius as never),
    ``,
    scalarBlock('shadow', 'shadow', t.shadow as never),
    ``,
    scalarBlock('motion', 'motion', t.motion as never),
    `}`,
    ``,
    `.dark {`,
    `  /* color . dark */`,
    declarations('dark'),
    `}`,
    ``,
    `@media (prefers-reduced-motion: reduce) {`,
    `  :root {`,
    `    --motion-duration-micro: 0ms;`,
    `    --motion-duration-state: 0ms;`,
    `    --motion-duration-reveal: 0ms;`,
    `    --motion-lift: 0px;`,
    `  }`,
    `}`,
    ``,
  ].join('\n');
}

/** The downloadable JSON. Adds resolved rgb triplets and the css var name. */
export function buildTokensJson() {
  const t = raw as typeof raw;
  return {
    $comment: `Generated from ${t.meta.source}. CSS twin: /design/tokens.css`,
    meta: t.meta,
    color: Object.fromEntries(
      colorGroups.map((g) => [
        g,
        Object.fromEntries(
          colorTokens
            .filter((c) => c.group === g)
            .map((c) => [
              c.name,
              {
                cssVar: c.cssVar,
                light: c.light,
                dark: c.dark,
                lightRgb: rgbTriplet(c.light),
                darkRgb: rgbTriplet(c.dark),
                role: c.role,
              },
            ])
        ),
      ])
    ),
    ramp: t.ramp,
    type: t.type,
    space: t.space,
    radius: t.radius,
    shadow: t.shadow,
    motion: t.motion,
  };
}
