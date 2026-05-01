/**
 * Internet presence. Every place adam exists online, in one list.
 * Used by the footer (full list) and potentially the contact modal.
 */

export type Outlink = {
  label: string;
  href: string;
  category: 'social' | 'work' | 'words' | 'sound' | 'meet';
  note?: string;
};

export const outlinks: Outlink[] = [
  { label: 'x', href: 'https://x.com/adamtpang', category: 'social' },
  { label: 'github', href: 'https://github.com/adamtpang', category: 'social' },
  { label: 'farcaster', href: 'https://farcaster.xyz/adampang', category: 'social' },
  { label: 'youtube', href: 'https://youtube.com/@adamtpang', category: 'social' },

  { label: 'pangaea', href: 'https://pangaea.blog', category: 'words', note: 'newsletter' },
  { label: 'book.movie', href: 'https://book.movie', category: 'words', note: 'bookshelf' },

  { label: 'soundcloud', href: 'https://soundcloud.com/adampang', category: 'sound' },
  { label: 'vibecheck.style', href: 'https://vibecheck.style', category: 'sound' },
  { label: 'wonderhall.live', href: 'https://wonderhall.live', category: 'sound' },

  { label: 'thedojo.fun', href: 'https://thedojo.fun', category: 'work' },
  { label: 'sellsniper.com', href: 'https://sellsniper.com', category: 'work' },
  { label: 'optimism.fun', href: 'https://optimism.fun', category: 'work' },
  { label: 'deathmoney.fyi', href: 'https://deathmoney.fyi', category: 'work' },
  { label: 'anchormarianas.com', href: 'https://anchormarianas.com', category: 'work', note: 'studio' },

  { label: 'cal.com/adampang', href: 'https://cal.com/adampang', category: 'meet', note: 'book a call' },
  { label: 'email', href: 'mailto:adamtpang@gmail.com', category: 'meet' },
  { label: 'whatsapp', href: 'https://wa.me/16718885528', category: 'meet' },
];
