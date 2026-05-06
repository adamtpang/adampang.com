'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { reading, curiosityLinks } from '@/data/curiosities';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Curiosities() {
  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sky" />
          <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
            curiosities
          </h2>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/40 dark:text-paper/40">
          on audible
        </span>
      </div>

      <ul className="mb-5 space-y-1.5">
        {reading.map((book, i) => (
          <motion.li
            key={book.title}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease, delay: 0.04 * i }}
            className="flex items-baseline gap-2 text-sm text-ink/85 dark:text-paper/85"
          >
            <span className="nums text-[0.6rem] text-ink/30 dark:text-paper/30">0{i + 1}</span>
            <span className="font-display italic text-ink dark:text-paper">{book.title}</span>
            <span className="text-xs text-ink/50 dark:text-paper/50">. {book.author}</span>
          </motion.li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {curiosityLinks.map((l) => (
          <li key={l.href} className="flex items-baseline gap-1">
            <span className="text-[0.6rem] uppercase tracking-[0.18em] text-ink/40 dark:text-paper/40">
              {l.verb}
            </span>
            <a
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer noopener' : undefined}
              className="group inline-flex items-baseline gap-0.5 text-ink/80 dark:text-paper/80 transition-colors hover:text-sky"
            >
              <span className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 group-hover:decoration-sky">
                {l.label}
              </span>
              <ArrowUpRight aria-hidden size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
