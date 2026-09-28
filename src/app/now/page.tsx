import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'now',
  description:
    'what adam pang is doing right now.',
  alternates: { canonical: '/now' },
};

/**
 * /now. Sivers-tradition page: what I am doing right now. Plain
 * prose, dated header, edit when focus changes. Listed on
 * nownownow.com style directories.
 */

const LAST_UPDATED = 'september 2026';

export default function NowPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-label text-muted transition-colors hover:text-sunrise"
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
          <p className="mt-2 text-caption uppercase tracking-label text-faint">
            updated {LAST_UPDATED}
          </p>
        </header>

        <NowSection title="where">
          <p>
            <Ext href="https://ns.com">Network School</Ext>, then Singapore for{' '}
            <Ext href="https://www.asia.token2049.com">TOKEN2049</Ext>.
          </p>
        </NowSection>

        <NowSection title="building">
          <ul className="space-y-1.5">
            <li>
              <Ext href="https://anchormarianas.com">anchor marianas</Ext>. websites
              and apps for businesses, starting with guam
            </li>
            <li>
              <Ext href="https://pangpod.com">pangpod</Ext>. recording episode 1,
              a solo one on Derek Sivers&apos; Anything You Want
            </li>
          </ul>
        </NowSection>

        <NowSection title="reading">
          <ul className="space-y-1.5">
            <li>Anything You Want . Derek Sivers</li>
            <li>The Beginning of Infinity . David Deutsch</li>
          </ul>
        </NowSection>

        <NowSection title="not doing">
          <p>starting new projects. finishing the ones i have.</p>
        </NowSection>

        <footer className="mt-12 border-t border-zinc-200 dark:border-paper/10 pt-6 text-xs text-faint">
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
      <h2 className="mb-3 text-caption font-medium uppercase tracking-label text-faint">
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
