/**
 * Curiosities. The intellectual spectrum.
 * Things adam reads, watches, writes, thinks about.
 */

export type Book = {
  title: string;
  author: string;
};

export const reading: Book[] = [
  { title: 'Elon Musk', author: 'Walter Isaacson' },
  { title: '38 Letters from Rockefeller', author: 'John D. Rockefeller' },
  { title: 'The Fabric of Reality', author: 'David Deutsch' },
  { title: 'The Beginning of Infinity', author: 'David Deutsch' },
];

export type CuriosityLink = {
  verb: string;
  label: string;
  href: string;
  external?: boolean;
};

export const curiosityLinks: CuriosityLink[] = [
  { verb: 'writing', label: 'pangaea', href: 'https://pangaea.blog', external: true },
  { verb: 'watching', label: 'youtube', href: 'https://youtube.com/@adamtpang', external: true },
  { verb: 'thinking', label: 'x', href: 'https://x.com/adamtpang', external: true },
  { verb: 'studying', label: 'thedojo', href: 'https://thedojo.fun', external: true },
  { verb: 'shelving', label: 'book.movie', href: 'https://book.movie', external: true },
];
