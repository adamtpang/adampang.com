'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Section from './Section';
import { currentlyReading } from '@/data/books';

const ease = [0.16, 1, 0.3, 1] as const;

const BIRTHDATE = new Date('2002-02-01T00:00:00Z');
const LIFE_EXPECTANCY = 75;

function lifeStats() {
  const now = new Date();
  const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
  const ageYears = (now.getTime() - BIRTHDATE.getTime()) / msPerYear;
  const pct = Math.min(100, (ageYears / LIFE_EXPECTANCY) * 100);
  return {
    ageInt: Math.floor(ageYears),
    pct,
    pctRounded: Math.round(pct),
  };
}

export default function Currently() {
  const [stats, setStats] = useState({ ageInt: 23, pct: 0, pctRounded: 0 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setStats(lifeStats());
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <Section
      id="currently"
      title="currently"
      kicker="real-time"
      glow="dawn"
      glowCorner="top-right"
    >
      {/* Life progress bar. Computed live from birthdate. */}
      <div className="mb-12">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium text-ink/70 dark:text-paper/70">
            life
          </span>
          <span className="nums text-xs text-ink/50 dark:text-paper/50">
            {stats.ageInt} of ~{LIFE_EXPECTANCY} years · {stats.pctRounded}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-ink/5 dark:bg-paper/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: animated ? `${stats.pct}%` : 0 }}
            transition={{ duration: 1.6, ease }}
            className="h-full rounded-full bg-sunrise"
          />
        </div>
        <p className="mt-2 text-xs italic text-ink/40 dark:text-paper/40">
          memento mori. play the infinite game.
        </p>
      </div>

      {/* Currently reading */}
      <div className="mb-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60">
            reading
          </h3>
          <span className="text-xs text-ink/40 dark:text-paper/40">
            on audible
          </span>
        </div>
        <ul className="space-y-2">
          {currentlyReading.map((book, i) => (
            <motion.li
              key={book.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: 0.05 * i }}
              className="flex items-baseline gap-3 text-base text-ink/85 dark:text-paper/85"
            >
              <span className="nums text-xs text-ink/30 dark:text-paper/30">
                0{i + 1}
              </span>
              <span className="font-display italic">{book.title}</span>
              <span className="text-sm text-ink/50 dark:text-paper/50">
                · {book.author}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Living */}
      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60">
          living
        </h3>
        <p className="text-base text-ink/85 dark:text-paper/85">
          <a
            href="https://ns.com/adam/invite"
            target="_blank"
            rel="noreferrer noopener"
            className="font-display italic underline decoration-sunrise/40 decoration-2 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
          >
            network school
          </a>{' '}
          · langkawi, malaysia · longtermer #2 since day one.
        </p>
      </div>
    </Section>
  );
}
