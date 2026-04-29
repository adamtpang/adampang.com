import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Cursor from '@/components/Cursor';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  // No `weight` — Fraunces is a variable font, so we get all weights + axes
  axes: ['SOFT', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adampang.com'),
  title: {
    default: 'Adam Tomas Pangelinan',
    template: '%s — Adam Tomas Pangelinan',
  },
  description:
    'Adam Tomas Guzman Pangelinan — 23, born on Guam. Builder, philosopher, musician. Living at Network School Malaysia, building optimism into software.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adampang.com',
    siteName: 'adampang.com',
    title: 'Adam Tomas Pangelinan',
    description:
      'Builder, philosopher, musician. Living at Network School Malaysia, building optimism into software.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@adamtpang',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme bootstrap — runs before paint to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="grain antialiased">
        <Cursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
