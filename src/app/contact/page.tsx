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
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-sunrise"
        >
          <ArrowLeft size={11} aria-hidden />
          <span>back home</span>
        </Link>

        <header className="mt-6 border-b border-zinc-200 pb-8 dark:border-paper/10">
          <p className="text-caption uppercase tracking-[0.22em] text-faint">operated by Adam Pang</p>
          <h1
            className="mt-2 font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Contact Adam<span className="text-sunrise">.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Adam Pang operates adampang.com. Email is the preferred way to
            reach him about a project, collaboration, the software shown here,
            writing, or music. This page does not submit or store a message;
            each contact link opens the named service.
          </p>
        </header>

        <section aria-labelledby="contact-email" className="mt-9">
          <h2 id="contact-email" className="font-display text-2xl tracking-tight text-ink dark:text-paper">email</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Email Adam at{' '}
            <a className={linkClass} href={`mailto:${profile.contact.email}`}>
              <span>{profile.contact.email}</span>
            </a>
            . A useful first note names the person or project, links any
            relevant context, and says what decision or outcome the sender is
            trying to reach.
          </p>
          <a
            href={`mailto:${profile.contact.email}?subject=adampang.com%20inquiry`}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunrise dark:bg-paper dark:text-ink"
          >
            <Mail size={15} aria-hidden />
            Email Adam with context
          </a>
        </section>

        <section aria-labelledby="contact-calendar" className="mt-9">
          <h2 id="contact-calendar" className="font-display text-2xl tracking-tight text-ink dark:text-paper">calendar</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Adam also publishes a{' '}
            <a className={linkClass} href={profile.contact.booking} target="_blank" rel="noreferrer noopener">
              <span>Cal.com booking page</span>
              <ArrowUpRight size={11} aria-hidden />
            </a>
            . Available times, meeting length, and any questions are shown by
            Cal.com when the page opens; adampang.com does not duplicate or
            guess those details.
          </p>
        </section>

        <section aria-labelledby="contact-terms" className="mt-9 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-paper/15 dark:bg-ink-soft sm:p-6">
          <h2 id="contact-terms" className="font-display text-2xl tracking-tight text-ink dark:text-paper">commercial context</h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Adampang.com is a personal hub, not a single storefront. Adam’s
            current published offer menu and its pricing live at{' '}
            <a className={linkClass} href="https://adam.gives" target="_blank" rel="noreferrer noopener">
              <span>adam.gives</span>
              <ArrowUpRight size={11} aria-hidden />
            </a>
            . For an inquiry outside that menu, any scope, quote, price,
            deadline, or commitment exists only if Adam states it directly in
            a later conversation.
          </p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
