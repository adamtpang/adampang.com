export const themes = {
  light: {
    background: '#ffffff',
    text: '#1a1a1a',
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF2D55'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF375F'
  }
} as const;

export type Theme = keyof typeof themes;
export type ThemeColors = typeof themes[Theme];