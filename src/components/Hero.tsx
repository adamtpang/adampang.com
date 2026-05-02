'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient sky. Premium painterly fade. Light mode = morning sunrise.
          Dark mode = ember dusk. Both warm, both anchored in sunrise. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Light mode sky */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              'radial-gradient(ellipse 1200px 600px at 50% -200px, rgba(255, 92, 57, 0.55) 0%, rgba(255, 169, 153, 0.25) 35%, rgba(255, 248, 244, 0) 65%)',
          }}
        />
        {/* Dark mode sky */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              'radial-gradient(ellipse 1200px 600px at 50% -200px, rgba(255, 92, 57, 0.4) 0%, rgba(255, 92, 57, 0.12) 35%, rgba(14, 14, 12, 0) 65%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 pt-28 pb-32 md:pt-44 md:pb-48">
        {/* Sigil + place + age */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/65 dark:text-paper/65"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sunrise shadow-[0_0_12px_rgba(255,92,57,0.6)]" />
          <span className="nums">23 . guam . ns malaysia</span>
        </motion.div>

        {/* Name. Larger optical sizing, sunrise gradient on Pang. */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="font-display text-6xl leading-[0.92] tracking-tightest text-ink dark:text-paper md:text-8xl lg:text-[9rem]"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Adam{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #FF5C39 0%, #FF8970 50%, #F59E0B 100%)',
            }}
          >
            Pang
          </span>
        </motion.h1>

        {/* Tagline. Specific, voice-true. */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 dark:text-paper/80 md:text-xl"
        >
          building, writing, making music. living at network school. shipping
          small bets that compound.
        </motion.p>

        {/* CTAs. Primary uses a sunrise-gradient fill for premium playful. */}
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
          className="mt-24 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/45 dark:text-paper/45"
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
      </div>
    </section>
  );
}
