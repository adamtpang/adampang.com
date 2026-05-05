'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '@/data/sounds';

const ease = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 18_000;

/**
 * Sounds. Bento cell. Compact Spotify embed (152px) auto-rotates
 * through 9 years of Wrapped. Year strip below as both indicator
 * and selector.
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
    <section
      id="sounds"
      className="relative flex min-h-[60vh] flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:min-h-0 lg:p-10"
    >
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-plum" />
          <h2 className="font-display text-2xl tracking-tight text-ink lg:text-3xl">
            sounds
          </h2>
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 nums">
          {sounds.length} years
        </span>
      </div>

      {/* Active year. Compact embed. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="relative mb-3 overflow-hidden rounded-xl border border-zinc-200"
        >
          <iframe
            id="spotify-player"
            title={`Spotify Wrapped ${current.year}`}
            src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder={0}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block"
          />
          {!paused && (
            <motion.div
              key={`p-${index}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              className="absolute top-0 left-0 h-0.5 bg-plum"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Year strip */}
      <div className="flex flex-wrap items-center gap-1.5">
        {sounds.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.year}
              onClick={() => select(i)}
              aria-label={`Play ${s.year} wrapped`}
              aria-pressed={active}
              className={`group relative rounded-full px-2.5 py-1 text-[0.65rem] nums uppercase tracking-[0.16em] transition-all ${
                active
                  ? 'bg-plum text-white shadow-sm'
                  : 'border border-zinc-200 text-ink/60 hover:border-plum hover:text-plum'
              }`}
            >
              {s.year}
            </button>
          );
        })}
      </div>

      {/* Outlinks pinned to bottom. */}
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-ink/65">
        {[
          { label: 'vibecheck.style', href: 'https://vibecheck.style' },
          { label: 'wonderhall.live', href: 'https://wonderhall.live' },
          { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang' },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-plum hover:decoration-plum"
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
