'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '../MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function NSHero() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 pt-32 pb-20 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6, ease }}
        className="mb-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink/50 dark:text-paper/50 transition-colors hover:text-sunrise"
        >
          <span>←</span>
          <span>back home</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease }}
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
        <span className="nums">network school · langkawi · malaysia</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease }}
        className="font-display text-5xl leading-[0.95] tracking-tightest text-ink dark:text-paper md:text-7xl"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        come live at <span className="text-sunrise">balaji&apos;s</span> internet frontier.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease }}
        className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink/80 dark:text-paper/80"
      >
        <p>
          i&apos;ve been at{' '}
          <a
            href="https://ns.com"
            target="_blank"
            rel="noreferrer noopener"
            className="font-display italic underline decoration-sunrise/40 decoration-2 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
          >
            ns.com
          </a>{' '}
          since day one in 2024. signed the one-year residency before anyone
          else. longtermer #2.
        </p>
        <p>
          if you&apos;re thinking about coming, use my referral link below and
          dm me first. i&apos;ll give you a tour, share what i&apos;ve learned
          living here, and help you figure out whether ns is right for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <MagneticButton href="https://ns.com/adam/invite" external>
          ns.com/adam/invite
        </MagneticButton>
        <MagneticButton href="mailto:adamtpang@gmail.com" variant="ghost">
          dm for a tour
        </MagneticButton>
      </motion.div>
    </section>
  );
}
