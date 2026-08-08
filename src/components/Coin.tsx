'use client';

import { useState } from 'react';
import { coin, type CoinFace } from '@/data/coin';

/**
 * Art and science as two faces of one coin.
 *
 * The point of the object is that it is ONE object. Two careers would be
 * two things; a coin is a single thing you can only ever see half of at a
 * time. People are the edge: what joins the faces, and the only part
 * visible while it turns.
 *
 * Colour stays quarantined. Each face is the plain card surface with a
 * hue only in the rim, so every word sits on --color-card at 17:1 rather
 * than on a tinted fill that would need its own contrast argument.
 *
 * It turns by itself with a long dwell on each face, pauses on hover or
 * keyboard focus, and can be flipped deliberately with the button. Under
 * prefers-reduced-motion the animation is off and the button is an
 * instant flip, which is why flipping is a real control and not decoration.
 */

/**
 * Rim and tint per face. The hue never touches text: it is the milled
 * edge and a faint wash toward the rim, both decorative, so every word
 * still sits on --color-card.
 */
const RIM: Record<CoinFace['hue'], string> = {
  creativity: 'ring-creativity',
  accent: 'ring-accent',
};

const TINT: Record<CoinFace['hue'], string> = {
  creativity:
    'radial-gradient(circle at 50% 45%, rgb(var(--color-card)) 72%, rgb(var(--color-creativity) / 0.18) 100%)',
  accent:
    'radial-gradient(circle at 50% 45%, rgb(var(--color-card)) 72%, rgb(var(--color-accent) / 0.16) 100%)',
};

const DOT: Record<CoinFace['hue'], string> = {
  creativity: 'bg-creativity',
  accent: 'bg-accent',
};

export default function Coin() {
  // null while the animation owns it; 0 or 1 once the reader takes over.
  const [facing, setFacing] = useState<0 | 1 | null>(null);

  const spinning = facing === null;
  const showingBack = facing === 1;

  const turn = () => setFacing((f) => (f === 1 ? 0 : 1));

  return (
    <div className="flex flex-col items-center">
      <div className="coin-scene">
        <div
          className={[
            'coin',
            'mx-auto aspect-square w-[min(20rem,80vw)]',
            spinning ? 'coin--auto' : showingBack ? 'coin--back' : 'coin--front',
          ].join(' ')}
        >
          <Face face={coin.faces[0]} />
          <Face face={coin.faces[1]} back />
        </div>
      </div>

      <button
        type="button"
        onClick={turn}
        aria-pressed={showingBack}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-caption uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent hover:text-accent-ink dark:hover:text-accent"
      >
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${showingBack ? DOT.accent : DOT.creativity}`}
        />
        <span>turn the coin</span>
      </button>

      {/* The edge. A band, because that is what an edge is. */}
      <div className="mt-10 w-full max-w-[62ch]">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span
            className="text-caption uppercase text-fg"
            style={{ letterSpacing: '0.4em' }}
          >
            {coin.edge.label}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <p className="mt-3 text-center text-body text-muted">{coin.edge.line}</p>
      </div>

      {/* The thesis the whole object is arguing for. */}
      <div className="mt-10 w-full max-w-[62ch]">
        <p className="font-display text-display-sm leading-[0.95] tracking-tightest text-fg">
          {coin.thesis.claim}
        </p>
        <p className="mt-3 text-lead leading-relaxed text-fg/75">
          {coin.thesis.body}
        </p>
        <p className="mt-3 text-caption uppercase tracking-[0.2em] text-faint">
          {coin.thesis.source}
        </p>
      </div>
    </div>
  );
}

function Face({ face, back = false }: { face: CoinFace; back?: boolean }) {
  return (
    <div
      style={{ backgroundImage: TINT[face.hue] }}
      className={[
        'coin-face',
        back ? 'coin-face--back' : '',
        'absolute inset-0 flex flex-col items-center justify-center rounded-full',
        'bg-card text-center ring-[3px] ring-inset',
        RIM[face.hue],
        'shadow-card-lg',
      ].join(' ')}
    >
      {/* Inner hairline, the way a minted coin has a raised inner rim. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[7%] rounded-full border border-line"
      />

      <span
        className="text-caption uppercase text-muted"
        style={{ letterSpacing: '0.4em' }}
      >
        {face.side}
      </span>

      {/* Sized against the coin, which is capped at 20rem, rather than
          against the viewport, so the word never outgrows the circle. */}
      <h3 className="mt-1 font-display text-[clamp(2.25rem,10vw,3rem)] leading-none tracking-tightest text-fg">
        {face.title}
      </h3>

      <p className="mt-2 px-10 text-label text-fg/75">
        {face.disciplines.join(' . ')}
      </p>

      {/*
        Deliberately not links. A face that is invisible via
        backface-visibility still keeps its links in the tab order, so
        focus would vanish behind the coin; and a link on a rotating
        surface is a moving click target. The coin states what he does,
        the footer links to all of it.
      */}
      <p
        className="mt-4 px-10 text-caption uppercase text-faint"
        style={{ letterSpacing: '0.18em' }}
      >
        {face.practices.map((p) => p.label).join(' . ')}
      </p>
    </div>
  );
}
