import type { Config } from 'tailwindcss';

/**
 * adampang.com design tokens
 * Signature color: Pacific Sunrise #FF5C39
 *
 * Light mode: warm white, deep ink, sunrise accent
 * Dark mode: deep neutral, off-white, sunrise accent (slightly desaturated for dark contrast)
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        // wired up via next/font in layout.tsx; these are the CSS var names
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Signature
        sunrise: {
          DEFAULT: '#FF5C39',
          50: '#FFF1ED',
          100: '#FFE0D5',
          200: '#FFC1AB',
          300: '#FFA181',
          400: '#FF8257',
          500: '#FF5C39',
          600: '#E04420',
          700: '#B23318',
          800: '#852511',
          900: '#57180B',
        },
        // Rainbow accent palette. Each color has a clear role on
        // white. Used as section sigils, status pills, hover accents,
        // and category badges. Sunrise (#FF5C39) is the primary;
        // these are the partner accents.
        sky: '#2563EB', // blue
        leaf: '#10B981', // green
        ember: '#EF4444', // red
        sun: '#F59E0B', // yellow / amber
        plum: '#8B5CF6', // purple
        // Warm-only partners (kept for gradients + the splash).
        peach: '#FFB69E',
        coral: '#FF8970',
        amber: '#F59E0B',
        dawn: '#FFD2B8',
        rose: '#FFA999',
        // Neutrals. Paper feel in light, deep slate in dark.
        ink: {
          DEFAULT: '#0E0E0C',
          soft: '#1F1F1C',
          muted: '#6B6B66',
          faint: '#A8A8A2',
        },
        paper: {
          DEFAULT: '#FFFFFF', // pure white canvas
          soft: '#FAFAF7',
          muted: '#F2F1ED',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.025em',
      },
      animation: {
        'fade-up': 'fadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) both',
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
