import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
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
const HOME_TITLE = 'Adam Pang';
const HOME_DESCRIPTION =
  'The personal site of Adam Pang: sights, sounds, curiosity, and creations.';

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
    </main>
  );
}
