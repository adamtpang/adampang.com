import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NSHero from '@/components/ns/NSHero';
import NSDiary from '@/components/ns/NSDiary';
import NSReferral from '@/components/ns/NSReferral';

export const metadata: Metadata = {
  title: 'network school',
  description:
    "Living at Balaji Srinivasan's Network School in Langkawi, Malaysia since day one. Longtermer #2. If you're thinking about coming, use my referral link and I'll give you a tour.",
};

export default function NSPage() {
  return (
    <main className="relative">
      <Header />
      <NSHero />
      <NSDiary />
      <NSReferral />
      <Footer />
    </main>
  );
}
