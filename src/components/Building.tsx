'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { apps, type AppStatus } from '@/data/apps';
import ElementSigil from './ElementSigil';

const STATUS_DOT: Record<AppStatus, string> = {
  live: 'bg-leaf',
  shipping: 'bg-ember',
  building: 'bg-sun',
};

export default function Building() {
  return (
    <section
      id="building"
      className="relative flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ElementSigil element="earth" />
          <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
            creations
          </h2>
        </div>
        <a
          href="https://thedojo.fun"
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-1 text-caption uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          <span className="underline decoration-line underline-offset-4 group-hover:decoration-accent">
            all work
          </span>
          <ArrowUpRight size={11} aria-hidden />
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {apps.map((app) => (
          <motion.li
            key={app.slug}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-white px-3 py-2 transition-colors hover:border-creativity dark:border-paper/10 dark:bg-ink/40 dark:hover:border-creativity"
            >
              <div className="min-w-0">
                <div className="font-display text-sm tracking-tight text-ink transition-colors group-hover:text-creativity-ink dark:text-paper dark:group-hover:text-creativity">
                  {app.name}
                </div>
                <div className="truncate text-caption text-muted">
                  {app.tagline}
                </div>
              </div>
              <span className={`shrink-0 h-1.5 w-1.5 rounded-full ${STATUS_DOT[app.status]}`} aria-label={app.status} />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
