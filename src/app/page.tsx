import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import Sights from '@/components/Sights';
import Sounds from '@/components/Sounds';
import Curiosities from '@/components/Curiosities';
import Building from '@/components/Building';
import { listSightImages } from '@/lib/blob';

// Every route declares its own canonical. Setting one in the root layout
// made all five subpages claim the homepage as theirs, which asks search
// engines to drop them.
//
// title uses `absolute` to bypass the root layout's `%s · Adam Pang`
// template: the homepage IS the Adam Pang page, so appending the brand
// again would just repeat it. description is a short, factual summary
// distinct from `profile.summary` (used for the JSON-LD Person/WebSite
// nodes and /api/profile.json), which runs ~340 characters, well past
// what search/AI crawlers want in a meta description.
const HOME_TITLE = 'Adam Pang — Builder, Writer & Musician';
const HOME_DESCRIPTION =
  'Explore Adam Pang’s public software projects, essays, music, current work, and ways to start a thoughtful collaboration.';

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  // Root layout sets openGraph.title to profile.name ("Adam Pang"), which
  // no longer matches this page's own <title> now that it carries the
  // its own concise copy. Override both here so bots that check <title>
  // against og:title for consistency see a match.
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// Refresh blob listing every hour without redeploys.
export const revalidate = 3600;

export default async function Home() {
  const sightImages = await listSightImages();

  return (
    <main className="relative">
      {/* asH1: this page has no other title element, so the name is the h1. */}
      <SiteHeader asH1 />
      <div className="grid min-w-0 grid-cols-1 gap-2 p-2 pb-3 sm:gap-3 sm:p-3 sm:pb-5 lg:grid-cols-2">
        <Sights images={sightImages} />
        <Sounds />
        <Curiosities />
        <Building />
      </div>
      <section
        aria-labelledby="home-map-heading"
        className="mx-2 mb-3 rounded-2xl border border-zinc-200 bg-white p-5 sm:mx-3 sm:mb-5 sm:p-7 dark:border-paper/15 dark:bg-ink-soft"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="relative inline-block h-2 w-2 rounded-full bg-sunrise" />
            <h2
              id="home-map-heading"
              className="font-display text-2xl tracking-tight text-ink dark:text-paper lg:text-3xl"
            >
              a map of the work
            </h2>
          </div>

          <div className="grid gap-5 text-base leading-relaxed text-ink/75 sm:text-lg lg:grid-cols-2 lg:gap-10 dark:text-paper/75">
            <div className="space-y-4">
              <p>
                Adam Pang is a builder, writer, and musician born on Guam and
                currently living at Network School in Langkawi, Malaysia. This
                personal site is the index for his public work: software
                projects, essays, music, visual references, and a dated account
                of what he is doing now.
              </p>
              <p>
                The creations panel highlights 8 public projects selected from
                a larger portfolio. The current set covers live music, football
                ratings, private-money education, civic tools, personal focus,
                people, learning Vercel, and reclaiming disk space; each card
                follows a real public link where the work can be inspected.
              </p>
              <p>
                The sounds panel links 9 Spotify Wrapped playlists from 2017
                through 2025 and a 2026 Strummer view. Spotify stays unloaded
                until a visitor chooses to play a playlist, while the rest of
                the homepage is served directly from adampang.com without a
                third-party media embed.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                The <Link href="/about" className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15">about page</Link>{' '}
                gives Adam’s public timeline and the{' '}
                <Link href="/now" className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15">now page</Link>{' '}
                records his current focus. Pangaea carries the longer essays,
                while the homepage keeps the whole body of work small enough
                to scan before following a path in depth.
              </p>
              <p>
                Adam uses this homepage as a personal hub. His current
                published offer menu and its pricing live separately at{' '}
                <a href="https://adam.gives" target="_blank" rel="noreferrer noopener" className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15">adam.gives</a>.
                For a concrete project or a thoughtful collaboration outside
                that menu, the real next step is to contact Adam with the
                relevant context rather than infer a package or promise.
              </p>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sunrise dark:bg-paper dark:text-ink"
              >
                Contact Adam about a collaboration
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
