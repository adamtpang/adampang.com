'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Standard section wrapper. Title left, optional kicker right, hairline,
 * stagger reveal on scroll. Every long-form section on the home page
 * uses this so spacing and motion stay consistent.
 */
export default function Section({
  id,
  title,
  kicker,
  children,
  className = '',
}: {
  id: string;
  title: string;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-3xl px-6 py-20 md:py-28 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 flex items-baseline justify-between gap-6"
      >
        <h2 className="font-display text-3xl tracking-tight text-ink dark:text-paper md:text-4xl">
          {title}
        </h2>
        {kicker && (
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40 nums">
            {kicker}
          </span>
        )}
      </motion.div>

      <div className="hairline mb-8" />

      {children}
    </section>
  );
}
