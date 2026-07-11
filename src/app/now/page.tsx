import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'now',
  description:
    'What Adam Pang is doing right now. A now page in the spirit of sive.rs/now. Updated whenever the focus shifts.',
};

/**
 * /now. Sivers-tradition page: what I am doing right now. Plain
 * prose, dated header, edit when focus changes. Listed on
 * nownownow.com style directories.
 */

const LAST_UPDATED = 'July 2026';

export default function NowPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/55 dark:text-paper/55 transition-colors hover:text-sunrise"
        >
          <ArrowLeft size={11} />
          <span>back home</span>
        </Link>

        <header className="mt-6">
          <h1
            className="font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Now<span className="text-sunrise">.</span>
          </h1>
          <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-ink/45 dark:text-paper/45">
            updated {LAST_UPDATED}
          </p>
        </header>

        <NowSection title="where">
          <p>
            <Ext href="https://ns.com/adam/apply">Network School</Ext>,
            Langkawi, Malaysia. Longtermer #2 since March 2025.
          </p>
        </NowSection>

        <NowSection title="the sprint">
          <ul className="space-y-1.5">
            <li>
              <In href="/ns">the ns field guide</In> . $49, shipping july 15.
              bet #1 of the speedrun.
            </li>
            <li>
              scoreboard: verified mrr, public. goal line $10k/mo.
            </li>
            <li>
              the loop: ship, price, measure, kill or double down, post
              receipts. no renames. no redesigns.
            </li>
          </ul>
        </NowSection>

        <NowSection title="also building">
          <ul className="space-y-1.5">
            <li>
              <Ext href="https://strummer.fun">strummer.fun</Ext> . the music
              suite, after the sprint ships
            </li>
            <li>
              <Ext href="https://pangaea.blog">pangaea.blog</Ext> . essays,
              first posts soon
            </li>
          </ul>
        </NowSection>

        <NowSection title="reading">
          <ul className="space-y-1.5">
            <li>The Book of Elon . Eric Jorgenson</li>
            <li>38 Letters from Rockefeller</li>
            <li>The Fabric of Reality . David Deutsch</li>
            <li>The Beginning of Infinity . David Deutsch</li>
          </ul>
        </NowSection>

        <NowSection title="listening">
          <p>
            Spotify Wrapped, 2017 to now. Full archive in{' '}
            <In href="/#sounds">sounds</In> on the homepage. The 2026 vibe is
            live at <Ext href="https://strummer.fun">strummer.fun</Ext>.
          </p>
        </NowSection>

        <NowSection title="thinking about">
          <ul className="space-y-1.5">
            <li>compounding . shipping in public</li>
            <li>1000 true fans before monetizing</li>
            <li>building bodies of work that outlive me</li>
            <li>the infinite game, magnitude by magnitude</li>
          </ul>
        </NowSection>

        <NowSection title="not doing">
          <p>
            Twitter scrolling, conferences, taking meetings that don’t lead
            anywhere. Saying no so I can say yes to deep work.
          </p>
        </NowSection>

        <footer className="mt-12 border-t border-zinc-200 dark:border-paper/10 pt-6 text-xs text-ink/45 dark:text-paper/45">
          <p>
            This is a <Ext href="https://nownownow.com/about">now page</Ext> in
            the tradition of Derek Sivers. Updated when focus shifts.
          </p>
        </footer>
      </article>
    </main>
  );
}

/* ---------- helpers ---------- */

function NowSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink/45 dark:text-paper/45">
        {title}
      </h2>
      <div className="text-base leading-relaxed text-ink/80 dark:text-paper/80 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

/** External link with the ↗ marker. */
function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-baseline gap-0.5 underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
    >
      <span>{children}</span>
      <ArrowUpRight size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
    </a>
  );
}

/** Internal link — no arrow. */
function In({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
    >
      {children}
    </Link>
  );
}
