'use client';

import { motion } from 'framer-motion';
import { outlinks, type Outlink } from '@/data/outlinks';

const ease = [0.16, 1, 0.3, 1] as const;

const CATEGORY_ORDER: Outlink['category'][] = [
  'meet',
  'words',
  'sound',
  'video',
  'social',
  'code',
  'work',
];
const CATEGORY_TITLE: Record<Outlink['category'], string> = {
  meet: 'meet',
  words: 'words',
  sound: 'sound',
  video: 'video',
  social: 'social',
  code: 'code',
  work: 'work',
};

export default function Footer() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: outlinks.filter((o) => o.category === cat),
  }));

  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      <div className="hairline mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="mb-8 flex items-baseline justify-between gap-6">
          <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper md:text-3xl">
            elsewhere
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
            internet hub
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              <h3 className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
                {CATEGORY_TITLE[cat]}
              </h3>
              <ul className="space-y-1.5">
                {items.map((o) => (
                  <li key={o.href}>
                    <a
                      href={o.href}
                      target={o.href.startsWith('http') ? '_blank' : undefined}
                      rel={o.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="text-sm text-ink/70 dark:text-paper/70 transition-colors hover:text-sunrise"
                    >
                      {o.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-16 flex flex-col items-baseline justify-between gap-3 border-t border-ink/5 dark:border-paper/5 pt-6 md:flex-row">
          <span className="font-display text-sm italic text-ink/50 dark:text-paper/50">
            adam pang · since {year}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-ink/30 dark:text-paper/30 nums">
            built in malaysia · sunrise
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
