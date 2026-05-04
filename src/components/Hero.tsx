'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative mx-auto w-full max-w-3xl px-5 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-12 md:pt-28 md:pb-16">
        {/* Sigil + place + age. White on gradient. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="mb-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-white/80 md:mb-6 md:text-xs"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          <span className="nums">23 . guam . ns malaysia</span>
        </motion.div>

        {/* Name. */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7, ease }}
          className="font-display text-[3.25rem] leading-[0.9] tracking-tightest text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Adam <span className="italic">Pang</span>
        </motion.h1>

        {/* Tagline. */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease }}
          className="mt-4 max-w-xl text-base leading-snug text-white/90 sm:text-lg md:mt-6 md:text-xl"
        >
          building, writing, making music. living at network school.
        </motion.p>

        {/* CTAs. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.7, ease }}
          className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 md:mt-7"
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
