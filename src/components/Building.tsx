'use client';

import { motion } from 'framer-motion';
import { apps, type AppStatus } from '@/data/apps';

const ease = [0.16, 1, 0.3, 1] as const;

const STATUS_DOT: Record<AppStatus, string> = {
  live: 'bg-leaf',
  shipping: 'bg-ember',
  building: 'bg-sun',
  archived: 'bg-zinc-300',
};

export default function Building() {
  return (
    <section
      id="building"
      className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft"
    >
      <div className="mb-4 flex items-baseline gap-2.5">
        <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-ember" />
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
          creativities
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {apps.map((app, i) => (
          <motion.li
            key={app.slug}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease, delay: 0.025 * i }}
          >
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-white px-3 py-2 transition-all hover:border-ember hover:-translate-y-0.5 dark:border-paper/10 dark:bg-ink/40 dark:hover:border-ember"
            >
              <div className="min-w-0">
                <div className="font-display text-sm tracking-tight text-ink transition-colors group-hover:text-ember dark:text-paper">
                  {app.name}
                </div>
                <div className="truncate text-[0.7rem] text-ink/55 dark:text-paper/55">
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
