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
    <footer className="relative px-3 pb-10 pt-1.5 sm:px-5 md:pb-14">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-zinc-200 bg-white px-5 py-7 sm:px-7 sm:py-8 md:px-9 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-6 flex items-baseline justify-between gap-6">
            <div className="flex items-baseline gap-2.5">
              <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sun" />
              <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                elsewhere
              </h2>
            </div>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40">
              internet hub
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {grouped.map(({ cat, items }) => (
              <div key={cat}>
                <h3 className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink/40">
                  {CATEGORY_TITLE[cat]}
                </h3>
                <ul className="space-y-1">
                  {items.map((o) => (
                    <li key={o.href}>
                      <a
                        href={o.href}
                        target={o.href.startsWith('http') ? '_blank' : undefined}
                        rel={o.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                        className="text-sm text-ink/75 transition-colors hover:text-sunrise"
                      >
                        {o.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-baseline justify-between gap-3 border-t border-zinc-100 pt-4 md:flex-row">
            <span className="font-display text-sm italic text-ink/55">
              adam pang . since {year}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-ink/30 nums">
              built in malaysia . sunrise
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
