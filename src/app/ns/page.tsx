import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import NSHero from '@/components/ns/NSHero';
import NSDiary from '@/components/ns/NSDiary';
import NSReferral from '@/components/ns/NSReferral';

export const metadata: Metadata = {
  title: 'network school',
  description:
    "Living at Balaji Srinivasan's Network School in Langkawi, Malaysia. Longtermer #2 since March 2025. If you're thinking about coming, use my referral link and I'll give you a tour.",
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
