/**
 * Internet hub. Every place adam pang exists online, in one list.
 *
 * The footer renders this grouped by category. Add or remove links
 * here, the homepage updates everywhere they show.
 *
 * If a `confirmHandle` flag is true, the URL is a best-guess and adam
 * should confirm or remove it. Edit this list to lock in real handles.
 */

export type Outlink = {
  label: string;
  href: string;
  category: 'meet' | 'words' | 'sound' | 'work' | 'social' | 'video' | 'code';
  note?: string;
  /** Best-guess URL pending confirmation. */
  confirmHandle?: boolean;
};

export const outlinks: Outlink[] = [
  /* MEET. Synchronous and direct comms. */
  { label: 'email', href: 'mailto:adamtpang@gmail.com', category: 'meet' },
  { label: 'cal.com', href: 'https://cal.com/adampang', category: 'meet', note: 'book a call' },
  { label: 'whatsapp', href: 'https://wa.me/16718885528', category: 'meet' },
  { label: 'telegram', href: 'https://t.me/adamtpang', category: 'meet', confirmHandle: true },

  /* SOCIAL. Async and discoverable. */
  { label: 'x', href: 'https://x.com/adamtpang', category: 'social' },
  { label: 'farcaster', href: 'https://farcaster.xyz/adampang', category: 'social' },
  { label: 'instagram', href: 'https://instagram.com/adamtpang', category: 'social', confirmHandle: true },
  { label: 'threads', href: 'https://www.threads.net/@adamtpang', category: 'social', confirmHandle: true },
  { label: 'linkedin', href: 'https://linkedin.com/in/adamtpang', category: 'social', confirmHandle: true },
  { label: 'bluesky', href: 'https://bsky.app/profile/adamtpang.bsky.social', category: 'social', confirmHandle: true },

  /* VIDEO. */
  { label: 'youtube', href: 'https://youtube.com/@adamtpang', category: 'video' },
  { label: 'tiktok', href: 'https://tiktok.com/@adamtpang', category: 'video', confirmHandle: true },

  /* SOUND. Music as the through-line. */
  { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang', category: 'sound' },
  { label: 'spotify', href: 'https://open.spotify.com/user/adamtpang', category: 'sound', confirmHandle: true },
  { label: 'wonderhall', href: 'https://wonderhall.live', category: 'sound', note: 'concert series' },
  { label: 'vibecheck.style', href: 'https://vibecheck.style', category: 'sound', note: 'music app' },

  /* WORDS. The writing universe. */
  { label: 'pangaea', href: 'https://pangaea.blog', category: 'words', note: 'newsletter' },
  { label: 'book.movie', href: 'https://book.movie', category: 'words', note: 'bookshelf' },

  /* CODE. Where the building happens. */
  { label: 'github', href: 'https://github.com/adamtpang', category: 'code' },
  { label: 'producthunt', href: 'https://www.producthunt.com/@adamtpang', category: 'code', note: 'launches', confirmHandle: true },
  { label: 'indiehackers', href: 'https://www.indiehackers.com/adamtpang', category: 'code', confirmHandle: true },

  /* WORK. The shipped apps. Cross-references the Building section. */
  { label: 'anchormarianas', href: 'https://anchormarianas.com', category: 'work', note: 'studio' },
  { label: 'thedojo.fun', href: 'https://thedojo.fun', category: 'work' },
  { label: 'sellsniper.com', href: 'https://sellsniper.com', category: 'work' },
  { label: 'optimism.fun', href: 'https://optimism.fun', category: 'work' },
  { label: 'deathmoney.fyi', href: 'https://deathmoney.fyi', category: 'work' },
  { label: 'technodemocracy.app', href: 'https://technodemocracy.app', category: 'work' },
];
