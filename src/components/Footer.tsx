'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Elsewhere. Trimmed to the essential set, andrewp.co-style.
 * Full hub still exists in /design or via direct outlinks across
 * the bento. This is the at-a-glance set: who, where, talk.
 */
const links = [
  { label: 'email', href: 'mailto:adamtpang@gmail.com' },
  { label: 'cal', href: 'https://cal.com/adampang' },
  { label: 'x', href: 'https://x.com/adamtpang' },
  { label: 'github', href: 'https://github.com/adamtpang' },
  { label: 'pangaea', href: 'https://pangaea.blog' },
  { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang' },
  { label: 'instagram', href: 'https://instagram.com/adamtpang' },
  { label: 'youtube', href: 'https://youtube.com/@adamtpang' },
  { label: 'farcaster', href: 'https://farcaster.xyz/adampang' },
  { label: 'anchormarianas', href: 'https://anchormarianas.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <section className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7">
      <div className="mb-4 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-2.5">
          <span className="relative top-0.5 inline-block h-2 w-2 rounded-full bg-sun" />
          <h2 className="font-display text-2xl tracking-tight text-ink lg:text-3xl">
            elsewhere
          </h2>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/40">
          on the internet
        </span>
      </div>

      <motion.ul
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-ink/75"
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise"
            >
              {l.label}
            </a>
          </li>
        ))}
      </motion.ul>

      <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-5 border-t border-zinc-100">
        <span className="font-display text-xs italic text-ink/55">
          adam pang . since {year}
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/30 nums">
          built in malaysia
        </span>
      </div>
    </section>
  );
}
