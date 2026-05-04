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
 * and pause auto-advance.
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
    <Section
      id="sounds"
      title="sounds"
      kicker={`${sounds.length} years`}
      surface="bare"
    >
      {/* Active year. Full-width Spotify embed. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease }}
          className="relative mb-4 overflow-hidden rounded-2xl border border-white/15 shadow-lg shadow-black/20"
        >
          <iframe
            id="spotify-player"
            title={`Spotify Wrapped ${current.year}`}
            src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            frameBorder={0}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block h-full"
          />
          {/* Auto-rotate progress bar */}
          {!paused && (
            <motion.div
              key={`progress-${index}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              className="absolute top-0 left-0 h-0.5 bg-sunrise/70"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Year strip. Acts as both indicator and selector. */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
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
                  ? 'bg-white text-ink shadow-lg'
                  : 'border border-white/35 text-white/85 hover:border-white hover:bg-white/10'
              }`}
            >
              {s.year}
            </button>
          );
        })}
        {paused && (
          <button
            onClick={() => setPaused(false)}
            className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/55 hover:text-white transition-colors"
          >
            resume rotation ↻
          </button>
        )}
      </div>

      {/* Music outlinks */}
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
          {[
            { label: 'vibecheck.style', href: 'https://vibecheck.style', note: 'building the music app' },
            { label: 'wonderhall.live', href: 'https://wonderhall.live', note: 'concert series' },
            { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang', note: 'my tracks' },
          ].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-white"
              >
                <span className="underline decoration-white/30 decoration-1 underline-offset-4 group-hover:decoration-white">
                  {l.label}
                </span>
                <span aria-hidden className="text-[0.7em] opacity-65 group-hover:opacity-100">
                  ↗
                </span>
                <span className="hidden text-xs text-white/55 md:inline">
                  {l.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
    </Section>
  );
}
