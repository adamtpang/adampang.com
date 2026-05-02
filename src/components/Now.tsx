'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { workingOn, type NowItem } from '@/data/now';

const ease = [0.16, 1, 0.3, 1] as const;

const TAG_COLOR: Record<NonNullable<NowItem['tag']>, string> = {
  claude: 'bg-violet-500',
  music: 'bg-sunrise',
  writing: 'bg-emerald-500',
  building: 'bg-amber-400',
  thinking: 'bg-sky-500',
};

export default function Now() {
  return (
    <Section
      id="now"
      title="now"
      kicker="this season"
      glow="amber"
      glowCorner="bottom-right"
    >
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        active focus. the things i&apos;m putting hours into right now.
        updated as it shifts.
      </p>

      <ol className="divide-y divide-ink/5 dark:divide-paper/5">
        {workingOn.map((item, i) => {
          const Wrapper = item.href ? 'a' : 'div';
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: 0.04 * i }}
            >
              <Wrapper
                {...(item.href
                  ? {
                      href: item.href,
                      target: item.external ? '_blank' : undefined,
                      rel: item.external ? 'noreferrer noopener' : undefined,
                    }
                  : {})}
                className={`grid grid-cols-1 gap-2 py-5 md:grid-cols-[120px_1fr] md:gap-8 ${
                  item.href ? 'group transition-colors hover:bg-sunrise/[0.03] -mx-2 px-2 rounded' : ''
                }`}
              >
                <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1">
                  {item.tag && (
                    <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-ink/40 dark:text-paper/40">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${TAG_COLOR[item.tag]}`}
                      />
                      {item.tag}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-lg tracking-tight text-ink dark:text-paper transition-colors group-hover:text-sunrise">
                      {item.title}
                    </span>
                    {item.external && item.href && (
                      <span aria-hidden className="text-xs opacity-40 transition-opacity group-hover:opacity-100">
                        ↗
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">
                    {item.detail}
                  </p>
                </div>
              </Wrapper>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
