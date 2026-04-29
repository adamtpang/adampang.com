'use client';

import { motion } from 'framer-motion';
import { identities } from '@/data/identities';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Identities() {
  return (
    <section id="proof" className="relative mx-auto w-full max-w-3xl px-6 py-24 md:py-32">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease }}
        className="mb-12 flex items-baseline justify-between gap-6"
      >
        <h2 className="font-display text-3xl tracking-tight text-ink dark:text-paper md:text-4xl">
          proof
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40 nums">
          06 identities
        </span>
      </motion.div>

      <div className="hairline mb-2" />

      <ol className="divide-y divide-ink/5 dark:divide-paper/5">
        {identities.map((id, index) => (
          <motion.li
            key={id.slug}
            id={id.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease, delay: 0.05 * index }}
            className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[120px_1fr] md:gap-8 md:py-10"
          >
            {/* Identity name + index */}
            <div className="flex items-baseline gap-2 md:flex-col md:items-start md:gap-1">
              <span className="text-xs nums tracking-[0.2em] text-ink/30 dark:text-paper/30">
                0{index + 1}
              </span>
              <h3 className="font-display text-2xl tracking-tight text-sunrise md:text-3xl">
                {id.name}
              </h3>
            </div>

            {/* Action + proof links */}
            <div>
              <p className="text-base leading-relaxed text-ink/80 dark:text-paper/80 md:text-lg">
                {id.action}
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {id.proof.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer noopener' : undefined}
                      className="group inline-flex items-baseline gap-1.5 text-sm text-ink/65 dark:text-paper/65 transition-colors hover:text-sunrise"
                    >
                      <span className="underline decoration-ink/15 decoration-1 underline-offset-4 group-hover:decoration-sunrise dark:decoration-paper/15">
                        {link.label}
                      </span>
                      {link.external && (
                        <span aria-hidden className="text-[0.7em] opacity-50 group-hover:opacity-100">
                          ↗
                        </span>
                      )}
                      {link.note && (
                        <span className="hidden text-xs text-ink/40 dark:text-paper/40 md:inline">
                          {link.note}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
