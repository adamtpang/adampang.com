import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'contact',
  description:
    'Contact Adam Pang by email or through his public calendar, with clear expectations about collaboration, scope, and pricing.',
  alternates: { canonical: '/contact' },
};

const linkClass =
  'group inline-flex items-baseline gap-0.5 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15';

export default function ContactPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-label text-muted transition-colors hover:text-sunrise"
        >
          <ArrowLeft size={11} aria-hidden />
          <span>back home</span>
        </Link>

        <header className="mt-6 border-b border-zinc-200 pb-8 dark:border-paper/10">
          <h1
            className="mt-2 font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Say hi<span className="text-sunrise">.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Email is the best way to reach me.
          </p>
        </header>

        <section aria-labelledby="contact-email" className="mt-9">
          <h2 id="contact-email" className="font-display text-2xl tracking-tighter text-ink dark:text-paper">email</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Send it to{' '}
            <a className={linkClass} href={`mailto:${profile.contact.email}`}>
              <span>{profile.contact.email}</span>
            </a>
            . Say who you are and what you have in mind.
          </p>
          <a
            href={`mailto:${profile.contact.email}?subject=adampang.com%20inquiry`}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunrise dark:bg-paper dark:text-ink"
          >
            <Mail size={15} aria-hidden />
            Email me
          </a>
        </section>

        <section aria-labelledby="contact-calendar" className="mt-9">
          <h2 id="contact-calendar" className="font-display text-2xl tracking-tighter text-ink dark:text-paper">calendar</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Or book a time on{' '}
            <a className={linkClass} href={profile.contact.booking} target="_blank" rel="noreferrer noopener">
              <span>Cal.com</span>
              <ArrowUpRight size={11} aria-hidden />
            </a>
            .
          </p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
