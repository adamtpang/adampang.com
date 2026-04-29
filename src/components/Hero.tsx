'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-3xl px-6 pt-24 pb-32 md:pt-36 md:pb-44">
      {/* Sunrise sigil — small dot, top-left of name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease }}
        className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/60 dark:text-paper/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
        <span className="nums">23 · guam · ns malaysia</span>
      </motion.div>

      {/* Name — Fraunces, dramatic optical sizing */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease }}
        className="font-display text-5xl leading-[0.95] tracking-tightest text-ink dark:text-paper md:text-7xl lg:text-8xl"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        Adam Tomas <em className="font-display not-italic text-sunrise">Guzman</em>{' '}
        Pangelinan
      </motion.h1>

      {/* Manifesto */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease }}
        className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 dark:text-paper/75 md:text-xl"
      >
        Optimist. Builder. Musician. Living at{' '}
        <a
          href="https://ns.com/adam/invite"
          className="underline decoration-sunrise/40 decoration-2 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
          target="_blank"
          rel="noreferrer"
        >
          Network School
        </a>{' '}
        in Malaysia, building optimism into software. Playing the infinite game,
        shipping apps, essays, and songs — magnitude by magnitude.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <MagneticButton href="https://adampang.substack.com" external>
          Subscribe to Pangaea
        </MagneticButton>
        <MagneticButton href="#contact" variant="ghost">
          Say hi
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
