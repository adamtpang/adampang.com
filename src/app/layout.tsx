import SiteAnalytics from './SiteAnalytics';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cssVarBlock } from '@/design/tokens';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://adampang.com'),
  title: { default: 'Adam Pang', template: '%s · Adam Pang' },
  description: 'Adam Pang. Music, projects, and ways to reach me.',
  openGraph: { type: 'website', url: 'https://adampang.com', siteName: 'adampang.com', title: 'Adam Pang' },
  twitter: { card: 'summary_large_image', title: 'Adam Pang' },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/favicon.svg?v=yin-yang-2', type: 'image/svg+xml' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Design tokens, generated from src/design/tokens.json (shared with pangpod.com). */}
        <style id="design-tokens" dangerouslySetInnerHTML={{ __html: cssVarBlock() }} />
      </head>
      <body className="antialiased">
        {children}
        <SiteAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
