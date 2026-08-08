import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'lost in the infinite',
  description: "this page does not exist (yet). head home, or wander elsewhere.",
};

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-8 text-6xl" aria-hidden>
        ♾️
      </div>
      <h1
        className="font-display text-5xl leading-[0.95] tracking-tightest text-ink dark:text-paper md:text-7xl"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        lost in the <span className="text-sunrise">infinite</span>.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        this page does not exist. or it moved. or it is still being built.
        the interesting stuff is one click away.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-sunrise dark:bg-paper dark:text-ink dark:hover:bg-sunrise dark:hover:text-paper"
        >
          home
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/ns"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-sunrise hover:text-sunrise dark:border-paper/15 dark:text-paper"
        >
          ns
        </Link>
        <a
          href="https://pangaea.blog"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-sunrise hover:text-sunrise dark:border-paper/15 dark:text-paper"
        >
          pangaea
        </a>
      </div>
    </main>
  );
}
