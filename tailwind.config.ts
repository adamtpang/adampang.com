import type { Config } from 'tailwindcss';
import tokens from './src/design/tokens.json';

/**
 * adampang.com theme, generated from src/design/tokens.json.
 *
 * Two families of color utility live here:
 *
 *   Semantic, mode-aware (fg, muted, faint, card, line, accent, sights...).
 *   These resolve through CSS custom properties, so `text-muted` is correct
 *   in both themes and needs no dark: twin. Prefer these.
 *
 *   Legacy aliases (ink, paper, sunrise, fire, water, air, earth...). Static
 *   hexes, kept so the existing `text-ink dark:text-paper` pattern across the
 *   site keeps working. Their values still come from tokens.json, so there is
 *   no second source of truth.
 *
 * Never write a raw hex in this file. Add it to tokens.json instead.
 */

const c = tokens.color;

/**
 * Flatten color.<group>.<name> into mode-aware Tailwind entries.
 *
 * Deliberately inlined rather than imported from src/design/tokens.ts:
 * Tailwind loads this config through jiti, which cannot follow a .ts file
 * that imports JSON. Only the flattening is duplicated. The values still
 * come from tokens.json alone, and scripts/verify-tokens.mjs asserts that
 * this output matches the app-side generator exactly.
 */
const semanticColors: Record<string, string> = Object.fromEntries(
  Object.values(c).flatMap((group) =>
    Object.keys(group).map((name) => [
      name,
      `rgb(var(--color-${name}) / <alpha-value>)`,
    ])
  )
);

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Semantic + mode-aware. One class, correct in both themes.
        ...semanticColors,

        // Accent ramp. Components use sunrise-600 for hover fills.
        sunrise: { DEFAULT: c.brand.accent.light, ...tokens.ramp.accent },
        primary: c.brand.accent.light,

        // Legacy neutral aliases.
        ink: {
          DEFAULT: c.content.fg.light,
          soft: c.surface.card.dark,
          muted: c.content.muted.light,
          faint: c.content.faint.light,
        },
        paper: {
          DEFAULT: c.content.fg.dark,
          soft: c.surface.sunken.light,
          muted: c.surface.line.light,
        },

        // Legacy section-accent aliases.
        fire: c.section.sights.light,
        water: c.section.sounds.light,
        air: c.section.curiosity.light,
        earth: c.section.creativity.light,
        sun: c.section.sights.light,
        leaf: c.section.curiosity.light,
        plum: c.section.creativity.light,
        ember: c.section.alert.light,

        // Legacy raw-hue aliases.
        amber: c.section.sights.light,
        sky: c.section.sounds.light,
        green: c.section.curiosity.light,
        purple: c.section.creativity.light,
        red: c.section.alert.light,
        pink: '#f472b6',
      },
      borderRadius: {
        sm: tokens.radius.sm.value,
        DEFAULT: tokens.radius.md.value,
        lg: tokens.radius.lg.value,
      },
      boxShadow: {
        card: tokens.shadow.card.value,
        'card-md': tokens.shadow['card-md'].value,
        'card-lg': tokens.shadow['card-lg'].value,
      },
      letterSpacing: {
        tightest: tokens.type.tracking.tightest.value,
        tighter: tokens.type.tracking.tighter.value,
        label: tokens.type.tracking.label.value,
      },
      transitionTimingFunction: {
        brand: tokens.motion.ease.value,
      },
      animation: {
        'fade-up': `fadeUp ${tokens.motion['duration-reveal'].value} ${tokens.motion.ease.value} both`,
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
