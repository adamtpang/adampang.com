import SiteAnalytics from './SiteAnalytics';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cssVarBlock } from '@/design/tokens';
import './globals.css';

// display: 'optional' so a late font never re-wraps the page.
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
  weight: ['400'],
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'optional',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adampang.com'),
  title: { default: 'Adam Pang', template: '%s · Adam Pang' },
  description: 'Adam Pang. Writing, music, and a way to say hello.',
  openGraph: { type: 'website', url: 'https://adampang.com', siteName: 'adampang.com', title: 'Adam Pang' },
  twitter: { card: 'summary_large_image', title: 'Adam Pang' },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: '/favicon.svg?v=yin-yang-2', type: 'image/svg+xml' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
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
