import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import NSHero from '@/components/ns/NSHero';
import NSDiary from '@/components/ns/NSDiary';
import NSReferral from '@/components/ns/NSReferral';

export const metadata: Metadata = {
  title: 'network school',
  description:
    "Notes and referral information for Balaji Srinivasan's Network School.",
  alternates: { canonical: '/ns' },
};

export default function NSPage() {
  return (
    <main className="relative">
      <NSHero />
      <NSDiary />
      <NSReferral />
      <Footer />
    </main>
  );
}
