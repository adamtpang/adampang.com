'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { SightImage } from '@/lib/blob';
import ElementSigil from './ElementSigil';

const ease = [0.16, 1, 0.3, 1] as const;
const IG = 'https://instagram.com/adamtpang';
const PINTEREST = 'https://pinterest.com/adamtpang';

/** Inline Instagram glyph (lucide build here doesn't export one). */
function IgGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Sights. What I see. Renders real photos from /public/sights/* and
 * always ends with Instagram and Pinterest tiles. The curated visual life
 * lives there. This is the peek and the door to it.
 *
 * Add photos by dropping images in public/sights/ (prefix 01-, 02-…
 * to order; filename becomes the caption).
 */
export default function Sights({ images = [] }: { images?: SightImage[] }) {
  const photos = images.slice(0, 2);
  const hasSecondPhoto = photos.length > 1;

  return (
    <section className="relative flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft">
      <div className="mb-4 flex items-center gap-2.5">
        <ElementSigil element="fire" />
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
          sights
        </h2>
      </div>

      <div className="grid h-36 grid-cols-4 grid-rows-2 gap-1.5 sm:h-40 sm:gap-2">
        {photos.map((p, i) => (
          // No entrance animation. These tiles are above the fold and the
          // first one is the LCP element; an `initial={{opacity: 0}}` +
          // whileInView pair keeps it invisible until JS hydrates and the
          // IntersectionObserver fires, which put 2995ms of "render delay"
          // into a 3.8s LCP. Hover still animates.
          <motion.a
            key={p.pathname}
            href={IG}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.5, ease }}
            className={`group relative overflow-hidden rounded-lg border border-zinc-200 dark:border-paper/15 ${
              i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-2'
            }`}
            // Must contain the visible caption, or voice control ("click
            // <caption>") cannot address this link.
            aria-label={`${p.caption} . view on Instagram`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              // Decorative: the caption is rendered as visible text below,
              // so a matching alt would announce it a second time.
              alt=""
              // Explicit square dimensions. Without them this was the single
              // largest layout shift on the page (0.083 of a 0.103 CLS):
              // the browser had no intrinsic ratio to reserve space with.
              width={512}
              height={512}
              // The first tile is the LCP element, so it loads eagerly at
              // high priority instead of waiting its turn.
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-1 left-1.5 text-caption uppercase tracking-[0.16em] text-white/90">
              {p.caption}
            </span>
          </motion.a>
        ))}

        {/* Social tiles are visual doors, not substitute photographs. */}
        <motion.a
          href={IG}
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.5, ease }}
          className={`group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-zinc-200 text-white transition-all dark:border-paper/15 ${
            hasSecondPhoto ? 'col-span-1' : 'col-span-2'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgb(var(--color-spirit)) 0%, rgb(var(--color-sights)) 52%, rgb(var(--color-curiosity)) 100%)',
          }}
          // Starts with the visible text ("more on ig") so the accessible
          // name matches what a voice-control user would say.
          aria-label="instagram . visual life"
        >
          <span className="opacity-95"><IgGlyph size={18} /></span>
          <span className="px-1 text-center text-caption uppercase tracking-[0.16em] leading-tight">
            instagram
          </span>
        </motion.a>

        <motion.a
          href={PINTEREST}
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.5, ease }}
          className={`group relative flex flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-zinc-200 bg-sights text-white transition-all dark:border-paper/15 ${
            hasSecondPhoto ? 'col-span-1' : 'col-span-2'
          }`}
          aria-label="pinterest . visual references"
        >
          <span className="font-display text-lg font-semibold leading-none">P</span>
          <span className="inline-flex items-center gap-0.5 px-1 text-center text-caption uppercase tracking-[0.16em] leading-tight">
            pinterest
            <ArrowUpRight aria-hidden size={9} />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
