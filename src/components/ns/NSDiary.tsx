'use client';

import { motion } from 'framer-motion';
import Section from '../Section';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * NS diary. Curated X (twitter) thread + future writings on NS life.
 *
 * To add an entry: prepend to entries below. Each entry is a
 * standalone moment (a tweet, an essay, a photo, a video). Live
 * embeds for tweets are deferred until we add the X widget script;
 * for now each entry links out to the source.
 */

type DiaryEntry = {
  date: string;
  source: 'x' | 'pangaea' | 'note';
  title: string;
  href: string;
  excerpt?: string;
};

const entries: DiaryEntry[] = [
  {
    date: 'project x',
    source: 'x',
    title: 'ns diary thread',
    href: 'https://x.com/adamtpang/status/1914254825816227954',
    excerpt:
      'living chronicle of life at network school. moments, meals, lessons, ideas. the long-form version is on pangaea.',
  },
];

export default function NSDiary() {
  return (
    <Section id="diary" title="diary" kicker="from the frontier">
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        a chronicle of life at ns. moments, lessons, photos, ideas. written
        slowly, on x and on{' '}
        <a
          href="https://pangaea.blog"
          target="_blank"
          rel="noreferrer noopener"
          className="font-display italic underline decoration-sunrise/40 decoration-2 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
        >
          pangaea
        </a>
        .
      </p>

      <ol className="divide-y divide-ink/5 dark:divide-paper/5">
        {entries.map((e, i) => (
          <motion.li
            key={e.href + i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease, delay: 0.05 * i }}
            className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[120px_1fr] md:gap-8"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-ink/40 dark:text-paper/40 nums">
              {e.date}
            </span>
            <div>
              <a
                href={e.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-baseline gap-2 font-display text-xl tracking-tight text-ink dark:text-paper transition-colors hover:text-sunrise"
              >
                <span>{e.title}</span>
                <span aria-hidden className="text-sm opacity-50 group-hover:opacity-100">
                  ↗
                </span>
              </a>
              {e.excerpt && (
                <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">{e.excerpt}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      <p className="mt-8 text-sm italic text-ink/40 dark:text-paper/40">
        more coming. the full ns story takes years to tell.
      </p>
    </Section>
  );
}
