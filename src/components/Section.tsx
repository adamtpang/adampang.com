'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

type Surface = 'card' | 'bare';

/**
 * Section wrapper.
 *   surface="card"  white-frosted card floating on the sunrise sky.
 *                   Used for content sections (currently, now, building)
 *                   so text stays comfortable to read.
 *   surface="bare"  no card, content lives directly on the gradient.
 *                   Used for sections that ARE the vibe (sounds).
 *                   Title and copy in white.
 */
export default function Section({
  id,
  title,
  kicker,
  children,
  className = '',
  surface = 'card',
}: {
  id: string;
  title: string;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
  surface?: Surface;
}) {
  const onCard = surface === 'card';

  if (onCard) {
    return (
      <section id={id} className={`relative px-3 py-2 sm:px-5 sm:py-3 ${className}`}>
        <div className="relative mx-auto w-full max-w-3xl rounded-3xl bg-white/95 px-5 py-7 shadow-2xl shadow-black/10 backdrop-blur-sm sm:px-9 sm:py-9 md:px-12 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 flex items-baseline justify-between gap-6 md:mb-7"
          >
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
            {kicker && (
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 nums">
                {kicker}
              </span>
            )}
          </motion.div>

          <div className="hairline mb-5" />

          {children}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`relative ${className}`}>
      <div className="relative mx-auto w-full max-w-3xl px-5 py-8 sm:px-6 sm:py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mb-5 flex items-baseline justify-between gap-6 md:mb-7"
        >
          <h2 className="font-display text-3xl tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {kicker && (
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/55 nums">
              {kicker}
            </span>
          )}
        </motion.div>

        <div className="mb-5 h-px bg-white/15" />

        {children}
      </div>
    </section>
  );
}
