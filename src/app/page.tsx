import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaSoundcloud, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { SiCaldotcom } from 'react-icons/si';
import Portrait from './Portrait';
import MusicPlayer from './MusicPlayer';
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
  'https://linkedin.com/in/adamtpang',
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
      address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' },
      alumniOf: { '@type': 'EducationalOrganization', name: 'App Academy', url: 'https://appacademy.io' },
      sameAs: profiles.slice(0, 6),
    },
  ],
};

const outlinks = [
  { label: 'Instagram', href: 'https://instagram.com/adamtpang', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://youtube.com/@adamtpang', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/adamtpang', Icon: FaXTwitter },
  { label: 'SoundCloud', href: 'https://soundcloud.com/adamtpang', Icon: FaSoundcloud },
  { label: 'GitHub', href: 'https://github.com/adamtpang', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adamtpang', Icon: FaLinkedinIn },
  { label: 'WhatsApp', href: 'https://wa.me/60197981734', Icon: FaWhatsapp },
  { label: 'Book a call', href: 'https://cal.com/adamtpang', Icon: SiCaldotcom },
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
          <header>
            <h1 className={styles.name}>Adam Pang</h1>
          </header>

          <nav aria-label="Elsewhere" className={styles.outlinks}>
            {outlinks.map(({ label, href, Icon }) => (
              <Fragment key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={18} aria-hidden focusable="false" />
                  <span>{label}</span>
                  <ArrowUpRight size={12} aria-hidden className={styles.externalArrow} />
                </a>{' '}
              </Fragment>
            ))}
          </nav>

          <MusicPlayer />

          <nav aria-label="Say hello" className={styles.contact}>
            <a href="tel:+15122540011"><Phone size={15} aria-hidden /> Call</a>{' '}
            <a href="mailto:adamtpang@gmail.com"><Mail size={15} aria-hidden /> Email</a>
          </nav>

          <footer className={styles.footer}>
            <Link href="/cv">About</Link>{' '}
            <Link href="/privacy">Privacy</Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
