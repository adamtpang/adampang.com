import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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

        {/* Portrait + name. The greats lead with a face. */}
        <div className="mt-6 flex items-center gap-5">
          <Image
            src="/profile.png"
            alt="Adam Pang"
            width={96}
            height={96}
            priority
            className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-ink/10 sm:h-24 sm:w-24 dark:ring-paper/15"
          />
          <h1
            className="font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Hi, I’m Adam <span className="italic text-sunrise">Pang</span>.
          </h1>
        </div>

        <div className="prose-tight mt-6 max-w-none text-base leading-relaxed text-ink/80 dark:text-paper/80 sm:text-lg">
          <p>
            Born on Guam. Living at{' '}
            <ExtLink href="https://ns.com/adam/apply">Network School</ExtLink>{' '}
            in Langkawi, Malaysia. Builder, writer, musician. I make small bets
            in public.
          </p>
          <p className="mt-4">
            Most of what I do is{' '}
            <Link
              className="underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise"
              href="/"
            >
              on the homepage
            </Link>
            . The long version of who I am is on{' '}
            <ExtLink href="https://pangaea.blog">pangaea.blog</ExtLink>. Below
            is the punch list.
          </p>
        </div>

        {/* Receipts. Honest numbers, including the unflattering one. */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl border border-zinc-200 bg-white p-5 sm:grid-cols-4 dark:border-paper/15 dark:bg-ink-soft">
          {[
            { n: '#2', l: 'longtermer at ns' },
            { n: '9', l: 'apps shipped' },
            { n: '2024', l: 'at ns since day one' },
            { n: '500+', l: 'founders on campus' },
          ].map((r) => (
            <div key={r.l}>
              <div className="nums font-display text-2xl tracking-tight text-ink dark:text-paper">
                {r.n}
              </div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-ink/50 dark:text-paper/50">
                {r.l}
              </div>
            </div>
          ))}
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
            text="Pangaea launches. Started strummer.fun. Built this site."
          />
        </Section>

        <Section title="where i’ve lived">
          <Plain>Guam → United States → Langkawi, Malaysia.</Plain>
        </Section>

        <Section title="what i’m doing now">
          <Plain>
            Building{' '}
            <ExtLink href="https://strummer.fun">strummer.fun</ExtLink>,
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
  const isHttp = href.startsWith('http');
  return (
    <a
      href={href}
      target={isHttp ? '_blank' : undefined}
      rel={isHttp ? 'noreferrer noopener' : undefined}
      className="group inline-flex items-baseline gap-0.5 underline decoration-ink/15 dark:decoration-paper/15 decoration-1 underline-offset-4 hover:text-sunrise hover:decoration-sunrise"
    >
      <span>{children}</span>
      {isHttp && (
        <ArrowUpRight size={11} aria-hidden className="opacity-50 transition-opacity group-hover:opacity-100" />
      )}
    </a>
  );
}
