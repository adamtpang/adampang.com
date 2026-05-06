'use client';

import { motion } from 'framer-motion';
import { sights, gradientForSlug } from '@/data/sights';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Sights. What I see. Pinterest mood, Instagram, camera-roll snippets.
 * 2x2 grid of tiles. Each tile is a placeholder gradient until the
 * matching JPG lands in /public/sights/<slug>.jpg.
 */
export default function Sights() {
  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sunrise" />
          <h2 className="font-display text-2xl tracking-tight text-ink lg:text-3xl">
            sights
          </h2>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/40">
          what i see
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {sights.map((s, i) => (
          <motion.a
            key={s.slug}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease, delay: 0.04 * i }}
            whileHover={{ y: -2 }}
            className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200"
            style={{ background: s.image ? undefined : gradientForSlug(s.slug) }}
            aria-label={s.caption}
          >
            {s.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={s.image}
                alt={s.caption}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-1 left-1.5 text-[0.55rem] uppercase tracking-[0.16em] text-white/90">
              {s.caption}
            </span>
          </motion.a>
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/70">
        {[
          { label: 'instagram', href: 'https://instagram.com/adamtpang' },
          { label: 'pinterest', href: 'https://pinterest.com/adamtpang' },
        ].map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-baseline gap-1 transition-colors hover:text-sunrise"
            >
              <span className="underline decoration-ink/15 decoration-1 underline-offset-4 group-hover:decoration-sunrise">
                {l.label}
              </span>
              <span aria-hidden className="text-[0.7em] opacity-50 group-hover:opacity-100">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
