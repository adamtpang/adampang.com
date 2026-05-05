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
    <section className="relative flex min-h-[60vh] flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:min-h-0 lg:p-10">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sun" />
          <h2 className="font-display text-2xl tracking-tight text-ink lg:text-3xl">
            elsewhere
          </h2>
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40">
          internet hub
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease }}
        className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <h3 className="mb-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink/40">
              {CATEGORY_TITLE[cat]}
            </h3>
            <ul className="space-y-0.5">
              {items.map((o) => (
                <li key={o.href}>
                  <a
                    href={o.href}
                    target={o.href.startsWith('http') ? '_blank' : undefined}
                    rel={o.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="text-xs text-ink/75 transition-colors hover:text-sunrise"
                  >
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Sign-off pinned bottom */}
      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-4 border-t border-zinc-100">
        <span className="font-display text-xs italic text-ink/55">
          adam pang . since {year}
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink/30 nums">
          built in malaysia . sunrise
        </span>
      </div>
    </section>
  );
}
