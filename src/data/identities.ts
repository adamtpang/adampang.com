/**
 * Identities. Each one is a claim with proof.
 *
 * Schema:
 *   slug    short id, used for anchors (#optimist)
 *   name    display name (lowercase, voice-consistent)
 *   action  one short sentence, what Adam does in this identity
 *   proof   concrete artifacts that back the claim, each a link
 *
 * Edit this file to add proof as the body of work grows. The site reads
 * directly from here, so identities scale with you over the years.
 */

export type ProofLink = {
  label: string;
  href: string;
  external?: boolean;
  note?: string;
};

export type Identity = {
  slug: string;
  name: string;
  action: string;
  proof: ProofLink[];
};

export const identities: Identity[] = [
  {
    slug: 'optimist',
    name: 'optimist',
    action:
      'believer in the infinite game. applying the beginning of infinity to life and work, magnitude by magnitude.',
    proof: [
      {
        label: 'the beginning of infinity',
        href: 'https://en.wikipedia.org/wiki/The_Beginning_of_Infinity',
        external: true,
        note: 'the book that shaped the worldview',
      },
      {
        label: 'david deutsch',
        href: 'https://en.wikipedia.org/wiki/David_Deutsch',
        external: true,
      },
      { label: 'flow state', href: 'https://flowstate.com', external: true },
    ],
  },
  {
    slug: 'curious',
    name: 'curious',
    action:
      'studying the greatest lives ever lived. reading widely across philosophy, economics, technology, and biographies.',
    proof: [
      {
        label: 'heroes on thedojo.fun',
        href: 'https://thedojo.fun',
        external: true,
        note: 'pick yours, find mine',
      },
      {
        label: 'bookshelf on book.movie',
        href: 'https://book.movie',
        external: true,
        note: 'currently reading + favorites',
      },
    ],
  },
  {
    slug: 'creative',
    name: 'creative',
    action:
      'designing software with care. minimal, performant, aesthetic. craft over volume.',
    proof: [
      { label: 'adampang.com', href: 'https://adampang.com', external: true },
      {
        label: 'anchormarianas.com',
        href: 'https://anchormarianas.com',
        external: true,
        note: 'design studio',
      },
    ],
  },
  {
    slug: 'musician',
    name: 'musician',
    action:
      'making music since high school. host of wonderhall, a bimonthly concert series.',
    proof: [
      {
        label: 'vibecheck.style',
        href: 'https://vibecheck.style',
        external: true,
        note: 'my music app',
      },
      {
        label: 'wonderhall.live',
        href: 'https://wonderhall.live',
        external: true,
        note: 'concert series',
      },
      {
        label: 'soundcloud',
        href: 'https://soundcloud.com/adampang',
        external: true,
      },
    ],
  },
  {
    slug: 'writer',
    name: 'writer',
    action:
      '500 words max. essays on philosophy, building, technology, longevity, life.',
    proof: [
      {
        label: 'pangaea.blog',
        href: 'https://pangaea.blog',
        external: true,
        note: 'newsletter',
      },
      {
        label: '@adamtpang on x',
        href: 'https://x.com/adamtpang',
        external: true,
      },
    ],
  },
  {
    slug: 'founder',
    name: 'founder',
    action: 'shipping internet things. apps that try to make life better.',
    proof: [
      {
        label: 'sellsniper.com',
        href: 'https://sellsniper.com',
        external: true,
        note: 'find the humans who would love your work',
      },
      {
        label: 'thedojo.fun',
        href: 'https://thedojo.fun',
        external: true,
        note: 'chat with legendary founders',
      },
      {
        label: 'optimism.fun',
        href: 'https://optimism.fun',
        external: true,
        note: "humanity's demand map",
      },
      {
        label: 'deathmoney.fyi',
        href: 'https://deathmoney.fyi',
        external: true,
        note: 'financial freedom number',
      },
      {
        label: 'wonderhall.live',
        href: 'https://wonderhall.live',
        external: true,
      },
      {
        label: 'vibecheck.style',
        href: 'https://vibecheck.style',
        external: true,
      },
    ],
  },
];
