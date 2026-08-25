/**
 * Selected work. The Creations section reads from this list.
 *
 * status:
 *   live       public and usable
 *   shipping   actively being improved in public
 *   building   visible work in progress
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
 * (8020.best, archimedes.life, moneymeta.fun, themain.quest). Volume
 * without differentiation reads as noise, not range. Each entry below is
 * a flagship: one clear idea per facet, nothing redundant with another
 * entry or with another section of this site (pangaea.blog, for example,
 * is already the writing nav link, so it doesn't need a tile here too).
 *
 * The full body of work lives at thedojo.fun. To bring a project onto the
 * homepage, it must be public, usable, differentiated, and accurately
 * described. A deployed URL alone is not enough.
 */

export type AppStatus = 'live' | 'shipping' | 'building';

export type App = {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  status: AppStatus;
  /** Optional category tag, used for grouping or filtering later. */
  tag?: 'music' | 'social' | 'tools' | 'education' | 'civic';
};

export const apps: App[] = [
  {
    slug: 'wonderhall',
    name: 'wonderhall.live',
    url: 'https://wonderhall.live',
    tagline: 'a recurring live music night',
    status: 'live',
    tag: 'music',
  },
  {
    slug: 'worldcupelo',
    name: 'worldcupelo.com',
    url: 'https://worldcupelo.com',
    tagline: 'live elo ratings for national teams',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'zcash-school',
    name: 'zcash.school',
    url: 'https://zcash.school',
    tagline: 'a free course on private money',
    status: 'live',
    tag: 'education',
  },
  {
    slug: 'ness',
    name: 'ness.city',
    url: 'https://ness.city',
    tagline: 'civic tools for ambitious communities',
    status: 'live',
    tag: 'civic',
  },
  {
    slug: 'themainquest',
    name: 'themain.quest',
    url: 'https://themain.quest',
    tagline: 'one life. one move that matters now',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'pokedex',
    name: 'pokedex.life',
    url: 'https://pokedex.life',
    tagline: 'a pokedex for the people around you',
    status: 'live',
    tag: 'social',
  },
  {
    slug: 'vercel-school',
    name: 'vercel.school',
    url: 'https://vercel.school',
    tagline: 'learn vercel by shipping',
    status: 'live',
    tag: 'education',
  },
  {
    slug: 'storageclean',
    name: 'storageclean.app',
    url: 'https://storageclean.app',
    tagline: 'find and reclaim wasted disk space',
    status: 'live',
    tag: 'tools',
  },
];
