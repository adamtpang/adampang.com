import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './privacy.module.css';

const description =
  'What adampang.com collects: a cookieless homepage pageview in PostHog, Vercel Web Analytics and Speed Insights, hosting logs, and the Spotify embed.';

export const metadata: Metadata = {
  title: { absolute: 'Privacy policy · Adam Pang' },
  description,
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link href="/">adampang.com</Link>
      </p>
      <h1 className={styles.title}>Privacy policy</h1>
      <p className={styles.meta}>
        Last updated <time dateTime="2026-11-01">November 1, 2026</time>
      </p>

      <p>
        adampang.com is the personal website of Adam Pang. The site has no accounts, no forms and no
        newsletter, and it sets no cookies of its own. This policy lists every service the site uses
        and what each one receives.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel. Like any web host, Vercel processes the request data your browser
        sends, such as your IP address, browser user agent and the page requested, to deliver the page
        and protect the service.
      </p>

      <h2>Analytics</h2>
      <ul>
        <li>
          <strong>PostHog</strong> (US cloud) records one anonymous pageview when the homepage loads. It
          runs in cookieless mode and keeps no person profiles. Referrer, campaign parameters, click
          identifiers and the full URL are removed before the event is sent. Autocapture, session
          replay, page-leave events, heatmaps, surveys and error capture are all turned off. No other
          page is tracked by PostHog.
        </li>
        <li>
          <strong>Vercel Web Analytics</strong> counts page views without cookies.
        </li>
        <li>
          <strong>Vercel Speed Insights</strong> collects page performance measurements, such as load
          timing, to keep the site fast.
        </li>
      </ul>

      <h2>Spotify player</h2>
      <p>
        The homepage embeds a Spotify playlist player loaded from open.spotify.com. Spotify receives
        your request when the player loads and may set its own cookies, under the{' '}
        <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
          Spotify privacy policy
        </a>
        .
      </p>

      <h2>Fonts and links</h2>
      <p>
        Fonts are served from this site, not from a third-party font service. Links to Instagram,
        YouTube, X, SoundCloud, GitHub, LinkedIn and Cal.com take you to those services,
        whose own privacy policies apply once you leave adampang.com.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can go to{' '}
        <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
      </p>
    </main>
  );
}
