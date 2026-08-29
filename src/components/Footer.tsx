'use client';

/**
 * Sign-off. Tiny strip at the very bottom. Year ticker + place.
 * No outlinks here anymore. Outlinks live distributed across
 * sights / sounds / curiosities / creativities + the site header.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 px-3 pb-3 pt-1 sm:px-5 sm:pb-5">
      <span className="font-display text-xs italic text-muted">
        Adam Pang operates adampang.com . {year}
      </span>
      <nav aria-label="Trust and contact" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <a className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15" href="/about">about</a>
        <a className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15" href="/contact">contact</a>
        <a className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15" href="/privacy">privacy</a>
      </nav>
    </footer>
  );
}
