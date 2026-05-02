'use client';

import Script from 'next/script';

/**
 * Sandbox. Compare three approaches to surfacing a Pinterest board.
 *
 * Approach 1. Official Pinterest board widget (<a data-pin-do=embedBoard>)
 *   Pros. Official, free, auto-renders the latest pins as a mini-grid.
 *   Cons. Loads a 90KB+ third-party script. Dated chrome. Hard to style.
 *         Bad for performance if you embed many on one page.
 *
 * Approach 2. Single cover image + click-out (<a><img></a>)
 *   Pros. Instant, sharp, fully styled, you control the image. The
 *         pattern every premium personal site uses.
 *   Cons. You manually save and host one image per board.
 *
 * Approach 3. Single Pin embed (<a data-pin-do=embedPin>)
 *   Pros. Looks like a polished card, useful for highlighting one item.
 *   Cons. Same script weight, only one pin not a board.
 *
 * Pick whichever feels right and we ship it on the live site.
 */

const SAMPLE_BOARD = 'https://www.pinterest.com/pinterest/official-news/';
const SAMPLE_PIN = 'https://www.pinterest.com/pin/99360735500167749/';

export default function PinterestExperiment() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20">
      <a href="/" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/50 hover:text-sunrise">
        <span>←</span>
        <span>back home</span>
      </a>

      <h1 className="mb-3 font-display text-4xl tracking-tight text-ink dark:text-paper">
        pinterest embed sandbox
      </h1>
      <p className="mb-12 max-w-xl text-ink/70 dark:text-paper/70">
        three ways to surface a pinterest board next to the spotify embed in
        sounds. pick whichever looks right and i&apos;ll wire it in production.
      </p>

      {/* Pinterest's official script. Loads pinit.js once. */}
      <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" async defer />

      {/* APPROACH 1. Official board widget */}
      <section className="mb-16">
        <header className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-sunrise">approach 1. official board widget</h2>
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink/40 nums">+90 kb script</span>
        </header>
        <p className="mb-6 max-w-xl text-sm text-ink/65 dark:text-paper/65">
          renders the latest pins from the board as a mini grid. official, free,
          but heavy and stylistically off-brand.
        </p>
        <div className="rounded-2xl border border-ink/10 dark:border-paper/10 bg-paper/50 dark:bg-ink/40 p-4">
          {/* eslint-disable-next-line @next/next/no-element-with-empty-content */}
          <a
            data-pin-do="embedBoard"
            data-pin-board-width="600"
            data-pin-scale-height="240"
            data-pin-scale-width="80"
            href={SAMPLE_BOARD}
          />
        </div>
      </section>

      {/* APPROACH 2. Cover image + click-out */}
      <section className="mb-16">
        <header className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-sunrise">
            approach 2. cover image + link out
          </h2>
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink/40 nums">0 kb extra</span>
        </header>
        <p className="mb-6 max-w-xl text-sm text-ink/65 dark:text-paper/65">
          one carefully chosen image per board, click opens pinterest. instant,
          sharp, fully styled. the pattern rauno, paco, mxstbr all use.
        </p>
        <a
          href={SAMPLE_BOARD}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-ink/10 dark:border-paper/10"
          style={{
            background: 'linear-gradient(135deg, hsl(15 70% 55%), hsl(45 65% 50%))',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.65rem] uppercase tracking-[0.22em]">mood board</span>
              <span className="text-[0.65rem] uppercase tracking-[0.22em]">pinterest ↗</span>
            </div>
            <span className="font-display text-7xl leading-none tracking-tighter">2025</span>
          </div>
        </a>
        <p className="mt-3 text-xs text-ink/40 dark:text-paper/40">
          replace the gradient with /public/sounds/2025.jpg whenever you save a real
          cover from pinterest.
        </p>
      </section>

      {/* APPROACH 3. Single Pin embed */}
      <section className="mb-16">
        <header className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-sunrise">approach 3. single pin card</h2>
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-ink/40 nums">+90 kb script</span>
        </header>
        <p className="mb-6 max-w-xl text-sm text-ink/65 dark:text-paper/65">
          embeds one pin as a polished card. only useful if you want to highlight
          a single image, not the whole board.
        </p>
        <div className="rounded-2xl border border-ink/10 dark:border-paper/10 bg-paper/50 dark:bg-ink/40 p-4">
          {/* eslint-disable-next-line @next/next/no-element-with-empty-content */}
          <a
            data-pin-do="embedPin"
            data-pin-width="medium"
            href={SAMPLE_PIN}
          />
        </div>
      </section>

      <div className="rounded-2xl border border-sunrise/30 bg-sunrise/5 p-6">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sunrise">
          my recommendation
        </h3>
        <p className="text-sm text-ink/85 dark:text-paper/85">
          approach 2. cover image. zero performance cost, fully on-brand,
          scales to nine years cleanly. you save one image per pinterest board
          and drop it in /public/sounds. tell me which approach you want and
          i&apos;ll commit it on the live sounds section.
        </p>
      </div>
    </main>
  );
}
