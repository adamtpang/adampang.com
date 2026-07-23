'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { SightImage } from '@/lib/blob';
import ElementSigil from './ElementSigil';

const ease = [0.16, 1, 0.3, 1] as const;
const IG = 'https://instagram.com/adamtpang';

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
 * always ends with an Instagram tile — the curated visual life lives
 * on instagram, this is the peek + the door to it.
 *
 * Add photos by dropping images in public/sights/ (prefix 01-, 02-…
 * to order; filename becomes the caption).
 */
export default function Sights({ images = [] }: { images?: SightImage[] }) {
  const photos = images.slice(0, 3); // leave room for the IG tile
  const cols = photos.length + 1; // photos + instagram tile

  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 dark:border-paper/15 dark:bg-ink-soft">
      <div className="mb-4 flex items-center gap-2.5">
        <ElementSigil element="fire" />
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl">
          sights
        </h2>
      </div>

      <div
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
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
            className="group relative aspect-square overflow-hidden rounded-lg border border-zinc-200 dark:border-paper/15"
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

        {/* Instagram tile. Always present, the door to the full feed.
            Also above the fold, so also no opacity-0 entrance. */}
        <motion.a
          href={IG}
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.5, ease }}
          className="group relative flex aspect-square flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-zinc-200 text-white transition-all dark:border-paper/15"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
          }}
          // Starts with the visible text ("more on ig") so the accessible
          // name matches what a voice-control user would say.
          aria-label="more on ig . Instagram"
        >
          <span className="opacity-95"><IgGlyph size={18} /></span>
          <span className="px-1 text-center text-caption uppercase tracking-[0.16em] leading-tight">
            more on ig
          </span>
        </motion.a>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/70 dark:text-paper/70">
        {[
          { label: 'instagram', href: IG },
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
