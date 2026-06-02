import type { Metadata } from 'next';
import { Space_Grotesk, Lato, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

// Design system fonts: Space Grotesk (display), Lato (body), JetBrains Mono (labels).
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const body = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '700'],
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
    default: 'Adam Pang',
    template: '%s · Adam Pang',
  },
  description:
    'Adam Pang. 23, born on Guam. Optimist, curious, creative, musician, writer, founder. Living at Network School Malaysia, building optimism into software.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adampang.com',
    siteName: 'adampang.com',
    title: 'Adam Pang',
    description:
      'Optimist, curious, creative, musician, writer, founder. Living at Network School Malaysia, building optimism into software.',
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme bootstrap. Runs before paint to avoid FOUC. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Dark by default. Light only if the visitor explicitly
                  // toggled to light mode (and we saved it to localStorage).
                  var t = localStorage.getItem('theme');
                  if (t !== 'light') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {/* JSON-LD person schema. Helps Google knowledge graph + AI agents
            understand who Adam is and what he does. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Adam Pang',
              alternateName: 'Adam Tomas Guzman Pangelinan',
              url: 'https://adampang.com',
              email: 'adamtpang@gmail.com',
              birthPlace: { '@type': 'Place', name: 'Guam' },
              jobTitle: 'Founder, Builder, Musician',
              description:
                'Building, writing, making music. Living at Network School in Malaysia. Shipping small bets that compound.',
              sameAs: [
                'https://x.com/adamtpang',
                'https://github.com/adamtpang',
                'https://farcaster.xyz/adampang',
                'https://youtube.com/@adamtpang',
                'https://instagram.com/adamtpang',
                'https://linkedin.com/in/adamtpang',
                'https://soundcloud.com/adamtpang',
                'https://pangaea.blog',
              ],
              knowsAbout: [
                'software',
                'philosophy',
                'music',
                'building',
                'network states',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Anchor Marianas',
                url: 'https://anchormarianas.com',
              },
              affiliation: {
                '@type': 'Organization',
                name: 'Network School',
                url: 'https://ns.com',
              },
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
