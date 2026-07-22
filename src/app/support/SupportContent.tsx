'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Copy, Check } from 'lucide-react';
import { referrals } from '@/data/referrals';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Payment rails.
 * Stripe + BMC are the two one-click money paths. Pangaea paid is
 * deferred until adam has audience for the 1000-true-fans flywheel.
 */
const STRIPE_LINK = 'https://buy.stripe.com/bJe7sLa78cwZcMEc4NaMU08';
const BMC_LINK = 'https://buymeacoffee.com/adamtpang';

type Wallet = { label: string; value: string; href?: string };

// Only wallets with a non-empty `value` render. Paste your real
// BTC/ETH/SOL addresses here when ready; until then they stay hidden.
const WALLETS: Wallet[] = [
  { label: 'zcash', value: 'zcash.me/adamtpang', href: 'https://zcash.me/adamtpang' },
  { label: 'btc', value: '' },
  { label: 'eth', value: '' },
  { label: 'sol', value: '' },
];

export default function SupportContent() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const wallets = WALLETS.filter((w) => w.value);
  const refs = referrals.filter((r) => r.href);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/55 dark:text-paper/55 transition-colors hover:text-fire"
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
          buy me time<span className="text-fire">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 sm:text-lg">
          everything i ship is independent. apps, essays, music, this site.
          every dollar buys time to keep going.
        </p>
      </motion.header>

      {/* Money rails */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          {
            href: STRIPE_LINK,
            title: 'tip',
            sub: 'stripe . card or paypal',
            note: 'thank-you email + name on the patrons wall.',
            dot: 'bg-fire',
            hover: 'hover:border-fire dark:hover:border-fire',
          },
          {
            href: BMC_LINK,
            title: 'coffee',
            sub: 'buy me a coffee',
            note: 'public supporter wall, handled for me.',
            dot: 'bg-air',
            hover: 'hover:border-air dark:hover:border-air',
          },
        ].map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
            whileHover={{ y: -2 }}
            className={`group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all dark:border-paper/15 dark:bg-ink-soft ${c.hover}`}
          >
            <div className="mb-3 flex items-baseline justify-between">
              <span className={`relative top-0.5 h-2 w-2 rounded-full ${c.dot}`} />
              <ArrowUpRight aria-hidden size={13} className="text-ink/30 dark:text-paper/30" />
            </div>
            <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
              {c.title}
            </div>
            <div className="mt-1 text-xs text-ink/60 dark:text-paper/60">{c.sub}</div>
            <div className="mt-3 text-[0.7rem] text-ink/45 dark:text-paper/45">{c.note}</div>
          </motion.a>
        ))}
      </div>

      {/* Crypto wallets */}
      {wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mt-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-paper/15 dark:bg-ink-soft"
        >
          <div className="mb-3 flex items-baseline gap-2.5">
            <span className="relative top-0.5 h-2 w-2 rounded-full bg-earth" />
            <h2 className="font-display text-lg tracking-tight text-ink dark:text-paper">
              crypto
            </h2>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
              anonymous . click to copy
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {wallets.map((w) => (
              <li key={w.label}>
                <button
                  onClick={() => copy(w.label, w.value)}
                  className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-xs transition-colors hover:border-earth dark:border-paper/15"
                >
                  <span className="font-mono uppercase tracking-[0.14em] text-ink/55 dark:text-paper/55">
                    {w.label}
                  </span>
                  <span className="font-mono text-ink/80 dark:text-paper/80">{w.value}</span>
                  {copied === w.label ? (
                    <Check size={12} className="text-earth" />
                  ) : (
                    <Copy size={12} className="text-ink/35 dark:text-paper/35 group-hover:text-earth" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Referral wall */}
      {refs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mt-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-paper/15 dark:bg-ink-soft"
        >
          <div className="mb-3 flex items-baseline gap-2.5">
            <span className="relative top-0.5 h-2 w-2 rounded-full bg-air" />
            <h2 className="font-display text-lg tracking-tight text-ink dark:text-paper">
              things i use
            </h2>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
              my codes . you get a perk, i get credit
            </span>
          </div>
          <ul className="divide-y divide-zinc-100 dark:divide-paper/10">
            {refs.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-baseline justify-between gap-4 py-2.5 transition-colors"
                >
                  <span className="font-display text-base tracking-tight text-ink transition-colors group-hover:text-air dark:text-paper">
                    {r.name}
                  </span>
                  <span className="flex items-baseline gap-1.5 text-right text-xs text-ink/55 dark:text-paper/55">
                    {r.perk}
                    <ArrowUpRight aria-hidden size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Founding patrons */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-paper/15 dark:bg-ink-soft"
      >
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper sm:text-3xl">
          first fifty get etched in.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 dark:text-paper/70 sm:text-base">
          tip above $25 and your name is listed here forever, in order of
          arrival. the inside-cover of an indie album. once 50 are filled,
          the list closes.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease, delay: 0.22 }}
        className="mt-10"
      >
        <h2 className="mb-3 font-display text-2xl tracking-tight text-ink dark:text-paper">
          why support
        </h2>
        <ul className="space-y-2 text-sm text-ink/75 dark:text-paper/75">
          <li>. independent. no investors, no salary, no boss.</li>
          <li>. everything ships in public. apps + essays + music.</li>
          <li>. every dollar buys an hour. an hour buys a feature, a paragraph, a song.</li>
          <li>. it keeps me from taking a job that takes me from the work.</li>
        </ul>
      </motion.section>
    </div>
  );
}
