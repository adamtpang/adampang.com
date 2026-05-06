'use client';

/**
 * Sign-off. Tiny strip at the very bottom. Year ticker + place.
 * No outlinks here anymore. Outlinks live distributed across
 * sights / sounds / curiosities / creativities + the site header.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3 pb-3 pt-1 sm:px-5 sm:pb-5">
      <span className="font-display text-xs italic text-ink/50">
        adam pang . since {year}
      </span>
      <span className="nums text-[0.6rem] uppercase tracking-[0.22em] text-ink/35">
        built in malaysia . sunrise
      </span>
    </footer>
  );
}
