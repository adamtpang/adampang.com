'use client';

import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-paper/70 dark:bg-ink/70 border-b border-ink/5 dark:border-paper/5"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="font-display text-base tracking-tighter text-ink dark:text-paper"
          aria-label="adampang.com home"
        >
          adam<span className="text-sunrise">.</span>
        </a>

        <nav className="flex items-center gap-1 md:gap-2 text-sm">
          <a
            href="/work"
            className="px-3 py-2 rounded-full text-ink/70 dark:text-paper/70 hover:text-sunrise transition-colors"
          >
            work
          </a>
          <a
            href="/ns"
            className="px-3 py-2 rounded-full text-ink/70 dark:text-paper/70 hover:text-sunrise transition-colors"
          >
            ns
          </a>
          <a
            href="https://adampang.substack.com"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-full text-ink/70 dark:text-paper/70 hover:text-sunrise transition-colors"
          >
            pangaea
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}
