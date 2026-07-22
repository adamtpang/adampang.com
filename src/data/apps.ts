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
    tagline: 'ai studio. operation 24 storefront',
    status: 'shipping',
    tag: 'studio',
  },
  {
    slug: 'company-university',
    name: 'company.university',
    url: 'https://company.university',
    tagline: 'top companies as campuses. operation 24 storefront',
    status: 'shipping',
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
    tagline: 'the ai sales agent. operation 24 storefront',
    status: 'shipping',
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
    tagline: 'financial freedom number. operation 24 storefront',
    status: 'shipping',
    tag: 'tools',
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
