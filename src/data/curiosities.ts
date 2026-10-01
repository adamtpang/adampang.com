/**
 * Curiosities. The intellectual spectrum.
 * Things adam reads, watches, writes, thinks about.
 */

export type Book = {
  title: string;
  author: string;
};

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
];
