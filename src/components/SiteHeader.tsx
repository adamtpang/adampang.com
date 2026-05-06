'use client';

import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Tiny strip at the top of the page. Name + who/what/where caption
 * on the left, the few essential links + theme toggle on the right.
 * The four bentos below are the substance.
 */
export default function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-block h-2 w-2 rounded-full bg-sun" />
        <span className="font-display text-lg tracking-tight text-ink dark:text-paper">
          Adam <span className="italic text-sunrise">Pang</span>
        </span>
        <span className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-ink/45 dark:text-paper/45 sm:inline">
          builder . writer . musician at{' '}
          <a
            href="https://ns.com/adam/invite"
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink/70 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:text-paper/70 dark:decoration-paper/15"
          >
            ns.com
          </a>
        </span>
      </div>
      <nav className="flex items-center gap-3 text-sm text-ink/70 dark:text-paper/70">
        <a
          href="mailto:adamtpang@gmail.com"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15"
        >
          email
        </a>
        <a
          href="https://pangaea.blog"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15"
        >
          pangaea
        </a>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
