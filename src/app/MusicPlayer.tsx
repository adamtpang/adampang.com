import { ArrowUpRight } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa6';
import styles from './home.module.css';

const PLAYLIST = '35KMxrfO2OqwaJ1PIoYiCa';
const SPOTIFY_URL = `https://open.spotify.com/playlist/${PLAYLIST}`;

export default function MusicPlayer() {
  return (
    <section className={styles.music} aria-label="Music">
      <div className={styles.musicHeading}>
        <span>On repeat</span>
        <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
          <FaSpotify size={14} aria-hidden focusable="false" /> Spotify <ArrowUpRight size={12} aria-hidden />
        </a>
      </div>
      <iframe
        className={styles.nativePlayer}
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST}?theme=0`}
        title="ult, Adam Pang's Spotify playlist"
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </section>
  );
}
