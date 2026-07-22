import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'operation 24',
  description:
    '$0 to $3,000 by my 24th birthday. 21 days. 24/7 AI agents + 1 founder. Live public scoreboard, real Stripe numbers only.',
};

// Refresh the countdown hourly.
export const revalidate = 3600;

/**
 * Operation 24 — the public revenue scoreboard.
 * Ported from the old Jekyll site (24.html) into the current design system.
 *
 * TO UPDATE THE SCOREBOARD: edit the three numbers below. Cash is the only
 * one that matters. Real stripe money only.
 */
const DEADLINE = new Date('2026-07-31T23:59:59Z');
const GOAL = 3000;
const CASH = 0; // stripe-verified cash collected
const SENDS = 0; // outbound sends fired

const RULES = [
  'Real Stripe numbers only. The cash counter moves when money actually lands. No pledges, no verbal commits, no invoices pending.',
  'Win or lose, the tally posts July 31. If it is $3,000, you will see it here. If it is $0, you will see that too.',
  'Strangers only. No friends, no family, no pity purchases. Every dollar comes from someone who bought because the thing is worth it.',
];

const STOREFRONTS = [
  {
    name: 'anchormarianas.com',
    url: 'https://anchormarianas.com',
    what: 'AI-powered apps in days, not months. Landing pages, MVPs, internal tools.',
  },
  {
    name: 'sellsniper.com',
    url: 'https://sellsniper.com',
    what: 'The AI sales agent. Finds the exact humans on Earth who would love your work.',
  },
  {
    name: 'deathmoney.fyi',
    url: 'https://deathmoney.fyi',
    what: 'Calculate your financial freedom number. Claude-powered statement analysis.',
  },
  {
    name: 'company.university',
    url: 'https://company.university',
    what: 'Top companies as campuses. Learn from the best, get hired.',
  },
];

export default function Operation24Page() {
  const daysLeft = Math.max(
    0,
    Math.ceil((DEADLINE.getTime() - Date.now()) / 86_400_000)
  );
  const pct = Math.min(100, Math.round((CASH / GOAL) * 100));

  return (
    <main className="relative">
      <SiteHeader />
      <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/55 dark:text-paper/55 transition-colors hover:text-sunrise"
        >
          <ArrowLeft size={11} />
          <span>back home</span>
        </Link>

        {/* Hero */}
        <header className="mt-6">
          <div className="nums mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[3px] text-amber">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            operation 24 · live scoreboard
          </div>
          <h1
            className="font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            $0 to <span className="text-sunrise">$3,000</span> by my 24th
            birthday.
          </h1>
          <p className="mt-3 text-base text-ink/70 dark:text-paper/70 sm:text-lg">
            21 days. 24/7 AI agents + 1 founder.
          </p>
        </header>

        {/* Scoreboard */}
        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-paper/15 dark:bg-ink-soft">
          <div className="nums text-[11px] uppercase tracking-[2px] text-ink/45 dark:text-paper/45">
            the scoreboard
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="nums font-display text-5xl tracking-tighter text-ink dark:text-paper sm:text-6xl">
              ${CASH.toLocaleString()}
            </span>
            <span className="text-sm text-ink/50 dark:text-paper/50">
              of ${GOAL.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-paper/10">
            <div
              className="h-full rounded-full bg-sunrise transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="nums mt-3 text-[10px] uppercase tracking-[1.5px] text-ink/40 dark:text-paper/40">
            cash collected · stripe-verified
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-5 dark:border-paper/10">
            {[
              { n: SENDS, l: 'sends fired' },
              { n: daysLeft, l: 'days left' },
              { n: `${STOREFRONTS.length}/${STOREFRONTS.length}`, l: 'storefronts live' },
            ].map((s) => (
              <div key={s.l}>
                <div className="nums font-display text-2xl tracking-tight text-ink dark:text-paper">
                  {s.n}
                </div>
                <div className="mt-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-ink/45 dark:text-paper/45">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="mt-10">
          <h2 className="nums text-[11px] uppercase tracking-[2px] text-ink/45 dark:text-paper/45">
            the rules
          </h2>
          <ol className="mt-4 space-y-4">
            {RULES.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="nums shrink-0 text-xs text-sunrise">
                  0{i + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink/80 dark:text-paper/80 sm:text-base">
                  {r}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Storefronts */}
        <section className="mt-10">
          <h2 className="nums text-[11px] uppercase tracking-[2px] text-ink/45 dark:text-paper/45">
            the storefronts · {STOREFRONTS.length} live
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {STOREFRONTS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block h-full rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-sunrise dark:border-paper/15 dark:bg-ink-soft"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-base tracking-tight text-ink transition-colors group-hover:text-sunrise dark:text-paper">
                      {s.name}
                    </span>
                    <ArrowUpRight
                      size={12}
                      aria-hidden
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink/60 dark:text-paper/60">
                    {s.what}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* The machine */}
        <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-paper/15 dark:bg-ink-soft">
          <h2 className="nums text-[11px] uppercase tracking-[2px] text-ink/45 dark:text-paper/45">
            the machine
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-paper/80 sm:text-base">
            AI agents run the back office 24/7. Ops, market intel, and this
            scoreboard update daily on autopilot, while the 1 founder does the
            only thing agents cannot: sell to strangers.
          </p>
        </section>

        <p className="mt-8 text-xs text-ink/40 dark:text-paper/40">
          powered by Anchor Marianas LLC
        </p>
      </article>
    </main>
  );
}
