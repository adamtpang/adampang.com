import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'about',
  description:
    'Hi, I’m Adam Pang. Born on Guam. Building, writing, making music. The chronological version of who I am and what I’ve done so far.',
};

/**
 * /about. Sivers-style: plain prose, chronological milestones, no
 * decoration. Edit the copy below as the story grows. Long-form on
 * pangaea.blog; this is the at-a-glance.
 */
export default function AboutPage() {
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

        <h1
          className="mt-6 font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          Hi, I’m Adam <span className="italic text-sunrise">Pang</span>.
        </h1>

        <div className="prose-tight mt-6 max-w-none text-base leading-relaxed text-ink/80 dark:text-paper/80 sm:text-lg">
          <p>
            Born on Guam. Living at{' '}
            <a
              className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise"
              href="https://ns.com/adam/apply"
              target="_blank"
              rel="noreferrer noopener"
            >
              Network School
            </a>{' '}
            in Langkawi, Malaysia. Builder, writer, musician. I make small bets
            in public.
          </p>
          <p className="mt-4">
            Most of what I do is{' '}
            <Link className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise" href="/">on the homepage</Link>
            . The long version of who I am is on{' '}
            <a
              className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise"
              href="https://pangaea.blog"
              target="_blank"
              rel="noreferrer noopener"
            >
              pangaea.blog
            </a>
            . Below is the punch list.
          </p>
        </div>

        {/* Milestones */}
        <Section title="important things in my life so far">
          <Bullet year="2002" text="Born on Guam." />
          <Bullet
            year="2020"
            text="Finished high school. Started writing music seriously."
          />
          <Bullet
            year="2022"
            text="Graduated App Academy. First job as a software engineer."
          />
          <Bullet
            year="2024"
            text="At Network School for the first two days of its launch."
          />
          <Bullet
            year="2025"
            text="Moved to Network School full-time. Longtermer #2. Started shipping in public."
          />
          <Bullet
            year="2026"
            text="Pangaea launches. Started vibecheck.style. Built this site."
          />
        </Section>

        <Section title="where i’ve lived">
          <Plain>Guam → United States → Langkawi, Malaysia.</Plain>
        </Section>

        <Section title="what i’m doing now">
          <Plain>
            Building{' '}
            <ExtLink href="https://vibecheck.style">vibecheck.style</ExtLink>,
            writing{' '}
            <ExtLink href="https://pangaea.blog">pangaea.blog</ExtLink>,
            shipping software from a hammock in Malaysia. Full current state
            is on the <Link href="/" className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise">homepage</Link>.
          </Plain>
        </Section>

        <Section title="people who shaped me">
          <Plain>
            David Deutsch, John D. Rockefeller, Elon Musk, Derek Sivers, Balaji
            Srinivasan, Naval Ravikant. The full list is at{' '}
            <ExtLink href="https://summon.guide">summon.guide</ExtLink>.
          </Plain>
        </Section>

        <Section title="how to reach me">
          <Plain>
            Email is best:{' '}
            <ExtLink href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</ExtLink>
            . Or{' '}
            <ExtLink href="https://cal.com/adamtpang">book a call</ExtLink>.
          </Plain>
        </Section>

        <Section title="if you want to support">
          <Plain>
            See <Link href="/support" className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise">/support</Link>.
            Tipping, founding patrons, referrals to tools I actually use.
          </Plain>
        </Section>
      </article>
    </main>
  );
}

/* ---------- helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink/45 dark:text-paper/45">
        {title}
      </h2>
      <div className="text-base leading-relaxed text-ink/80 dark:text-paper/80 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

function Bullet({ year, text }: { year: string; text: string }) {
  return (
    <div className="mb-1.5 flex items-baseline gap-3">
      <span className="nums shrink-0 text-xs text-ink/40 dark:text-paper/40">{year}</span>
      <span>{text}</span>
    </div>
  );
}

function Plain({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise"
    >
      {children}
    </a>
  );
}
