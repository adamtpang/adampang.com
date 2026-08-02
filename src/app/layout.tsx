import type { Metadata } from 'next';
import { Space_Grotesk, Lato, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cssVarBlock } from '@/design/tokens';
import { buildJsonLd } from '@/lib/jsonld';
import { profile } from '@/data/profile';
import './globals.css';

/*
 * Design system fonts: Space Grotesk (display), Lato (body), JetBrains Mono.
 *
 * display: 'optional', not 'swap'. Measures on this site are set in `ch`,
 * and a ch is the width of the font's own "0" glyph, so a late font swap
 * re-wraps every paragraph and changes its height. On /about that pushed a
 * 600vh section down and scored 0.118 CLS, over the 0.1 Core Web Vitals
 * threshold, from four font swaps.
 *
 * 'optional' gives the font a short window to arrive and otherwise sticks
 * with the fallback for that page load, so no swap ever happens and CLS
 * from fonts is structurally zero. next/font self-hosts and preloads these
 * from the same origin, so in practice they win the race; the cost is that
 * a first visit on a slow connection may render in the fallback face.
 */
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
  weight: ['400', '500', '600', '700'],
});

const body = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'optional',
  weight: ['300', '400', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'optional',
  weight: ['400', '500'],
});

/**
 * Metadata reads from src/data/profile.ts so the description, keywords, and
 * social cards cannot drift from the JSON-LD and /api/profile.json. Notably
 * there is no hardcoded age here any more: it went stale every birthday.
 */
export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: profile.name,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  applicationName: 'adampang.com',
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [...profile.knowsAbout, ...profile.roles, profile.name],
  alternates: {
    // NO canonical here. Next inherits root metadata into every route, so
    // a canonical set at this level made /about, /now, /ns, /support and
    // /design all declare the homepage as their canonical URL, which asks
    // search engines to drop them and attribute them to "/". Each page
    // declares its own; the homepage's lives in app/page.tsx.
    types: {
      'application/json': '/api/profile.json',
      'text/markdown': '/llms.txt',
    },
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: profile.url,
    siteName: 'adampang.com',
    title: profile.name,
    description: profile.headline,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adamtpang',
    creator: '@adamtpang',
    title: profile.name,
    description: profile.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
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
        {/*
          Design tokens, generated from src/design/tokens.json. This is the
          only declaration of the color custom properties in the app; the
          downloadable /design/tokens.css is generated from the same call,
          so the two cannot drift.
        */}
        <style
          id="design-tokens"
          dangerouslySetInnerHTML={{ __html: cssVarBlock() }}
        />
        {/* Theme bootstrap. Runs before paint to avoid FOUC. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Light by default (the design system is light-first).
                  // Dark only if the visitor explicitly toggled to it.
                  var t = localStorage.getItem('theme');
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/*
          schema.org Person + WebSite, generated from src/data/profile.ts.
          In <head> so crawlers that only parse the head still find it.
          Canonical JSON twin: /api/profile.json
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <link
          rel="alternate"
          type="application/json"
          href="/api/profile.json"
          title="Machine-readable profile"
        />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-facing brief"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
