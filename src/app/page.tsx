import type { Metadata } from 'next';
import Portrait from './Portrait';
import { FaGithub, FaInstagram, FaLinkedinIn, FaPhone, FaSoundcloud, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { SiCaldotcom, SiGmail } from 'react-icons/si';
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
  { label: 'Instagram', href: 'https://instagram.com/adamtpang', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://youtube.com/@adamtpang', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/adamtpang', Icon: FaXTwitter },
  { label: 'SoundCloud', href: 'https://soundcloud.com/adamtpang', Icon: FaSoundcloud },
  { label: 'GitHub', href: 'https://github.com/adamtpang', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adampangelinan', Icon: FaLinkedinIn },
];

const contact = [
  { label: 'Call', href: 'tel:+15122540011', Icon: FaPhone, external: false },
  { label: 'Email', href: 'mailto:adamtpang@gmail.com', Icon: SiGmail, external: false },
  { label: 'Book a call', href: 'https://cal.com/adampang', Icon: SiCaldotcom, external: true, wide: true },
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
            <ul className={styles.icons}>
              {outlinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a className={styles.iconButton} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon size={18} aria-hidden focusable="false" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.players} aria-label="Listen and watch">
            <iframe
              className={styles.audioPlayer}
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST}?theme=0`}
              title="ult, Adam Pang's Spotify playlist"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <iframe
              className={styles.videoPlayer}
              src={`https://www.youtube-nocookie.com/embed/${INTERVIEW}`}
              title="Adam Pang on Natural Genius, episode 34"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </section>

          <nav aria-label="Say hello">
            <ul className={styles.icons}>
              {contact.map(({ label, href, Icon, external, wide }) => (
                <li key={href}>
                  <a
                    className={wide ? `${styles.iconButton} ${styles.wide}` : styles.iconButton}
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon size={wide ? 44 : 18} aria-hidden focusable="false" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
