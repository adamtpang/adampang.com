import { ArrowUpRight } from 'lucide-react';
import styles from './home.module.css';

const videoId = 'obwbhba3Y_g';

export default function ProfileHighlights() {
  return (
    <div className={styles.showcase}>
      <section id="interview" aria-labelledby="interview-title">
        <h2 id="interview-title">Natural Genius podcast</h2>
        <p className={styles.showcaseMeta}>
          Episode 34 with Sam Bell &middot; Released <time dateTime="2026-04-23">April 23, 2026</time>
        </p>
        <iframe
          className={styles.interviewPlayer}
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="Adam Pang on Natural Genius: Network School, coding mischief, and choosing action before certainty"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
        <a className={styles.showcaseLink} href={`https://www.youtube.com/watch?v=${videoId}`}>
          Watch on YouTube <ArrowUpRight size={14} aria-hidden />
        </a>
      </section>
      <section className={styles.achievements} aria-labelledby="achievements-title">
        <h2 id="achievements-title">Selected achievements</h2>
        <dl>
          <div>
            <dt><a href="https://github.com/adamtpang">GitHub</a></dt>
            <dd><strong>5,660 contributions</strong> and <strong>362 pull requests</strong></dd>
            <dd className={styles.showcaseMeta}>CV snapshot, <time dateTime="2026-11-01">November 2026</time></dd>
          </div>
          <div>
            <dt>Hearthstone</dt>
            <dd>Reached <strong>Legend</strong> in multiple seasons</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
