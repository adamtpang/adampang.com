'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 pt-24 pb-32 md:pt-36 md:pb-44">
      {/* Profile photo. Rounded square, sunrise glow ring, subtle hover lift. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.7, ease }}
        className="mb-10 inline-block"
      >
        <div className="group relative h-32 w-32 md:h-44 md:w-44">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-sunrise via-sunrise/50 to-sunrise/20 blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
          <Image
            src="/profile.png"
            alt="Adam Pang"
            width={224}
            height={224}
            priority
            className="relative h-full w-full rounded-3xl object-cover ring-1 ring-ink/10 dark:ring-paper/15 transition-all duration-500 group-hover:ring-sunrise group-hover:-translate-y-0.5"
          />
        </div>
      </motion.div>

      {/* Sunrise sigil + place + age */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease }}
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
        <span className="nums">23 · guam · ns malaysia</span>
      </motion.div>

      {/* Name. Fraunces, dramatic optical sizing */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease }}
        className="font-display text-6xl leading-[0.95] tracking-tightest text-ink dark:text-paper md:text-8xl lg:text-9xl"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        Adam <span className="text-sunrise">Pang</span>
      </motion.h1>

      {/* One-line tagline. Specific, voice-true, no identity ladder. */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 dark:text-paper/75 md:text-xl"
      >
        building, writing, making music. living at network school. shipping
        small bets that compound.
      </motion.p>

      {/* CTAs. Fun, human, sivers-style frictionless. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease }}
        className="mt-10 flex flex-wrap items-center gap-3"
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="mt-24 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40"
      >
        <span>scroll</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
