'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { sounds } from '@/data/sounds';

const ease = [0.16, 1, 0.3, 1] as const;

const ROTATE_MS = 18_000; // auto-advance every 18s. Plenty of time to listen.

declare global {
  interface Window {
    PinUtils?: { build?: () => void };
  }
}

/**
 * Sounds. A rotating gallery of Spotify Wrapped embeds paired with
 * pinterest mood boards (official widget). Auto-advances slowly; tap
 * a year to jump and pause auto-advance.
 *
 * Pinterest. Loads pinit.js once globally, re-renders the active
 * board widget on year change by re-keying the <a data-pin-do> node
 * and calling window.PinUtils.build().
 */
export default function Sounds() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pinAnchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % sounds.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  // Re-render the Pinterest widget whenever the active year changes.
  // pinit.js exposes window.PinUtils.build() which rescans the DOM.
  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof window !== 'undefined' && window.PinUtils?.build) {
        window.PinUtils.build();
      }
    }, 100);
    return () => clearTimeout(id);
  }, [index]);

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
      glow="rose"
      glowCorner="bottom-left"
    >
      {/* Pinterest's official script. Loads once globally. */}
      <Script
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="afterInteractive"
        async
        defer
      />

      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        a musical journey paired with a visual one. spotify wrapped on the
        right, pinterest mood board on the left. one year at a time. tap any
        year below to jump in.
      </p>

      {/* Active year. Pinterest mood + Spotify embed side by side. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.year}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease }}
          className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* Pinterest mood board (official widget) */}
          <div className="group relative overflow-hidden rounded-2xl border border-ink/10 dark:border-paper/15 bg-paper/60 dark:bg-ink/40 backdrop-blur-sm md:h-[380px]">
            {/* Header overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-baseline justify-between p-4">
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-ink/55 dark:text-paper/55">
                mood board · {current.year}
              </span>
              <a
                href={current.pinterestBoard ?? '#'}
                target="_blank"
                rel="noreferrer noopener"
                className="pointer-events-auto text-[0.65rem] uppercase tracking-[0.22em] text-ink/55 dark:text-paper/55 transition-colors hover:text-sunrise"
              >
                pinterest ↗
              </a>
            </div>

            {/* The widget itself. Re-keyed per year so it re-mounts. */}
            <div className="flex h-full items-center justify-center p-4 pt-12">
              {current.pinterestBoard ? (
                /* eslint-disable-next-line jsx-a11y/anchor-has-content */
                <a
                  ref={pinAnchorRef}
                  key={current.year}
                  data-pin-do="embedBoard"
                  data-pin-board-width="380"
                  data-pin-scale-height="220"
                  data-pin-scale-width="80"
                  href={current.pinterestBoard}
                />
              ) : (
                <span className="text-sm italic text-ink/40 dark:text-paper/40">
                  mood board coming
                </span>
              )}
            </div>
          </div>

          {/* Spotify embed. Always-visible audio. */}
          <div className="relative overflow-hidden rounded-2xl border border-ink/10 dark:border-paper/15 shadow-sm">
            <iframe
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
          </div>
        </motion.div>
      </AnimatePresence>

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
                  ? 'text-paper shadow-md shadow-sunrise/30'
                  : 'border border-ink/15 dark:border-paper/15 text-ink/65 dark:text-paper/65 hover:border-sunrise hover:text-sunrise'
              }`}
              style={
                active
                  ? {
                      backgroundImage:
                        'linear-gradient(135deg, #FF5C39 0%, #FF8970 50%, #F59E0B 100%)',
                    }
                  : undefined
              }
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
            { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang', note: 'my tracks' },
            { label: 'pinterest', href: 'https://pinterest.com/adamtpang', note: 'all mood boards' },
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
