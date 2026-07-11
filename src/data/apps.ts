/**
 * Apps shipped or in flight. The Creativity section reads from this list.
 *
 * status (per FOUNDER.md kill rule — honest, no vanity):
 *   live       launched AND showing organic pull (strangers using it)
 *   shipping   the current bet, actively being pushed to revenue
 *   building   in active development
 *   archived   shipped, no organic growth after 8 weeks. honest, not
 *              shameful. earns its way back only with organic pull.
 *
 * FOCUS PASS 2026-07: everything not actively worked or organically
 * growing moved to archived. levels killed 66 of 70. the portfolio is
 * the record of at-bats, not a wall of live claims.
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
    slug: 'ns-field-guide',
    name: 'the ns field guide',
    url: '/ns',
    tagline: 'move to network school, from longtermer #2. $49',
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
    slug: 'anchormarianas',
    name: 'anchormarianas.com',
    url: 'https://anchormarianas.com',
    tagline: 'ai studio. client work, real invoices',
    status: 'live',
    tag: 'studio',
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
    status: 'archived',
    tag: 'social',
  },
  {
    slug: 'sellsniper',
    name: 'sellsniper.com',
    url: 'https://sellsniper.com',
    tagline: 'find the humans who would love your work',
    status: 'archived',
    tag: 'tools',
  },
  {
    slug: 'optimism',
    name: 'optimism.fun',
    url: 'https://optimism.fun',
    tagline: "humanity's demand map",
    status: 'archived',
    tag: 'civic',
  },
  {
    slug: 'deathmoney',
    name: 'deathmoney.fyi',
    url: 'https://deathmoney.fyi',
    tagline: 'financial freedom number',
    status: 'archived',
    tag: 'tools',
  },
  {
    slug: 'book-movie',
    name: 'book.movie',
    url: 'https://book.movie',
    tagline: 'bookshelf, social',
    status: 'archived',
    tag: 'social',
  },
  {
    slug: 'technodemocracy',
    name: 'technodemocracy.app',
    url: 'https://technodemocracy.app',
    tagline: 'experiments in civic tech',
    status: 'archived',
    tag: 'civic',
  },
];
