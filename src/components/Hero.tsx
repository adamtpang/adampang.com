'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative mx-auto w-full max-w-3xl px-5 pt-12 pb-6 sm:px-6 sm:pt-16 sm:pb-8 md:pt-24 md:pb-10">
        {/* Sigil + place + age */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="mb-3 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink/55 md:mb-4 md:text-xs"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sunrise shadow-[0_0_10px_rgba(255,92,57,0.5)]" />
          <span className="nums">23 . guam . ns malaysia</span>
        </motion.div>

        {/* Name. Black on white, italic Pang in sunrise. */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7, ease }}
          className="font-display text-[3rem] leading-[0.9] tracking-tightest text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Adam <span className="italic text-sunrise">Pang</span>
        </motion.h1>

        {/* Tagline. Single line of ink at lower opacity. */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease }}
          className="mt-3 max-w-xl text-base leading-snug text-ink/70 sm:text-lg md:mt-4"
        >
          building, writing, making music. living at network school.
        </motion.p>

        {/* CTAs. Sunrise primary, ghost outlines. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.7, ease }}
          className="mt-5 flex flex-wrap items-center gap-2 md:mt-6"
        >
          <MagneticButton href="mailto:adamtpang@gmail.com?subject=hello%20adam">
            prompt me
          </MagneticButton>
          <MagneticButton href="https://pangaea.blog" external variant="ghost">
            read pangaea
          </MagneticButton>
          <MagneticButton href="/ns" variant="ghost">
            come to ns
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
