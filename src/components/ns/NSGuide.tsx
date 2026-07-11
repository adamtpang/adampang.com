'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * BET #1 (FOUNDER.md): the network school field guide. $49 one-time.
 *
 * ADAM: replace STRIPE_GUIDE_LINK with a real Stripe Payment Link:
 *   stripe.com -> Payment Links -> + New -> product "NS Field Guide",
 *   $49 one-time -> copy the buy.stripe.com URL here.
 * Until then the button falls back to a pre-order email.
 */
const STRIPE_GUIDE_LINK = ''; // <- paste buy.stripe.com/... here
const PREORDER_MAILTO =
  'mailto:adamtpang@gmail.com?subject=ns%20field%20guide%20pre-order&body=save%20me%20a%20copy%20at%20%2449.%20-%20';

const CHAPTERS = [
  'the decision: is ns right for you (honest fit test)',
  'logistics: visas, flights, what to pack, what to skip',
  'costs: the real monthly numbers, no ranges',
  'week one: how to plug in fast (500+ founders, zero awkwardness)',
  'who to meet: mapping the campus by what you are building',
  'the longtermer playbook: compounding a year at the frontier',
];

export default function NSGuide() {
  const buyHref = STRIPE_GUIDE_LINK || PREORDER_MAILTO;
  const buyLabel = STRIPE_GUIDE_LINK ? 'get the guide . $49' : 'pre-order . $49';

  return (
    <section className="relative mx-auto w-full max-w-3xl px-5 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease }}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-card sm:p-8 dark:border-paper/15 dark:bg-ink-soft"
      >
        <div className="mb-1 nums text-[11px] uppercase tracking-[2px] text-sunrise">
          the product
        </div>
        <h2 className="font-display text-2xl tracking-tight text-ink dark:text-paper sm:text-3xl">
          the ns field guide
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75 dark:text-paper/75">
          everything i know about moving to network school, from the person
          who has lived it longest. i was here the first two days it existed
          and came back for the long haul. this is the guide i wish someone
          had handed me.
        </p>

        <ul className="mt-5 space-y-1.5">
          {CHAPTERS.map((c, i) => (
            <li
              key={c}
              className="flex items-baseline gap-2.5 text-sm text-ink/80 dark:text-paper/80"
            >
              <span className="nums shrink-0 text-[0.6rem] text-ink/35 dark:text-paper/35">
                0{i + 1}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={buyHref}
            target={STRIPE_GUIDE_LINK ? '_blank' : undefined}
            rel={STRIPE_GUIDE_LINK ? 'noreferrer noopener' : undefined}
            className="inline-flex items-center gap-1.5 rounded-full bg-sunrise px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-md"
          >
            {buyLabel}
            <ArrowUpRight size={13} aria-hidden />
          </a>
          <span className="text-xs text-ink/50 dark:text-paper/50">
            one-time. yours forever. updated as ns evolves.
          </span>
        </div>

        <p className="mt-4 text-xs italic text-ink/45 dark:text-paper/45">
          applying through my link? the guide is my thank-you: email your
          receipt and it is free.
        </p>
      </motion.div>
    </section>
  );
}
