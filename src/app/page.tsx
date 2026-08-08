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
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Refresh blob listing every hour without redeploys.
export const revalidate = 3600;

export default async function Home() {
  const sightImages = await listSightImages();

  return (
    <main className="relative">
      {/* asH1: this page has no other title element, so the name is the h1. */}
      <SiteHeader asH1 />
      <div className="grid grid-cols-1 gap-2 p-2 pb-3 sm:gap-3 sm:p-3 sm:pb-5 lg:grid-cols-2">
        <Sights images={sightImages} />
        <Sounds />
        <Curiosities />
        <Building />
      </div>
    </main>
  );
}
