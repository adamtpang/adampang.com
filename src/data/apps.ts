/**
 * Apps shipped or in flight. The Building section reads from this list.
 *
 * status:
 *   live       fully launched, paying users or active community
 *   shipping   public, iterating fast
 *   building   not yet public, work in progress
 *   archived   no longer maintained
 */

export type AppStatus = 'live' | 'shipping' | 'building' | 'archived';

export type App = {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  status: AppStatus;
  /** Optional category tag, used for grouping or filtering later. */
  tag?: 'music' | 'social' | 'tools' | 'studio' | 'civic';
};

export const apps: App[] = [
  {
    slug: 'sellsniper',
    name: 'sellsniper.com',
    url: 'https://sellsniper.com',
    tagline: 'find the humans who would love your work',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'thedojo',
    name: 'thedojo.fun',
    url: 'https://thedojo.fun',
    tagline: 'chat with legendary founders',
    status: 'live',
    tag: 'social',
  },
  {
    slug: 'optimism',
    name: 'optimism.fun',
    url: 'https://optimism.fun',
    tagline: "humanity's demand map",
    status: 'live',
    tag: 'civic',
  },
  {
    slug: 'deathmoney',
    name: 'deathmoney.fyi',
    url: 'https://deathmoney.fyi',
    tagline: 'financial freedom number',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'wonderhall',
    name: 'wonderhall.live',
    url: 'https://wonderhall.live',
    tagline: 'bimonthly concert series',
    status: 'live',
    tag: 'music',
  },
  {
    slug: 'vibecheck',
    name: 'vibecheck.style',
    url: 'https://vibecheck.style',
    tagline: 'the music app',
    status: 'building',
    tag: 'music',
  },
  {
    slug: 'book-movie',
    name: 'book.movie',
    url: 'https://book.movie',
    tagline: 'bookshelf, social',
    status: 'shipping',
    tag: 'social',
  },
  {
    slug: 'anchormarianas',
    name: 'anchormarianas.com',
    url: 'https://anchormarianas.com',
    tagline: 'design studio',
    status: 'live',
    tag: 'studio',
  },
  {
    slug: 'technodemocracy',
    name: 'technodemocracy.app',
    url: 'https://technodemocracy.app',
    tagline: 'experiments in civic tech',
    status: 'shipping',
    tag: 'civic',
  },
];
