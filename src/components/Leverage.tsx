'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { leverage, type LeverageMetric, type LeverageCard } from '@/data/leverage';
import type { LiveStats } from '@/lib/metrics';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Merge live API numbers into the static leverage config. If a fetcher
 * returns null (rate limit, network failure), we fall back silently to
 * the static value.
 */
function withLiveStats(cards: LeverageCard[], live?: LiveStats): LeverageCard[] {
  if (!live) return cards;

  return cards.map((card) => {
    if (card.slug === 'code' && live.github) {
      return {
        ...card,
        metrics: [
          { label: 'apps live', value: 9 },
          {
            label: 'github repos',
            value: live.github.publicRepos,
            source: 'https://github.com/adamtpang',
          },
          {
            label: 'github stars',
            value: live.github.totalStars,
            source: 'https://github.com/adamtpang',
          },
        ],
      };
    }
    if (card.slug === 'media' && live.substack) {
      return {
        ...card,
        metrics: [
          {
            label: 'pangaea posts',
            value: live.substack.postCount,
            source: 'https://pangaea.blog',
          },
          { label: 'soundcloud', value: 'songs', source: 'https://soundcloud.com/adampang' },
          { label: 'x', value: '@adamtpang', source: 'https://x.com/adamtpang' },
        ],
      };
    }
    return card;
  });
}

function Metric({ m }: { m: LeverageMetric }) {
  const value = (() => {
    if (typeof m.value === 'number') return m.value.toLocaleString();
    return m.value;
  })();

  const inner = (
    <div className="flex flex-col">
      <span
        className={`font-display leading-none ${
          typeof m.value === 'number'
            ? 'text-3xl tracking-tighter md:text-4xl nums'
            : 'text-xl tracking-tight md:text-2xl'
        } text-ink dark:text-paper`}
      >
        {m.approx ? '~' : ''}
        {value}
      </span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
        {m.label}
      </span>
    </div>
  );

  if (m.source) {
    return (
      <a
        href={m.source}
        target="_blank"
        rel="noreferrer noopener"
        className="block transition-colors hover:[&_span:first-child]:text-sunrise"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export default function Leverage({ liveStats }: { liveStats?: LiveStats }) {
  const cards = withLiveStats(leverage, liveStats);
  const hasLive = !!(liveStats?.github || liveStats?.substack);

  return (
    <Section
      id="leverage"
      title="leverage"
      kicker="naval's four"
    >
      <p className="mb-10 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        every output compounds through one of four sources. these are mine,
        with the proof attached.{' '}
        {hasLive && (
          <span className="inline-flex items-center gap-1.5 text-xs text-sunrise">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunrise opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sunrise" />
            </span>
            live numbers
          </span>
        )}
      </p>

      <ol className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <motion.li
            key={card.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease, delay: 0.06 * i }}
            className="group rounded-2xl border border-ink/10 dark:border-paper/10 p-5 transition-colors hover:border-sunrise/40 md:p-6"
          >
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-display text-2xl tracking-tight text-sunrise">
                {card.name}
              </h3>
              <span className="nums text-[0.65rem] uppercase tracking-[0.22em] text-ink/30 dark:text-paper/30">
                0{i + 1}
              </span>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-ink/75 dark:text-paper/75">
              {card.claim}
            </p>

            <div className="mb-5 grid grid-cols-3 gap-3 border-t border-ink/5 dark:border-paper/5 pt-5">
              {card.metrics.map((m) => (
                <Metric key={m.label} m={m} />
              ))}
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
              {card.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer noopener' : undefined}
                    className="text-ink/55 dark:text-paper/55 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
