'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { sounds } from '@/data/sounds';

const ease = [0.16, 1, 0.3, 1] as const;

const ROTATE_MS = 18_000; // auto-advance every 18s. Plenty of time to listen.

/**
 * Sounds. A rotating gallery of Spotify Wrapped embeds, one per year,
 * with a year strip beneath. Auto-advances slowly; tap a year to jump
 * and pause auto-advance for the rest of the visit.
 */
export default function Sounds() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % sounds.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const select = (i: number) => {
    setIndex(i);
    setPaused(true);
  };

  const current = sounds[index];

  return (
    <Section id="sounds" title="sounds" kicker={`${sounds.length} years`}>
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        a musical journey, one playlist per year. the through-line of every
        chapter so far. tap a year to jump in.
      </p>

      {/* The rotating embed. Crossfade on year change. */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-ink/5 dark:border-paper/10 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <iframe
              title={`Spotify Wrapped ${current.year}`}
              src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="380"
              frameBorder={0}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block"
            />
          </motion.div>
        </AnimatePresence>

        {/* Auto-rotate progress bar. Shows at top of embed. */}
        {!paused && (
          <motion.div
            key={`progress-${index}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
            className="absolute top-0 left-0 h-0.5 bg-sunrise/60"
          />
        )}
      </div>

      {/* Year strip. Acts as both indicator and selector. */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {sounds.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.year}
              onClick={() => select(i)}
              aria-label={`Play ${s.year} wrapped`}
              aria-pressed={active}
              className={`group relative rounded-full px-3 py-1.5 text-xs nums uppercase tracking-[0.16em] transition-all ${
                active
                  ? 'bg-sunrise text-paper shadow-sm'
                  : 'border border-ink/10 dark:border-paper/15 text-ink/60 dark:text-paper/60 hover:border-sunrise hover:text-sunrise'
              }`}
            >
              {s.year}
            </button>
          );
        })}
        {paused && (
          <button
            onClick={() => setPaused(false)}
            className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40 hover:text-sunrise transition-colors"
          >
            resume rotation ↻
          </button>
        )}
      </div>

      {/* Music outlinks */}
      <div>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60">
          where the music lives
        </h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70 dark:text-paper/70">
          {[
            { label: 'vibecheck.style', href: 'https://vibecheck.style', note: 'building the music app' },
            { label: 'wonderhall.live', href: 'https://wonderhall.live', note: 'concert series' },
            { label: 'soundcloud', href: 'https://soundcloud.com/adampang', note: 'my tracks' },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-sunrise"
              >
                <span className="underline decoration-ink/15 decoration-1 underline-offset-4 group-hover:decoration-sunrise dark:decoration-paper/15">
                  {l.label}
                </span>
                <span aria-hidden className="text-[0.7em] opacity-50 group-hover:opacity-100">
                  ↗
                </span>
                <span className="hidden text-xs text-ink/40 dark:text-paper/40 md:inline">
                  {l.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
