'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { sounds } from '@/data/sounds';
import ElementSigil from './ElementSigil';

export default function Sounds() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const current = sounds[index];

  const select = (i: number) => {
    setIndex(i);
    setLoaded(true);
  };

  return (
    <section id="sounds" className="relative flex min-w-0 flex-col rounded-2xl border border-line bg-card p-5 sm:p-6 md:p-7">
      <div className="mb-4 flex items-center gap-2.5">
        <ElementSigil element="water" />
        <h2 className="font-display text-2xl text-fg">sounds</h2>
      </div>
      <a href="https://strummer.fun" target="_blank" rel="noreferrer noopener"
        className="mb-3 flex flex-wrap items-center justify-between gap-2 text-fg hover:text-accent-ink">
        <span className="font-display text-sm">strummer.fun</span>
        <span className="inline-flex items-center gap-1 text-caption underline underline-offset-4">
          check your vibe <ArrowUpRight size={12} aria-hidden />
        </span>
      </a>
      {/* The player loads only on request. Selecting a year never waits for an exit animation. */}
      <motion.div key={current.year} initial={false}
        animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className="mb-3 h-20 overflow-hidden rounded-lg border border-line">
        {loaded ? (
          <iframe id="spotify-player" title={`Spotify Wrapped ${current.year}`}
            src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
            width="100%" height="80" loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block border-0" />
        ) : (
          <button onClick={() => setLoaded(true)}
            className="flex h-20 w-full items-center gap-3 bg-sunken px-3 text-left text-fg hover:bg-creativity/10"
            aria-label={`Load Spotify player for ${current.year} wrapped`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-creativity text-ink">
              <Play size={15} fill="currentColor" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-base">{current.year} wrapped</span>
              <span className="block text-caption text-muted">Play on Spotify</span>
            </span>
          </button>
        )}
      </motion.div>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-9" role="group" aria-label="Spotify Wrapped year">
        {sounds.map((s, i) => (
          <button key={s.year} onClick={() => select(i)}
            aria-label={`Load Spotify Wrapped ${s.year}`} aria-pressed={i === index}
            className={`min-h-8 rounded-md text-caption nums transition-colors ${i === index
              ? 'bg-creativity text-ink'
              : 'text-muted hover:bg-sunken hover:text-fg'}`}>
            {s.year}
          </button>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-xs text-muted">
        {[
          { label: 'wonderhall.live', href: 'https://wonderhall.live' },
          { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang' },
          { label: 'pangpod', href: 'https://pangpod.com' },
        ].map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener"
            className="inline-flex min-h-6 items-center gap-0.5 underline decoration-line underline-offset-4 hover:text-accent-ink">
            {link.label}<ArrowUpRight size={10} aria-hidden />
          </a>
        ))}
      </div>
    </section>
  );
}
