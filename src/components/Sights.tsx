'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { sights as fallback, gradientForSlug } from '@/data/sights';
import type { SightImage } from '@/lib/blob';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Sights. What I see. Renders Vercel-Blob-hosted photos when they
 * exist; falls back to placeholder gradient tiles using the static
 * sights data when the blob list is empty.
 */
export default function Sights({ images = [] }: { images?: SightImage[] }) {
  const usingBlobs = images.length >= 4;
  const tiles = usingBlobs
    ? images.slice(0, 4).map((img, i) => ({
        slug: img.pathname,
        caption: img.caption,
        href: 'https://instagram.com/adamtpang',
        image: img.url,
      }))
    : fallback;

  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sunrise" />
          <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
            sights
          </h2>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/40 dark:text-paper/40">
          what i see
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {tiles.map((s, i) => (
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
            className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 dark:border-paper/15"
            style={{ background: 'image' in s && s.image ? undefined : gradientForSlug(s.slug) }}
            aria-label={s.caption}
          >
            {'image' in s && s.image && (
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

      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/70 dark:text-paper/70">
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
              <span className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 group-hover:decoration-sunrise">
                {l.label}
              </span>
              <ArrowUpRight aria-hidden size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
