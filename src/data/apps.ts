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
 *
 * Deliberately capped at 8. This list grew to 26 across several sessions
 * and Building.tsx renders it uncapped, which broke the site's own
 * founding rule: stay compressed enough to fit on a laptop screen without
 * scrolling ("greatness is hard to vary"). Fourteen of the 26 were tagged
 * 'tools', several doing the same "rank/prioritize your life" thing
 * (8020.best, archimedes.life, moneymeta.fun, themain.quest) — volume
 * without differentiation reads as noise, not range. Each entry below is
 * a flagship: one clear idea per facet, nothing redundant with another
 * entry or with another section of this site (pangaea.blog, for example,
 * is already the writing nav link, so it doesn't need a tile here too).
 *
 * The other 18 domains are still real and still live; they're just not
 * claimed on this page. To bring one back, describe it well enough that
 * it earns a distinct spot rather than padding the count.
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
    slug: 'beware',
    name: 'beware.dog',
    url: 'https://beware-dog.vercel.app',
    tagline: '24/7 ai security for small businesses',
    status: 'live',
    tag: 'tools',
  },
];
