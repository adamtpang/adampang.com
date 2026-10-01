'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { logos } from './logos';

/**
 * The site as a phone: a lock screen, then a home screen of apps that are
 * real links. The lock opens by swipe up, click, tap, or any key, so it
 * never traps anyone. Without JavaScript the lock is hidden (see page.tsx).
 *
 * Third-party logos come from Simple Icons (see logos.ts). The messages,
 * mail, and photos glyphs are drawn here, not copied from any phone maker.
 */

type Glyph = { path: string; color: string } | { node: React.ReactNode };
type App = { label: string; href?: string; external?: boolean; bg: string; glyph: Glyph };

const stroke = { fill: 'none', stroke: '#fff', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const messages: App = {
  label: 'Messages',
  href: 'sms:+15122540011',
  bg: '#34c759',
  glyph: { node: <path d="M12 4.5c-4.4 0-8 2.9-8 6.5 0 2 1.1 3.800 2.900 5L6 19.500l3.600-1.800c.8.200 1.600.300 2.400.300 4.400 0 8-2.900 8-6.500s-3.600-6.500-8-6.500Z" fill="#fff" /> },
};
const mail: App = {
  label: 'Mail',
  href: 'mailto:adamtpang@gmail.com',
  bg: '#1a8cff',
  glyph: { node: <g {...stroke}><rect x="3.500" y="6" width="17" height="12" rx="2" /><path d="m4 7.500 8 6 8-6" /></g> },
};
const whatsapp: App = {
  label: 'WhatsApp',
  href: 'https://wa.me/15122540011',
  external: true,
  bg: '#25d366',
  glyph: { path: logos.whatsapp, color: '#fff' },
};

const grid: App[] = [
  { label: 'Instagram', href: 'https://instagram.com/adamtpang', external: true, bg: 'linear-gradient(45deg,#f9ce34,#ee2a7b 50%,#6228d7)', glyph: { path: logos.instagram, color: '#fff' } },
  { label: 'YouTube', href: 'https://youtube.com/@adamtpang', external: true, bg: '#fff', glyph: { path: logos.youtube, color: '#ff0000' } },
  { label: 'X', href: 'https://x.com/adamtpang', external: true, bg: '#000', glyph: { path: logos.x, color: '#fff' } },
];

const photosGlyph: Glyph = {
  node: (
    <g>
      {['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#00c7be', '#007aff', '#5856d6', '#ff2d55'].map((c, i) => (
        <ellipse key={c} cx="12" cy="7" rx="2.600" ry="4.600" fill={c} opacity="0.850" transform={`rotate(${i * 45} 12 12)`} />
      ))}
    </g>
  ),
};

function Tile({ app }: { app: App }) {
  return (
    <span
      aria-hidden
      className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-white/10"
      style={{ background: app.bg }}
    >
      <svg viewBox="0 0 24 24" width="34" height="34">
        {'path' in app.glyph ? <path d={app.glyph.path} fill={app.glyph.color} /> : app.glyph.node}
      </svg>
    </span>
  );
}

function AppIcon({ app, onOpen, showLabel = true }: { app: App; onOpen?: () => void; showLabel?: boolean }) {
  const inner = (
    <>
      <Tile app={app} />
      {showLabel ? <span className="text-[11px] leading-none text-white">{app.label}</span> : <span className="sr-only">{app.label}</span>}
    </>
  );
  const cls = 'flex flex-col items-center gap-1.5 text-white no-underline';
  return app.href ? (
    <a href={app.href} target={app.external ? '_blank' : undefined} rel={app.external ? 'noreferrer noopener' : undefined} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onOpen} className={`${cls} bg-transparent p-0`}>
      {inner}
    </button>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className="flex items-center justify-between px-7 pt-4 text-[15px] font-semibold text-white" aria-hidden>
      <span>{time || ' '}</span>
      <svg viewBox="0 0 60 14" width="60" height="14" fill="#fff">
        <rect x="0" y="9" width="3" height="4" rx="0.800" />
        <rect x="5" y="6.500" width="3" height="6.500" rx="0.800" />
        <rect x="10" y="4" width="3" height="9" rx="0.800" />
        <rect x="15" y="1.500" width="3" height="11.500" rx="0.800" />
        <rect x="34" y="1.500" width="22" height="11" rx="3.200" fill="none" stroke="#fff" opacity="0.500" />
        <rect x="36" y="3.500" width="16" height="7" rx="1.600" />
        <rect x="57.500" y="5" width="1.800" height="4" rx="0.900" opacity="0.600" />
      </svg>
    </div>
  );
}

const WALLPAPER =
  'radial-gradient(90% 60% at 15% 10%, #7c2d12 0%, transparent 60%), radial-gradient(80% 60% at 90% 35%, #6d28d9 0%, transparent 62%), radial-gradient(90% 70% at 30% 95%, #0e7490 0%, transparent 60%), #0b1020';

type Sheet = 'spotify' | 'photos' | null;

export default function Phone() {
  const [locked, setLocked] = useState(true);
  const [sheet, setSheet] = useState<Sheet>(null);
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

  const time = now ? now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M/i, '') : '';
  const date = now ? now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  const spotify: App = { label: 'Spotify', bg: '#000', glyph: { path: logos.spotify, color: '#1ed760' } };
  const photos: App = { label: 'Photos', bg: '#fff', glyph: photosGlyph };

  return (
    <div
      className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col overflow-hidden sm:my-8 sm:min-h-[840px] sm:rounded-[48px] sm:border-[10px] sm:border-black sm:outline sm:outline-1 sm:outline-white/15"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        background: WALLPAPER,
      }}
    >
      <h1 className="sr-only">Adam Pang</h1>

      {/* Home screen */}
      <StatusBar time={time} />
      <div className="flex flex-1 flex-col px-6 pb-5 pt-8" aria-hidden={locked}>
        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSheet('spotify')}
            className="flex aspect-square flex-col justify-between rounded-[24px] bg-black/55 p-4 text-left text-white backdrop-blur-xl"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
              <path d={logos.spotify} fill="#1ed760" />
            </svg>
            <span>
              <span className="block text-[22px] font-semibold leading-tight">ult</span>
              <span className="block text-[13px] opacity-70">my playlist</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSheet('photos')}
            aria-label="Photos"
            className="relative aspect-square overflow-hidden rounded-[24px] bg-transparent p-0"
          >
            <Image src="/profile.png" alt="" fill sizes="180px" className="object-cover" />
          </button>
        </div>

        <nav aria-label="apps" className="grid grid-cols-4 gap-y-7">
          {grid.map((a) => (
            <AppIcon key={a.label} app={a} />
          ))}
          <AppIcon app={photos} onOpen={() => setSheet('photos')} />
        </nav>

        <nav aria-label="dock" className="mt-auto flex justify-around rounded-[30px] bg-white/15 px-3 py-3.5 backdrop-blur-xl">
          <AppIcon app={messages} showLabel={false} />
          <AppIcon app={whatsapp} showLabel={false} />
          <AppIcon app={mail} showLabel={false} />
          <AppIcon app={spotify} showLabel={false} onOpen={() => setSheet('spotify')} />
        </nav>
      </div>

      {/* App sheets */}
      {sheet && (
        <div className="absolute inset-0 z-10 flex flex-col gap-4 bg-black px-5 pb-6 pt-12 text-white">
          <button type="button" onClick={() => setSheet(null)} className="min-h-11 self-start bg-transparent p-0 text-[17px] text-[#0a84ff]">
            ‹ Home
          </button>
          {sheet === 'spotify' ? (
            <iframe
              src="https://open.spotify.com/embed/playlist/35KMxrfO2OqwaJ1PIoYiCa?theme=0"
              title="ult, a playlist"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block w-full flex-1 rounded-2xl border-0"
            />
          ) : (
            <Image src="/profile.png" alt="Adam Pang" width={640} height={640} className="w-full rounded-2xl object-cover" />
          )}
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
          className="absolute inset-0 z-20 flex touch-none flex-col items-center justify-between px-6 pb-3 pt-20 text-white"
          style={{ background: WALLPAPER }}
        >
          <span className="flex flex-col items-center">
            <span className="text-[20px] font-medium opacity-90">{date || ' '}</span>
            <span className="text-[96px] font-semibold leading-none">{time || ' '}</span>
          </span>
          <span className="flex flex-col items-center gap-3">
            <span className="text-[13px] opacity-70">swipe up to open</span>
            <span className="h-[5px] w-36 rounded-full bg-white" />
          </span>
        </button>
      )}
    </div>
  );
}
