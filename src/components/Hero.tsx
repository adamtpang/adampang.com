'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7">
      {/* Sigil + place + age */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
        className="mb-3 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ink/55"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
        <span className="nums">23 . guam . langkawi</span>
      </motion.div>

      {/* Name. Modest scale per andrewp.co. */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease }}
        className="font-display text-4xl leading-[0.95] tracking-tightest text-ink sm:text-5xl"
        style={{ fontVariationSettings: '"opsz" 96' }}
      >
        Adam <span className="italic text-sunrise">Pang</span>
      </motion.h1>

      {/* Inline outlinks under name, andrewp-style. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.6, ease }}
        className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink/70"
      >
        {[
          { label: 'email', href: 'mailto:adamtpang@gmail.com' },
          { label: 'pangaea', href: 'https://pangaea.blog' },
          { label: 'x', href: 'https://x.com/adamtpang' },
          { label: 'github', href: 'https://github.com/adamtpang' },
          { label: 'ns', href: '/ns' },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
          >
            {l.label}
          </a>
        ))}
      </motion.div>

      {/* Single primary CTA pinned to bottom. */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46, duration: 0.6, ease }}
        className="mt-auto flex pt-5"
      >
        <Button asChild size="sm">
          <a href="mailto:adamtpang@gmail.com?subject=hello%20adam">prompt me</a>
        </Button>
      </motion.div>
    </section>
  );
}
