'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:min-h-0 lg:p-10">
      {/* Sigil + place + age */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
        className="mb-3 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink/55"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sunrise shadow-[0_0_10px_rgba(255,92,57,0.5)]" />
        <span className="nums">23 . guam . langkawi</span>
      </motion.div>

      {/* Name. */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.7, ease }}
        className="font-display text-[3rem] leading-[0.9] tracking-tightest text-ink sm:text-6xl lg:text-7xl xl:text-8xl"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        Adam <span className="italic text-sunrise">Pang</span>
      </motion.h1>

      {/* Tagline. */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.7, ease }}
        className="mt-3 text-base leading-snug text-ink/70 sm:text-lg lg:mt-4"
      >
        building, writing, making music.{' '}
        <a
          href="/ns"
          className="font-display italic text-sunrise underline decoration-sunrise/40 decoration-2 underline-offset-4 transition-colors hover:decoration-sunrise"
        >
          longtermer #2
        </a>{' '}
        at network school since march 2025.
      </motion.p>

      {/* CTAs. Pushed to bottom of cell so the cell breathes. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46, duration: 0.7, ease }}
        className="mt-auto flex flex-wrap items-center gap-2 pt-6"
      >
        <Button asChild>
          <a href="mailto:adamtpang@gmail.com?subject=hello%20adam">prompt me</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="https://pangaea.blog" target="_blank" rel="noreferrer noopener">
            read pangaea
          </a>
        </Button>
        <Button variant="secondary" asChild>
          <a href="/ns">come to ns</a>
        </Button>
      </motion.div>
    </section>
  );
}
