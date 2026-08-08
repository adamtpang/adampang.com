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
  {
    slug: 'darktalent',
    name: 'darktalent.tech',
    url: 'https://darktalent.tech',
    tagline: 'scout undervalued talent, rate the legends',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'beware',
    name: 'beware.dog',
    url: 'https://beware-dog.vercel.app',
    tagline: '24/7 ai security for small businesses',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: '8020',
    name: '8020.best',
    url: 'https://8020.best',
    tagline: 'sorts tasks into priority tiers',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'archimedes',
    name: 'archimedes.life',
    url: 'https://archimedeslife.vercel.app',
    tagline: 'the leverage diagnosis',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'themainquest',
    name: 'themain.quest',
    url: 'https://themainquest-adamtpangs-projects.vercel.app',
    tagline: 'your one life, gamified',
    status: 'live',
  },
  {
    slug: 'moneymeta',
    name: 'moneymeta.fun',
    url: 'https://moneymeta.fun',
    tagline: 'every way to make money, ranked s to d',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'eyeland',
    name: 'eyeland.cards',
    url: 'https://eyeland.cards',
    tagline: 'wizard101 meets hearthstone meets pokemon',
    status: 'live',
  },
  {
    slug: 'youchop',
    name: 'youchop.app',
    url: 'https://youchop.app',
    tagline: 'real youtube chapters, generated automatically',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'ztripe',
    name: 'ztripe',
    url: 'https://ztripe.vercel.app',
    tagline: 'the wise of zcash',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'gives',
    name: 'adam.gives',
    url: 'https://adam.gives',
    tagline: 'adam as a service, three offers upfront',
    status: 'live',
    tag: 'studio',
  },
  {
    slug: 'vercel-school',
    name: 'vercel.school',
    url: 'https://vercel.school',
    tagline: 'learn vercel by shipping',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'conjecture',
    name: 'conjecture.school',
    url: 'https://conjecture.school',
    tagline: 'a fellowship for the beginning of infinity',
    status: 'live',
    tag: 'social',
  },
  {
    slug: 'ness',
    name: 'ness.city',
    url: 'https://ness.city',
    tagline: 'the civic layer for network school',
    status: 'live',
    tag: 'civic',
  },
  {
    slug: 'redmart',
    name: 'redmart.xyz',
    url: 'https://redmart.xyz',
    tagline: 'an ai broker matching supply and demand',
    status: 'building',
    tag: 'tools',
  },
  {
    slug: 'beeper',
    name: 'beeper.chat',
    url: 'https://beeper.chat',
    tagline: 'clears your beeper inbox to zero',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: '300words',
    name: '300words.app',
    url: 'https://300words.app',
    tagline: '300 words a day, keep the streak',
    status: 'live',
    tag: 'tools',
  },
  {
    slug: 'pangaea',
    name: 'pangaea.blog',
    url: 'https://pangaea.blog',
    tagline: 'one app, one essay, one song, every week',
    status: 'live',
  },
];
