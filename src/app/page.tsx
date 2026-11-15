import type { Metadata } from 'next';
import Link from 'next/link';
import Portrait from './Portrait';
import MediaPill from './MediaPill';
import styles from './home.module.css';

const description =
  "Adam Pang's personal site: his Spotify playlist, links to his GitHub, YouTube, SoundCloud and other profiles, his one-page CV, and ways to reach him.";

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang: music, profiles, CV and contact' },
  description,
  alternates: { canonical: '/' },
};

const profiles = [
  'https://instagram.com/adamtpang',
  'https://youtube.com/@adamtpang',
  'https://x.com/adamtpang',
  'https://soundcloud.com/adamtpang',
  'https://github.com/adamtpang',
  'https://linkedin.com/in/adampangelinan',
  'https://open.spotify.com/playlist/35KMxrfO2OqwaJ1PIoYiCa',
];

// Facts here come from src/app/cv/resume.json and the links on this page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://adampang.com/#website',
      url: 'https://adampang.com/',
      name: 'adampang.com',
      description,
      inLanguage: 'en',
      publisher: { '@id': 'https://adampang.com/#person' },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://adampang.com/#profile',
      url: 'https://adampang.com/',
      name: 'Adam Pang',
      isPartOf: { '@id': 'https://adampang.com/#website' },
      mainEntity: { '@id': 'https://adampang.com/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://adampang.com/#person',
      name: 'Adam Pang',
      url: 'https://adampang.com/',
      image: 'https://adampang.com/profile.png',
      jobTitle: 'Software Engineer',
      address: { '@type': 'PostalAddress', addressLocality: 'New Braunfels', addressRegion: 'TX', addressCountry: 'US' },
      alumniOf: { '@type': 'EducationalOrganization', name: 'App Academy', url: 'https://appacademy.io' },
      sameAs: profiles.slice(0, 6),
    },
  ],
};

const PLAYLIST = '35KMxrfO2OqwaJ1PIoYiCa';
const INTERVIEW = 'obwbhba3Y_g';

const outlinks = [
  { label: 'Instagram', href: 'https://instagram.com/adamtpang' },
  { label: 'YouTube', href: 'https://youtube.com/@adamtpang' },
  { label: 'X', href: 'https://x.com/adamtpang' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/adamtpang' },
  { label: 'GitHub', href: 'https://github.com/adamtpang' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adampangelinan' },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.composition}>
        <Portrait />
        <div className={styles.content}>
          <h1 className={styles.name}>Adam Pang</h1>

          <nav aria-label="Elsewhere">
            <ul className={styles.links}>
              {outlinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.pills} aria-label="Listen and watch">
            <MediaPill
              kind="audio"
              label="On repeat"
              detail="ult"
              title="ult, Adam Pang's Spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST}?theme=0`}
              href={`https://open.spotify.com/playlist/${PLAYLIST}`}
            />
            <MediaPill
              kind="video"
              label="Interview"
              detail="Natural Genius, episode 34"
              title="Adam Pang on Natural Genius, episode 34"
              src={`https://www.youtube-nocookie.com/embed/${INTERVIEW}?autoplay=1`}
              href={`https://www.youtube.com/watch?v=${INTERVIEW}`}
            />
          </section>

          <nav aria-label="Say hello" className={styles.contact}>
            <ul className={styles.links}>
              <li><a href="tel:+15122540011">Call</a></li>
              <li><a href="mailto:adamtpang@gmail.com">Email</a></li>
              <li><a href="https://cal.com/adampang" target="_blank" rel="noopener noreferrer">Book a call</a></li>
            </ul>
          </nav>

          <footer className={styles.footer}>
            <Link href="/cv">CV</Link>
            <Link href="/outlier">Outlier</Link>
            <Link href="/privacy">Privacy</Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
