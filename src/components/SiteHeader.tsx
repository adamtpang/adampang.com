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
        <span className="hidden items-baseline gap-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40 sm:inline-flex">
          {[
            { tag: 'who', label: 'pokedex.life', href: 'https://pokedex.life', color: 'hover:text-sunrise hover:decoration-sunrise' },
            { tag: 'what', label: 'optimism.fun', href: 'https://optimism.fun', color: 'hover:text-sky hover:decoration-sky' },
            { tag: 'where', label: 'interneta.world', href: 'https://interneta.world', color: 'hover:text-plum hover:decoration-plum' },
          ].map((x, i) => (
            <span key={x.tag} className="inline-flex items-baseline gap-1">
              {i > 0 && <span className="text-ink/25 dark:text-paper/25">.</span>}
              <span>{x.tag}</span>
              <a
                href={x.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`text-ink/65 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors dark:text-paper/65 dark:decoration-paper/20 ${x.color}`}
              >
                {x.label}
              </a>
            </span>
          ))}
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
        <a
          href="/support"
          className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15"
        >
          support
        </a>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
