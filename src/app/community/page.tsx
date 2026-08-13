import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import CommunityContent from './CommunityContent';

export const metadata: Metadata = {
  title: 'community',
  description:
    'The 1000 true fans, gathering in one place. Discord for the wide room, WhatsApp for the close one.',
  alternates: { canonical: '/community' },
};

export default function CommunityPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <CommunityContent />
    </main>
  );
}
