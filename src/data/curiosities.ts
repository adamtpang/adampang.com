/**
 * Curiosities. The intellectual spectrum.
 * Things adam reads, watches, writes, thinks about.
 */

export type Book = {
  title: string;
  author: string;
};

export const reading: Book[] = [
  { title: 'The Book of Elon', author: 'Eric Jorgenson' },
  { title: '38 Letters from Rockefeller', author: 'John D. Rockefeller' },
  { title: 'The Fabric of Reality', author: 'David Deutsch' },
  { title: 'The Beginning of Infinity', author: 'David Deutsch' },
];

export type CuriosityLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const curiosityLinks: CuriosityLink[] = [
  { label: 'pangaea', href: 'https://pangaea.blog', external: true },
  { label: 'youtube', href: 'https://youtube.com/@adamtpang', external: true },
  { label: 'x', href: 'https://x.com/adamtpang', external: true },
  { label: 'summon', href: 'https://summon.guide', external: true },
  { label: 'book.movie', href: 'https://book.movie', external: true },
];
