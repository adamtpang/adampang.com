'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Light/dark toggle with Lucide icons. Reads current state from
 * the html element (set by the boot script in layout.tsx before
 * paint). Click flips and persists to localStorage.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };

  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-ink/70 transition-colors hover:border-sun hover:text-sun dark:border-paper/15 dark:bg-ink/40 dark:text-paper/70"
    >
      <Icon size={13} strokeWidth={2} />
    </button>
  );
}
