'use client';

import { motion } from 'framer-motion';
import { apps, type AppStatus } from '@/data/apps';

const ease = [0.16, 1, 0.3, 1] as const;

const STATUS_DOT: Record<AppStatus, string> = {
  live: 'bg-leaf',
  shipping: 'bg-sunrise',
  building: 'bg-sun',
  archived: 'bg-zinc-300',
};

export default function Building() {
  return (
    <section
      id="building"
      className="relative flex min-h-[60vh] flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:min-h-0 lg:p-10"
    >
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sunrise" />
          <h2 className="font-display text-2xl tracking-tight text-ink lg:text-3xl">
            building
          </h2>
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 nums">
          {apps.length} apps
        </span>
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
              className="group flex items-center justify-between gap-2 rounded-lg border border-zinc-100 bg-white px-3 py-2 transition-all hover:border-sunrise hover:-translate-y-0.5"
            >
              <div className="min-w-0">
                <div className="font-display text-sm tracking-tight text-ink transition-colors group-hover:text-sunrise">
                  {app.name}
                </div>
                <div className="truncate text-[0.7rem] text-ink/55">
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
