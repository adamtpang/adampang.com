'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 1000 true fans, in two rooms.
 * Discord is the wide room: devlogs, launches, feedback, other builders.
 * WhatsApp is the close room: the ~50-100 who reply directly.
 * Paste real invite links here when the server/community exist. Until
 * then a card renders its "coming soon" state instead of a dead link,
 * same discipline as the crypto wallets on /support.
 */
const DISCORD_INVITE = '';
const WHATSAPP_INVITE = '';

type Room = {
  key: string;
  title: string;
  sub: string;
  note: string;
  href: string;
  dot: string;
  hover: string;
};

const ROOMS: Room[] = [
  {
    key: 'discord',
    title: 'discord',
    sub: 'the wide room',
    note: 'devlogs, real launches, feedback, other builders. public, always open.',
    href: DISCORD_INVITE,
    dot: 'bg-air',
    hover: 'hover:border-air dark:hover:border-air',
  },
  {
    key: 'whatsapp',
    title: 'whatsapp',
    sub: 'the close room',
    note: 'the smaller circle who actually reply. announcements + direct conversation.',
    href: WHATSAPP_INVITE,
    dot: 'bg-water',
    hover: 'hover:border-water dark:hover:border-water',
  },
];

export default function CommunityContent() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-fire"
      >
        <ArrowLeft size={11} />
        <span>back home</span>
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mt-6 mb-10"
      >
        <h1
          className="font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          1000 true fans<span className="text-fire">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 sm:text-lg">
          not an audience to broadcast at. a thousand people i actually know,
          who i&apos;m actually a true fan of back. two rooms, pick the one
          that fits.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ROOMS.map((r, i) =>
          r.href ? (
            <motion.a
              key={r.key}
              href={r.href}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
              whileHover={{ y: -2 }}
              className={`group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all dark:border-paper/15 dark:bg-ink-soft ${r.hover}`}
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className={`relative top-0.5 h-2 w-2 rounded-full ${r.dot}`} />
                <ArrowUpRight aria-hidden size={13} className="text-faint" />
              </div>
              <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
                {r.title}
              </div>
              <div className="mt-1 text-xs text-muted">{r.sub}</div>
              <div className="mt-3 text-caption text-faint">{r.note}</div>
            </motion.a>
          ) : (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
              className="relative flex flex-col rounded-2xl border border-dashed border-zinc-200 bg-white/50 p-5 opacity-70 dark:border-paper/15 dark:bg-ink-soft/50"
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className="relative top-0.5 h-2 w-2 rounded-full bg-faint" />
              </div>
              <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
                {r.title}
              </div>
              <div className="mt-1 text-xs text-muted">{r.sub}</div>
              <div className="mt-3 text-caption text-faint">coming soon.</div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
