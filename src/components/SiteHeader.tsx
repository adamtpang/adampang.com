'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Tiny strip at the top of the page. Name + who/what/where caption
 * on the left, the few essential links + theme toggle on the right.
 * The four bentos below are the substance.
 *
 * `asH1` promotes the name to the page's <h1>. The homepage sets it,
 * because it has no other title element and was shipping with zero
 * headings at all. Every other route has its own <h1>, so they leave it
 * off and the name stays a <span>: one h1 per page, always.
 */
export default function SiteHeader({ asH1 = false }: { asH1?: boolean }) {
  const NameTag = asH1 ? 'h1' : 'span';

  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-block h-2 w-2 rounded-full bg-sun" />
        <NameTag className="font-display text-lg tracking-tight text-ink dark:text-paper">
          Adam <span className="italic text-sunrise">Pang</span>
        </NameTag>
        <span className="hidden items-baseline gap-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-faint sm:inline-flex">
          {[
            { tag: 'who', label: 'pokedex.life', href: 'https://pokedex.life', color: 'hover:text-sunrise hover:decoration-sunrise' },
            { tag: 'what', label: 'optimism.fun', href: 'https://optimism.fun', color: 'hover:text-sky hover:decoration-sky' },
            { tag: 'where', label: 'interneta.world', href: 'https://interneta.world', color: 'hover:text-plum hover:decoration-plum' },
          ].map((x, i) => (
            <span key={x.tag} className="inline-flex items-baseline gap-1">
              {i > 0 && <span className="text-faint">.</span>}
              <span>{x.tag}</span>
              <a
                href={x.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`text-muted underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors dark:decoration-paper/20 ${x.color}`}
              >
                {x.label}
              </a>
            </span>
          ))}
        </span>
      </div>
      <nav
        aria-label="Site"
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/70 dark:text-paper/70"
      >
        {[
          { label: 'about', href: '/about', ext: false },
          { label: 'now', href: '/now', ext: false },
          { label: 'email', href: 'mailto:adamtpang@gmail.com', ext: false },
          { label: 'cal', href: 'https://cal.com/adamtpang', ext: true },
          { label: 'linkedin', href: 'https://linkedin.com/in/adamtpang', ext: true },
          { label: 'pangaea', href: 'https://pangaea.blog', ext: true },
          { label: 'support', href: '/support', ext: false },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.ext ? '_blank' : undefined}
            rel={l.ext ? 'noreferrer noopener' : undefined}
            className="group inline-flex items-baseline gap-0.5 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15"
          >
            <span>{l.label}</span>
            {l.ext && (
              <ArrowUpRight size={10} aria-hidden className="opacity-40 transition-opacity group-hover:opacity-100" />
            )}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
