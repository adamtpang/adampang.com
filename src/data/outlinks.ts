/**
 * Internet hub. Every place adam pang exists online, in one list.
 * Footer renders this grouped by category.
 */

export type Outlink = {
  label: string;
  href: string;
  category: 'meet' | 'words' | 'sound' | 'work' | 'social' | 'video' | 'code';
  note?: string;
};

export const outlinks: Outlink[] = [
  /* MEET. Synchronous and direct comms. */
  { label: 'email', href: 'mailto:adamtpang@gmail.com', category: 'meet' },
  { label: 'cal.com', href: 'https://cal.com/adampang', category: 'meet', note: 'book a call' },
  { label: 'whatsapp', href: 'https://wa.me/16718885528', category: 'meet' },

  /* SOCIAL. Async and discoverable. */
  { label: 'x', href: 'https://x.com/adamtpang', category: 'social' },
  { label: 'farcaster', href: 'https://farcaster.xyz/adampang', category: 'social' },
  { label: 'instagram', href: 'https://instagram.com/adamtpang', category: 'social' },
  { label: 'linkedin', href: 'https://linkedin.com/in/adamtpang', category: 'social' },
  { label: 'pinterest', href: 'https://pinterest.com/adamtpang', category: 'social', note: 'mood boards' },

  /* VIDEO. */
  { label: 'youtube', href: 'https://youtube.com/@adamtpang', category: 'video' },

  /* SOUND. Music as the through-line. */
  { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang', category: 'sound' },
  { label: 'spotify', href: 'https://open.spotify.com/user/adamtpang', category: 'sound' },
  { label: 'wonderhall', href: 'https://wonderhall.live', category: 'sound', note: 'concert series' },
  { label: 'vibecheck.style', href: 'https://vibecheck.style', category: 'sound', note: 'music app' },

  /* WORDS. The writing universe. */
  { label: 'pangaea', href: 'https://pangaea.blog', category: 'words', note: 'newsletter' },
  { label: 'book.movie', href: 'https://book.movie', category: 'words', note: 'bookshelf' },

  /* CODE. Where the building happens. */
  { label: 'github', href: 'https://github.com/adamtpang', category: 'code' },

  /* WORK. The shipped apps. */
  { label: 'anchormarianas', href: 'https://anchormarianas.com', category: 'work', note: 'studio' },
  { label: 'thedojo.fun', href: 'https://thedojo.fun', category: 'work' },
  { label: 'sellsniper.com', href: 'https://sellsniper.com', category: 'work' },
  { label: 'optimism.fun', href: 'https://optimism.fun', category: 'work' },
  { label: 'deathmoney.fyi', href: 'https://deathmoney.fyi', category: 'work' },
  { label: 'technodemocracy.app', href: 'https://technodemocracy.app', category: 'work' },
];
