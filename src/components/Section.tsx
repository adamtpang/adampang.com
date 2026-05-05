'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

type SigilColor = 'sunrise' | 'sky' | 'leaf' | 'ember' | 'sun' | 'plum';

const SIGIL_BG: Record<SigilColor, string> = {
  sunrise: 'bg-sunrise',
  sky: 'bg-sky',
  leaf: 'bg-leaf',
  ember: 'bg-ember',
  sun: 'bg-sun',
  plum: 'bg-plum',
};

/**
 * Boxed section. White bg, subtle border, dense padding. Each
 * section gets a rainbow sigil dot to its left so the site has
 * visual rhythm without leaving white.
 */
export default function Section({
  id,
  title,
  kicker,
  children,
  className = '',
  sigil = 'sunrise',
}: {
  id: string;
  title: string;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
  sigil?: SigilColor;
}) {
  return (
    <section id={id} className={`relative px-3 py-1.5 sm:px-5 sm:py-2 ${className}`}>
      <div className="relative mx-auto w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white px-5 py-6 sm:px-7 sm:py-7 md:px-9 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          className="mb-4 flex items-baseline justify-between gap-6 md:mb-5"
        >
          <div className="flex items-baseline gap-2.5">
            <span className={`relative top-0.5 inline-block h-2 w-2 rounded-full ${SIGIL_BG[sigil]}`} />
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
              {title}
            </h2>
          </div>
          {kicker && (
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/40 nums">
              {kicker}
            </span>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
