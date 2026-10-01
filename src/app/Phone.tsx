'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * The site as a phone: a lock screen, then a home screen of apps that are
 * real links. The lock opens by swipe up, click, tap, or any key, so it
 * never traps anyone. Without JavaScript the lock is hidden (see page.tsx).
 *
 * An original layout, not a copy of any phone maker's interface.
 */

type App = { label: string; glyph: string; href: string; external?: boolean };

const apps: App[] = [
  { label: 'instagram', glyph: 'ig', href: 'https://instagram.com/adamtpang', external: true },
  { label: 'youtube', glyph: 'yt', href: 'https://youtube.com/@adamtpang', external: true },
  { label: 'x', glyph: 'x', href: 'https://x.com/adamtpang', external: true },
  { label: 'farcaster', glyph: 'fc', href: 'https://farcaster.xyz/adampang', external: true },
];

const dock: App[] = [
  { label: 'whatsapp', glyph: 'wa', href: 'https://wa.me/15122540011', external: true },
  { label: 'messages', glyph: 'sms', href: 'sms:+15122540011' },
  { label: 'mail', glyph: '@', href: 'mailto:adamtpang@gmail.com' },
];

const facts = [
  'top 1% github user',
  '2 weeks of 100% whoop sleep',
  'former #1 tetris player on guam',
  'top 0.5% hearthstone player',
  'from guam',
];

const tile =
  'flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-card font-display text-lg font-bold text-fg no-underline';

function Icon({ app }: { app: App }) {
  return (
    <a
      href={app.href}
      target={app.external ? '_blank' : undefined}
      rel={app.external ? 'noreferrer noopener' : undefined}
      className="flex flex-col items-center gap-1.5 text-fg no-underline"
    >
      <span className={tile} aria-hidden>
        {app.glyph}
      </span>
      <span className="text-xs text-muted">{app.label}</span>
    </a>
  );
}

export default function Phone() {
  const [locked, setLocked] = useState(true);
  const [music, setMusic] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const startY = useRef<number | null>(null);

  // Clock is client-only so the server and browser never disagree.
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!locked) return;
    const open = () => setLocked(false);
    window.addEventListener('keydown', open);
    return () => window.removeEventListener('keydown', open);
  }, [locked]);

  const time = now ? now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
  const date = now
    ? now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }).toLowerCase()
    : '';

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col overflow-hidden sm:my-8 sm:min-h-[820px] sm:rounded-[44px] sm:border sm:border-line">
      {/* Home screen */}
      <div className="flex flex-1 flex-col gap-8 px-6 pb-6 pt-14" aria-hidden={locked}>
        <section className="rounded-3xl border border-line bg-card p-5">
          <div className="flex items-center gap-3">
            <Image
              src="/profile.png"
              alt="Adam Pang"
              width={44}
              height={44}
              priority
              className="h-11 w-11 rounded-xl object-cover"
            />
            <h1 className="font-display text-lg font-bold">adam pang</h1>
          </div>
          <ul className="mt-4 space-y-1 text-sm">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <nav aria-label="apps" className="grid grid-cols-4 gap-y-6">
          {apps.map((a) => (
            <Icon key={a.label} app={a} />
          ))}
          <button
            type="button"
            onClick={() => setMusic(true)}
            className="flex flex-col items-center gap-1.5 bg-transparent p-0 text-fg"
          >
            <span className={tile} aria-hidden>
              ult
            </span>
            <span className="text-xs text-muted">spotify</span>
          </button>
        </nav>

        <nav
          aria-label="contact"
          className="mt-auto flex justify-around rounded-3xl border border-line bg-card px-4 py-4"
        >
          {dock.map((a) => (
            <Icon key={a.label} app={a} />
          ))}
        </nav>
      </div>

      {/* Playlist sheet */}
      {music && (
        <div className="absolute inset-0 z-10 flex flex-col gap-4 bg-bg px-6 pb-6 pt-14">
          <button
            type="button"
            onClick={() => setMusic(false)}
            className="min-h-11 self-start bg-transparent p-0 text-accent"
          >
            back
          </button>
          <iframe
            src="https://open.spotify.com/embed/playlist/35KMxrfO2OqwaJ1PIoYiCa?theme=0"
            title="ult, a playlist"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full flex-1 rounded-2xl border-0"
          />
        </div>
      )}

      {/* Lock screen */}
      {locked && (
        <button
          type="button"
          data-lock
          aria-label="unlock"
          onClick={() => setLocked(false)}
          onPointerDown={(e) => (startY.current = e.clientY)}
          onPointerMove={(e) => {
            if (startY.current !== null && startY.current - e.clientY > 60) setLocked(false);
          }}
          onPointerUp={() => (startY.current = null)}
          className="absolute inset-0 z-20 flex touch-none flex-col items-center justify-between bg-bg px-6 pb-10 pt-24 text-fg"
        >
          <span className="flex flex-col items-center gap-1">
            <span className="text-muted">{date || ' '}</span>
            <span className="font-display text-7xl font-bold">{time || ' '}</span>
          </span>
          <span className="flex flex-col items-center gap-3">
            <span className="font-display text-xl font-bold">adam pang</span>
            <span className="text-sm text-muted">swipe up, tap, or press any key</span>
          </span>
        </button>
      )}
    </div>
  );
}
