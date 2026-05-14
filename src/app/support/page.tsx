import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: 'support',
  description:
    'Support the work. Tip via Stripe, donate via Zcash, or become a Pangaea paid subscriber. Founding patrons get listed here permanently.',
};

export default function SupportPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <SupportContent />
    </main>
  );
}
