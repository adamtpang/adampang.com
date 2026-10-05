import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import Portrait from './Portrait';
import MusicPlayer from './MusicPlayer';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang, from Guam. Music, ideas, and things I make. Find my writing, music, and a way to say hello.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.composition}>
        <Portrait />
        <div className={styles.content}>
          <header>
            <h1 className={styles.name}>Adam Pang</h1>
            <p className={styles.about}>
              I&apos;m from Guam. I like making music, building things,
              and getting lost in a good idea.
            </p>
          </header>

          <nav aria-label="Writing and music" className={styles.work}>
            <a href="https://pangaea.blog" target="_blank" rel="noopener noreferrer">
              <span>Pangaea <span className={styles.linkNote}>writing</span></span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href="https://soundcloud.com/adamtpang" target="_blank" rel="noopener noreferrer">
              <span>SoundCloud <span className={styles.linkNote}>music</span></span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </nav>

          <nav aria-label="Elsewhere" className={styles.socials}>
            {[
              ['Instagram', 'https://instagram.com/adamtpang'],
              ['YouTube', 'https://youtube.com/@adamtpang'],
              ['X', 'https://x.com/adamtpang'],
            ].map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                {label}<ArrowUpRight size={13} aria-hidden />
              </a>
            ))}
          </nav>

          <MusicPlayer />

          <nav aria-label="Say hello" className={styles.contact}>
            <a href="https://wa.me/60197981734" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} aria-hidden /> WhatsApp
            </a>
            <a href="tel:+15122540011"><Phone size={15} aria-hidden /> Call</a>
            <a href="mailto:adamtpang@gmail.com"><Mail size={15} aria-hidden /> Email</a>
          </nav>
        </div>
      </div>
    </main>
  );
}
