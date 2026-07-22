/**
 * Apps and storefronts. The Creativity section reads from this list.
 *
 * status:
 *   live       launched and in use
 *   shipping   actively being pushed right now
 *   building   in active development
 *
 * Only things worth showing go here. Work that is no longer active is
 * simply removed from the list rather than labelled, so the portfolio
 * reads as a body of work, not a graveyard.
 */

export type AppStatus = 'live' | 'shipping' | 'building';

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
    slug: 'anchormarianas',
    name: 'anchormarianas.com',
    url: 'https://anchormarianas.com',
    tagline: 'ai studio. apps in days, not months',
    status: 'shipping',
    tag: 'studio',
  },
  {
    slug: 'sellsniper',
    name: 'sellsniper.com',
    url: 'https://sellsniper.com',
    tagline: 'the ai sales agent',
    status: 'shipping',
    tag: 'tools',
  },
  {
    slug: 'deathmoney',
    name: 'deathmoney.fyi',
    url: 'https://deathmoney.fyi',
    tagline: 'your financial freedom number',
    status: 'shipping',
    tag: 'tools',
  },
  {
    slug: 'company-university',
    name: 'company.university',
    url: 'https://company.university',
    tagline: 'top companies as campuses',
    status: 'shipping',
    tag: 'tools',
  },
  {
    slug: 'strummer',
    name: 'strummer.fun',
    url: 'https://strummer.fun',
    tagline: 'the music suite',
    status: 'building',
    tag: 'music',
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
    slug: 'summon',
    name: 'summon.guide',
    url: 'https://summon.guide',
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
    slug: 'technodemocracy',
    name: 'technodemocracy.app',
    url: 'https://technodemocracy.app',
    tagline: 'experiments in civic tech',
    status: 'live',
    tag: 'civic',
  },
];
