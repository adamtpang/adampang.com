'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { apps, type AppStatus } from '@/data/apps';

const ease = [0.16, 1, 0.3, 1] as const;

const STATUS_LABEL: Record<AppStatus, string> = {
  live: 'live',
  shipping: 'shipping',
  building: 'building',
  archived: 'archived',
};

const STATUS_DOT: Record<AppStatus, string> = {
  live: 'bg-emerald-500',
  shipping: 'bg-sunrise',
  building: 'bg-amber-400',
  archived: 'bg-ink/30 dark:bg-paper/30',
};

export default function Building() {
  return (
    <Section id="building" title="building" kicker={`${apps.length} apps`} sigil="sunrise">
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {apps.map((app, i) => (
          <motion.li
            key={app.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease, delay: 0.04 * i }}
          >
            <a
              href={app.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group block rounded-xl border border-ink/10 p-3.5 transition-all hover:border-sunrise hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg tracking-tight text-ink dark:text-paper transition-colors group-hover:text-sunrise">
                  {app.name}
                </span>
                <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-ink/50 dark:text-paper/50">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[app.status]}`} />
                  {STATUS_LABEL[app.status]}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/65 dark:text-paper/65">
                {app.tagline}
              </p>
            </a>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
