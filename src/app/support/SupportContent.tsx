'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Copy, Check } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const ZCASH_ADDRESS = 'zcash.me/adamtpang';
// Set this once you've created the Stripe Payment Link.
// stripe.com -> Payment Links -> create one for "tip adam".
const STRIPE_LINK = 'https://buy.stripe.com/adampang-placeholder';
const PANGAEA_PAID_LINK = 'https://pangaea.blog/subscribe';

export default function SupportContent() {
  const [copied, setCopied] = useState(false);

  const copyZcash = async () => {
    try {
      await navigator.clipboard.writeText(ZCASH_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/55 dark:text-paper/55 transition-colors hover:text-sunrise"
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
        <div className="mb-3 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-ink/55 dark:text-paper/55">
          <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
          <span>support the work</span>
        </div>
        <h1
          className="font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          buy me time<span className="text-sunrise">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 sm:text-lg">
          everything i ship is independent. apps, essays, music, this site.
          every dollar buys time to keep going. three ways below.
        </p>
      </motion.header>

      {/* Three support paths */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Stripe one-off */}
        <motion.a
          href={STRIPE_LINK}
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          whileHover={{ y: -2 }}
          className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-sunrise dark:border-paper/15 dark:bg-ink-soft dark:hover:border-sunrise"
        >
          <div className="mb-3 flex items-baseline justify-between">
            <span className="relative top-0.5 h-2 w-2 rounded-full bg-sunrise" />
            <ArrowUpRight aria-hidden size={13} className="text-ink/30 dark:text-paper/30 transition-colors group-hover:text-sunrise" />
          </div>
          <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
            tip
          </div>
          <div className="mt-1 text-xs text-ink/60 dark:text-paper/60">
            stripe . one-off . $5 / $25 / $100
          </div>
          <div className="mt-3 text-[0.7rem] text-ink/45 dark:text-paper/45">
            personal thank-you email + your name on the patrons wall.
          </div>
        </motion.a>

        {/* Pangaea paid */}
        <motion.a
          href={PANGAEA_PAID_LINK}
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease }}
          whileHover={{ y: -2 }}
          className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-sky dark:border-paper/15 dark:bg-ink-soft dark:hover:border-sky"
        >
          <div className="mb-3 flex items-baseline justify-between">
            <span className="relative top-0.5 h-2 w-2 rounded-full bg-sky" />
            <ArrowUpRight aria-hidden size={13} className="text-ink/30 dark:text-paper/30 transition-colors group-hover:text-sky" />
          </div>
          <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
            subscribe
          </div>
          <div className="mt-1 text-xs text-ink/60 dark:text-paper/60">
            pangaea paid . monthly . $5/mo
          </div>
          <div className="mt-3 text-[0.7rem] text-ink/45 dark:text-paper/45">
            paid posts, archive, community.
          </div>
        </motion.a>

        {/* Zcash */}
        <motion.button
          onClick={copyZcash}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.5, ease }}
          whileHover={{ y: -2 }}
          className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left transition-all hover:border-plum dark:border-paper/15 dark:bg-ink-soft dark:hover:border-plum"
        >
          <div className="mb-3 flex items-baseline justify-between">
            <span className="relative top-0.5 h-2 w-2 rounded-full bg-plum" />
            {copied ? (
              <Check aria-hidden size={13} className="text-leaf" />
            ) : (
              <Copy aria-hidden size={13} className="text-ink/30 dark:text-paper/30 transition-colors group-hover:text-plum" />
            )}
          </div>
          <div className="font-display text-xl tracking-tight text-ink dark:text-paper">
            zcash
          </div>
          <div className="mt-1 text-xs font-mono text-ink/60 dark:text-paper/60">
            {ZCASH_ADDRESS}
          </div>
          <div className="mt-3 text-[0.7rem] text-ink/45 dark:text-paper/45">
            anonymous + private. click to copy.
          </div>
        </motion.button>
      </div>

      {/* Founding patrons explainer */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease, delay: 0.2 }}
        className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 dark:border-paper/15 dark:bg-ink-soft"
      >
        <div className="mb-2 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ink/45 dark:text-paper/45">
          <span className="h-1.5 w-1.5 rounded-full bg-sun" />
          <span>founding patrons</span>
        </div>
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper sm:text-3xl">
          first fifty get etched in.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 dark:text-paper/70 sm:text-base">
          everyone who tips above $25 (or subscribes for a year) gets their
          name listed here forever, in order of arrival. inside-cover of an
          indie album. once 50 are filled, the list closes.
        </p>
        <p className="mt-4 text-xs italic text-ink/45 dark:text-paper/45">
          patron 001 . the page is blank, waiting.
        </p>
      </motion.section>

      {/* Why */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease, delay: 0.28 }}
        className="mt-10"
      >
        <h2 className="mb-3 font-display text-2xl tracking-tight text-ink dark:text-paper">
          why support
        </h2>
        <ul className="space-y-2 text-sm text-ink/75 dark:text-paper/75">
          <li>. independent. no investors, no salary, no boss.</li>
          <li>. everything ships in public. apps + essays + music.</li>
          <li>. every dollar buys an hour. an hour buys a feature, a paragraph, a song.</li>
          <li>. you keep me from having to take a job that takes me away from the work.</li>
        </ul>
      </motion.section>
    </div>
  );
}
