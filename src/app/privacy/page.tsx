import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'privacy',
  description: 'How adampang.com handles hosting logs and analytics.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <h1 className="font-display text-2xl font-bold">privacy</h1>
      <p className="mt-2 text-sm text-muted">effective 1 October 2026</p>

      <div className="mt-6 space-y-4">
        <p>
          This is a personal site. It has no accounts, no forms, and sets no cookies.
        </p>
        <p>
          Vercel hosts it and processes ordinary request data (IP address, path, browser, time) to
          deliver and secure the site. See the{' '}
          <a href="https://vercel.com/legal/privacy-notice">Vercel Privacy Notice</a>.
        </p>
        <p>
          Vercel Web Analytics and Speed Insights record anonymous, aggregated page views and page
          performance, without cookies. See Vercel&apos;s{' '}
          <a href="https://vercel.com/docs/analytics/privacy-policy">analytics privacy documentation</a>.
        </p>
        <p>
          PostHog also counts visits in its US region: the page path, hostname, and basic browser and
          device information. Cookies, person profiles, session replay, and automatic interaction
          capture are off, and query strings and referrers are stripped. See the{' '}
          <a href="https://posthog.com/privacy">PostHog Privacy Notice</a>.
        </p>
        <p>
          The links on the home page open other services (your messaging or email app, GitHub,
          pangpod.com). Nothing is sent to them unless you follow a link.
        </p>
        <p>
          Questions: <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
        </p>
      </div>

      <p className="mt-16 text-sm text-muted">
        <Link href="/">home</Link>
      </p>
    </main>
  );
}
