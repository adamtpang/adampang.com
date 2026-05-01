'use client';

import { motion } from 'framer-motion';
import Section from '../Section';
import MagneticButton from '../MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

const offer = [
  {
    label: 'a tour of the campus',
    detail: 'the gym, the pool, the food, the people, the rhythm.',
  },
  {
    label: 'what living here is actually like',
    detail: 'the parts the website does not tell you. unfiltered.',
  },
  {
    label: 'who to meet first',
    detail: '500+ founders pass through. i can point you at the right ones.',
  },
  {
    label: 'how i moved here from guam',
    detail: 'logistics, visas, what to bring, what to skip.',
  },
];

export default function NSReferral() {
  return (
    <Section id="referral" title="my offer" kicker="if you use my link">
      <p className="mb-8 max-w-xl text-base leading-relaxed text-ink/70 dark:text-paper/70 md:text-lg">
        most referral programs end at the click. mine starts there. use my
        link, send me an email, and you get:
      </p>

      <ul className="mb-10 space-y-4">
        {offer.map((o, i) => (
          <motion.li
            key={o.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease, delay: 0.06 * i }}
            className="flex items-baseline gap-3"
          >
            <span className="nums text-xs text-ink/30 dark:text-paper/30 mt-1">
              0{i + 1}
            </span>
            <div>
              <div className="font-display text-lg tracking-tight text-ink dark:text-paper">
                {o.label}
              </div>
              <div className="text-sm text-ink/60 dark:text-paper/60">{o.detail}</div>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="rounded-2xl border border-sunrise/30 bg-sunrise/5 p-6 md:p-8">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-sunrise">
          two steps
        </h3>
        <ol className="mb-6 space-y-2 text-base text-ink/85 dark:text-paper/85">
          <li>
            <span className="nums text-xs text-ink/40 dark:text-paper/40 mr-2">01</span>
            apply through{' '}
            <a
              href="https://ns.com/adam/invite"
              target="_blank"
              rel="noreferrer noopener"
              className="font-display italic underline decoration-sunrise decoration-2 underline-offset-4 transition-colors hover:text-sunrise"
            >
              ns.com/adam/invite
            </a>
          </li>
          <li>
            <span className="nums text-xs text-ink/40 dark:text-paper/40 mr-2">02</span>
            email me with why you want to come
          </li>
        </ol>
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton href="https://ns.com/adam/invite" external>
            apply with my link
          </MagneticButton>
          <MagneticButton href="mailto:adamtpang@gmail.com?subject=ns%20referral" variant="ghost">
            email me
          </MagneticButton>
        </div>
      </div>
    </Section>
  );
}
