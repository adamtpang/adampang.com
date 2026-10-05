import type { Metadata } from 'next';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaSoundcloud, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { SiCaldotcom } from 'react-icons/si';
import Portrait from './Portrait';
import MusicPlayer from './MusicPlayer';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang. Music, projects, and ways to reach me.',
  alternates: { canonical: '/' },
};

const outlinks = [
  { label: 'Instagram', href: 'https://instagram.com/adamtpang', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://youtube.com/@adamtpang', Icon: FaYoutube },
  { label: 'X', href: 'https://x.com/adamtpang', Icon: FaXTwitter },
  { label: 'SoundCloud', href: 'https://soundcloud.com/adamtpang', Icon: FaSoundcloud },
  { label: 'GitHub', href: 'https://github.com/adamtpang', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/adamtpang', Icon: FaLinkedinIn },
  { label: 'WhatsApp', href: 'https://wa.me/60197981734', Icon: FaWhatsapp },
  { label: 'Cal.com', href: 'https://cal.com/adamtpang', Icon: SiCaldotcom },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.composition}>
        <Portrait />
        <div className={styles.content}>
          <header>
            <h1 className={styles.name}>Adam Pang</h1>
          </header>

          <nav aria-label="Elsewhere" className={styles.outlinks}>
            {outlinks.map(({ label, href, Icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={18} aria-hidden focusable="false" />
                <span>{label}</span>
                <ArrowUpRight size={12} aria-hidden className={styles.externalArrow} />
              </a>
            ))}
          </nav>

          <MusicPlayer />

          <nav aria-label="Say hello" className={styles.contact}>
            <a href="tel:+15122540011"><Phone size={15} aria-hidden /> Call</a>
            <a href="mailto:adamtpang@gmail.com"><Mail size={15} aria-hidden /> Email</a>
          </nav>
        </div>
      </div>
    </main>
  );
}
