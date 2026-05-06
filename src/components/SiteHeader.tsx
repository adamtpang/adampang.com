'use client';

import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Tiny strip at the top of the page. Name on the left, the few
 * essential links on the right. The four bentos below are the
 * substance.
 */
export default function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <div className="flex items-baseline gap-3">
        <span className="relative top-[-2px] inline-block h-1.5 w-1.5 rounded-full bg-sun" />
        <span className="font-display text-lg tracking-tight text-ink">
          Adam <span className="italic text-sunrise">Pang</span>
        </span>
        <span className="nums hidden text-[0.65rem] uppercase tracking-[0.22em] text-ink/45 sm:inline">
          23 . langkawi
        </span>
      </div>
      <nav className="flex items-baseline gap-3 text-sm text-ink/70">
        <a
          href="mailto:adamtpang@gmail.com"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
        >
          email
        </a>
        <a
          href="/ns"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
        >
          ns
        </a>
        <a
          href="https://pangaea.blog"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
        >
          pangaea
        </a>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
