'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { sounds } from '@/data/sounds';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Year cards get a unique gradient generated from the year number so the
 * gallery feels distinct without curated art per year. Pinterest visuals
 * can be added later by setting `image` on the SoundYear; that overrides
 * the gradient.
 */
function gradientFor(year: number): string {
  const hue = (year * 47) % 360;
  return `linear-gradient(135deg, hsl(${hue} 70% 60% / 0.85), hsl(${(hue + 40) % 360} 65% 45% / 0.85))`;
}

export default function Sounds() {
  const current = sounds[0];
  const rest = sounds.slice(1);

  return (
    <Section
      id="sounds"
      title="sounds"
      kicker={`${sounds.length} years`}
    >
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        a musical journey, one playlist per year. the through-line of every
        chapter so far. {current.year} is on rotation.
      </p>

      {/* Current year embed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="mb-10 overflow-hidden rounded-2xl border border-ink/5 dark:border-paper/10 shadow-sm"
      >
        <iframe
          title={`Spotify Wrapped ${current.year}`}
          src={`https://open.spotify.com/embed/playlist/${current.playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          frameBorder={0}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block"
        />
      </motion.div>

      {/* Year gallery. Past years as cards, click opens Spotify. */}
      <div className="mb-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60">
            every year
          </h3>
          <span className="text-xs text-ink/40 dark:text-paper/40">
            tap to play
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {rest.map((s, i) => (
            <motion.a
              key={s.year}
              href={s.spotifyUrl}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: 0.04 * i }}
              whileHover={{ y: -4 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-ink/10 dark:border-paper/10"
              style={{ background: s.image ? undefined : gradientFor(s.year) }}
              aria-label={`Open ${s.year} playlist on Spotify`}
            >
              {s.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={s.image}
                  alt={`${s.year} mood board`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-3">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/85 nums">
                  wrapped
                </span>
                <span className="font-display text-3xl leading-none text-white md:text-4xl">
                  {s.year}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
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
