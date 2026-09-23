import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: 'support',
  description:
    'Support Adam Pang\'s software, writing, and music through Stripe, Buy Me a Coffee, or Zcash.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <SupportContent />
    </main>
  );
}
