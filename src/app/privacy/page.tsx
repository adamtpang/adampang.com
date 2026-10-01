import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'privacy',
  description:
    'How Adam Pang’s personal site handles PostHog and Vercel analytics, performance data, local storage, external links, and contact.',
  alternates: { canonical: '/privacy' },
};

const externalClass =
  'group inline-flex items-baseline gap-0.5 underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-sunrise hover:decoration-sunrise dark:decoration-paper/15';

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={externalClass} href={href} target="_blank" rel="noreferrer noopener">
      <span>{children}</span>
      <ArrowUpRight size={11} aria-hidden />
    </a>
  );
}

function PrivacySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="font-display text-2xl tracking-tighter text-ink dark:text-paper">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="relative">
      <SiteHeader />
      <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-label text-muted transition-colors hover:text-sunrise"
        >
          <ArrowLeft size={11} aria-hidden />
          <span>back home</span>
        </Link>

        <header className="mt-6 border-b border-zinc-200 pb-8 dark:border-paper/10">
          <p className="text-caption uppercase tracking-label text-faint">effective 10 September 2026</p>
          <h1
            className="mt-2 font-display text-4xl leading-[0.95] tracking-tightest text-ink dark:text-paper sm:text-5xl"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Privacy<span className="text-sunrise">.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
            Adam Pang operates adampang.com as a public personal site. The site
            has no visitor accounts and no contact form. It uses Vercel for
            hosting, anonymous traffic measurement, and real-user performance
            measurement.
          </p>
        </header>

        <PrivacySection title="hosting and request logs">
          <p>
            Vercel serves adampang.com and necessarily processes ordinary web
            request information such as an IP address, requested path, browser
            or user-agent information, and request time to deliver and secure
            the site. Vercel describes its platform-level processing in the{' '}
            <ExternalLink href="https://vercel.com/legal/privacy-notice">Vercel Privacy Notice</ExternalLink>.
          </p>
        </PrivacySection>

        <PrivacySection title="analytics and performance">
          <p>
            Vercel Web Analytics records anonymous, aggregated page-view data.
            A data point can include the page path, timestamp, referrer,
            filtered query parameters, approximate city or country, device
            type, operating system, and browser. Vercel says the analytics
            product does not use cookies or retain an IP-linked identity; its
            daily visitor hash is discarded after 24 hours.
          </p>
          <p>
            Vercel Speed Insights measures how pages perform on real devices,
            including Web Vitals such as loading speed, responsiveness, and
            layout stability. Those measurements help Adam see whether a
            deployment makes the site faster or slower. The current setup sends
            no custom analytics events and builds no advertising profile. More
            detail is available in Vercel’s{' '}
            <ExternalLink href="https://vercel.com/docs/analytics/privacy-policy">Web Analytics privacy documentation</ExternalLink>.
          </p>
        </PrivacySection>

        <PrivacySection title="cookieless page analytics">
          <p>
            PostHog also measures visits to public pages in its US region. We send
            the public page path, hostname, and basic browser and device information.
            Analytics cookies, person profiles, session replay, and automatic interaction
            capture are disabled. We strip query strings, URL fragments, and referrer
            data; we do not send form inputs. Network requests expose an IP address
            to the receiving service. See the{' '}
            <ExternalLink href="https://posthog.com/privacy">PostHog Privacy Notice</ExternalLink>.
          </p>
        </PrivacySection>

        <PrivacySection title="browser storage, cookies, and media">
          <p>
            Adampang.com stores a theme value in local storage only after a
            visitor changes light or dark mode. The initial page response sets
            no cookie, and the homepage does not use a cookie for analytics.
            Clearing site data in the browser removes the saved theme.
          </p>
        </PrivacySection>

        <PrivacySection title="contact, payments, and external links">
          <p>
            The <Link className="underline decoration-ink/15 underline-offset-4 hover:text-sunrise dark:decoration-paper/15" href="/contact">contact page</Link>{' '}
            only links to email, text, phone, WhatsApp, and Adam’s public Cal.com page; adampang.com does
            not submit or store the message itself. Other pages link to services
            such as WhatsApp, GitHub, Pangaea, and social networks. A visitor shares data with those
            services only by following a link or using their service, under the
            destination’s own terms and privacy policy.
          </p>
        </PrivacySection>

        <PrivacySection title="questions">
          <p>
            Privacy questions about this site can be sent to Adam at{' '}
            <a className={externalClass} href={`mailto:${profile.contact.email}`}>
              <span>{profile.contact.email}</span>
            </a>
            . Sending email necessarily gives Adam and the email providers the
            information included in that message; no message is sent until the
            visitor chooses to send it from an email service.
          </p>
        </PrivacySection>
      </article>
      <Footer />
    </main>
  );
}
