import type { Config } from 'tailwindcss';

/**
 * adampang.com design tokens — "Clean Card-Based Minimal."
 * Imported from the adampang design system (claude design export).
 *
 * Light: faint cool gradient, near-white cards, #1a1a1a ink, one blue accent.
 * Dark:  near-black, #141414 cards, #fafafa text, lifted blue accent.
 *
 * Token names are kept stable so components don't churn; values now map to
 * the design-system palette. `sunrise` is the legacy alias for the blue
 * primary. Per-section accent hues come from the DS /work palette.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'], // Space Grotesk
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'], // Lato
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'], // JetBrains Mono
      },
      colors: {
        // Primary blue (DS --primary). `sunrise` is the legacy alias used by
        // CTAs, links, hover borders, focus rings across components.
        sunrise: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        primary: '#2563eb',

        // DS /work accent palette — each section owns exactly one hue.
        amber: '#f59e0b',
        sky: '#38bdf8',
        green: '#34d399',
        purple: '#c084fc',
        pink: '#f472b6',
        red: '#ef4444',

        // Legacy accent aliases (kept so existing components resolve),
        // mapped onto the DS accent palette.
        sun: '#f59e0b', // amber  — header sigil, highlights
        leaf: '#34d399', // green  — live status
        plum: '#c084fc', // purple — sounds
        ember: '#ef4444', // red

        // Bento section accents (one DS hue each).
        fire: '#f59e0b', // sights      — amber
        water: '#38bdf8', // sounds      — sky
        air: '#34d399', // curiosity   — green
        earth: '#c084fc', // creativity  — purple

        // Neutrals — DS foreground / card / muted.
        ink: {
          DEFAULT: '#1a1a1a', // primary text (light)
          soft: '#141414', // card surface (dark)
          muted: '#64748b', // secondary text, captions
          faint: '#94a3b8',
        },
        paper: {
          DEFAULT: '#fafafa', // page bg / primary text (dark)
          soft: '#f1f5f9',
          muted: '#e2e8f0', // borders
        },
        line: '#e2e8f0', // DS --border (light)
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
        'card-md': '0 4px 6px rgba(0,0,0,.05), 0 2px 4px rgba(0,0,0,.03)',
        'card-lg': '0 10px 25px rgba(0,0,0,.06), 0 4px 10px rgba(0,0,0,.04)',
      },
      letterSpacing: {
        tightest: '-0.02em',
        tighter: '-0.01em',
        label: '0.12em',
      },
      animation: {
        'fade-up': 'fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
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
