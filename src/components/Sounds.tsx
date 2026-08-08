'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { sounds } from '@/data/sounds';
import ElementSigil from './ElementSigil';

const ease = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 18_000;

/**
 * Sounds. Bento cell. Click-to-load Spotify facade auto-rotates
 * through 9 years of Wrapped. Year strip below as both indicator
 * and selector.
 */
export default function Sounds() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** False until the visitor asks for the player. Gates all Spotify network. */
  const [loaded, setLoaded] = useState(false);
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
    // These buttons are labelled "Play <year> wrapped", so honour that and
    // load the real player. Still user-initiated, which is all the facade
    // is protecting: nothing reaches Spotify on page load.
    setLoaded(true);
  };

  const current = sounds[index];

  return (
    <section
      id="sounds"
      className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <ElementSigil element="water" />
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
          sounds
        </h2>
      </div>

      {/* 2026: strummer. Wrapped on demand. CTA always visible. */}
      <a
        href="https://strummer.fun"
        target="_blank"
        rel="noreferrer noopener"
        className="group mb-3 flex items-center justify-between gap-3 rounded-xl p-3 text-white transition-all hover:-translate-y-0.5"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
        }}
      >
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base leading-none">2026 strummer</span>
            <span className="nums text-caption uppercase tracking-[0.22em] text-white/75">
              wrapped on demand
            </span>
          </div>
          <div className="mt-1 text-caption text-white/85">
            check your vibe weekly. live at strummer.fun.
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-white/95 px-3 py-1 text-caption font-medium text-ink transition-all group-hover:bg-white">
          get checked ↗
        </span>
      </a>

      {/* Past years carousel.

          Facade until clicked. The live Spotify iframe made 5 network
          requests and set two third-party cookies (sp_t, sp_landing) on
          every page load, which was the entire best-practices deficit
          (79/100) and a chunk of the LCP render delay. Nothing is
          requested from Spotify until someone actually asks to play.
          Once loaded it stays loaded, and the carousel keeps rotating
          the real player from then on. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="relative mb-3 overflow-hidden rounded-xl border border-line"
        >
          {loaded ? (
            <iframe
              id="spotify-player"
              title={`Spotify Wrapped ${current.year}`}
              src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder={0}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block"
            />
          ) : (
            <button
              onClick={() => {
                setLoaded(true);
                setPaused(true);
              }}
              // Same 80px height as the iframe, so swapping one for the
              // other shifts nothing.
              className="group flex h-20 w-full items-center gap-3 bg-sunken px-3 text-left transition-colors hover:bg-creativity/10"
              aria-label={`Load Spotify player for ${current.year} wrapped`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-creativity text-ink transition-transform group-hover:scale-105">
                <Play size={15} className="ml-0.5" fill="currentColor" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-base leading-tight text-ink dark:text-paper">
                  {current.year} wrapped
                </span>
                <span className="block text-caption uppercase tracking-[0.16em] text-muted">
                  play on spotify
                </span>
              </span>
            </button>
          )}
          {!paused && (
            <motion.div
              key={`p-${index}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              className="absolute top-0 left-0 h-0.5 bg-creativity"
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
              className={`group relative rounded-full px-2.5 py-1 text-caption nums uppercase tracking-[0.16em] transition-all ${
                active
                  ? // ink on the fill, not white: white on creativity is 2.64:1
                    'bg-creativity text-ink shadow-sm'
                  : 'border border-line text-muted hover:border-creativity hover:text-creativity-ink'
              }`}
            >
              {s.year}
            </button>
          );
        })}
      </div>

      {/* Outlinks pinned to bottom. */}
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-muted">
        {[
          { label: 'strummer.fun', href: 'https://strummer.fun' },
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
