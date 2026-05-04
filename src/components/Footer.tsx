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
    <footer className="relative mx-auto w-full max-w-5xl px-5 pb-10 pt-10 sm:px-6 md:pb-14 md:pt-14">
      <div className="mb-8 h-px bg-white/15" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="mb-6 flex items-baseline justify-between gap-6">
          <h2 className="font-display text-2xl tracking-tight text-white md:text-3xl">
            elsewhere
          </h2>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
            internet hub
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              <h3 className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/55">
                {CATEGORY_TITLE[cat]}
              </h3>
              <ul className="space-y-1.5">
                {items.map((o) => (
                  <li key={o.href}>
                    <a
                      href={o.href}
                      target={o.href.startsWith('http') ? '_blank' : undefined}
                      rel={o.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="text-sm text-white/85 transition-colors hover:text-white"
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
        <div className="mt-10 flex flex-col items-baseline justify-between gap-3 border-t border-white/15 pt-5 md:flex-row">
          <span className="font-display text-sm italic text-white/65">
            adam pang . since {year}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/45 nums">
            built in malaysia . sunrise
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
