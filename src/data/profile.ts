/**
 * The canonical machine-readable profile.
 *
 * This is the single source of truth for who Adam is. Everything derived
 * from it is generated, never retyped:
 *
 *   /api/profile.json   serves this document verbatim
 *   <head> JSON-LD      schema.org Person + WebSite, built from it
 *   /llms.txt           the agent-facing markdown brief, built from it
 *
 * Social profiles are imported from outlinks.ts rather than duplicated here.
 *
 * Every fact below is sourced from the repo or the live site. Nothing is
 * inferred. See OPEN-QUESTIONS in the repo root for the gaps.
 */

import { outlinks } from './outlinks';
import { milestonesAsProse } from './milestones';

export const SITE_URL = 'https://adampang.com';

/**
 * Bump when the facts change, not when the site rebuilds. Agents use this
 * to decide whether a cached copy is stale.
 */
export const LAST_UPDATED = '2026-10-01';

/** Places Adam exists online. Drives schema.org sameAs. */
const SAMEAS_CATEGORIES = ['social', 'video', 'sound', 'words', 'code'] as const;

export const sameAs = outlinks
  .filter((l) => (SAMEAS_CATEGORIES as readonly string[]).includes(l.category))
  .filter((l) => l.href.startsWith('http'))
  .map((l) => l.href);

export const profile = {
  lastUpdated: LAST_UPDATED,
  schemaVersion: '1.0',

  name: 'Adam Pang',
  url: SITE_URL,

  headline: 'Builds small software tools and makes a podcast.',
  summary:
    'Adam Pang builds small software tools and makes a podcast, PangPod. ' +
    'From Guam. He runs Anchor Marianas and writes at pangaea.blog.',

  roles: ['builder', 'writer', 'musician'],

  birthPlace: { name: 'Guam', type: 'Place' },

  contact: {
    email: 'adamtpang@gmail.com',
    booking: 'https://cal.com/adamtpang',
    preferred: 'email',
  },

  worksFor: {
    name: 'Anchor Marianas',
    url: 'https://anchormarianas.com',
    role: 'founder',
    description: 'Websites and apps for businesses.',
  },

  affiliation: {
    name: 'Network School',
    url: 'https://ns.com',
    role: 'member',
  },

  writing: {
    name: 'Pangaea',
    url: 'https://pangaea.blog',
    description: 'Essays.',
  },

  knowsAbout: [
    'software engineering',
    'building in public',
    'indie hacking',
    'philosophy',
    'music production',
    'network states',
    'writing',
  ],

  sameAs,

  /** Chronological. Generated from src/data/milestones.ts, which /about
   *  also renders, so the timeline is stated in exactly one place. */
  milestones: milestonesAsProse,

  /** Canonical routes on this site, for agents mapping the surface. */
  pages: [
    { path: '/', title: 'home', description: 'What he does, a couple of real proofs, a photo.' },
    { path: '/about', title: 'about', description: 'Who he is, chronologically. Milestones and receipts.' },
    { path: '/contact', title: 'contact', description: 'Real ways to contact Adam and what to expect next.' },
    { path: '/privacy', title: 'privacy', description: 'How this site handles analytics, storage, embeds, links, and contact.' },
    { path: '/now', title: 'now', description: 'What he is doing right now, in the sivers.org/now tradition.' },
  ],

  machineReadable: [
    { path: '/llms.txt', format: 'text/markdown', description: 'Agent-facing brief.' },
    { path: '/api/profile.json', format: 'application/json', description: 'This document. The canonical profile.' },
    { path: '/design/tokens.json', format: 'application/json', description: 'Design tokens.' },
    { path: '/design/tokens.css', format: 'text/css', description: 'Design tokens as CSS custom properties.' },
    { path: '/sitemap.xml', format: 'application/xml', description: 'All routes.' },
  ],

  license:
    'Facts in this document may be quoted freely with attribution to https://adampang.com.',
} as const;

export type Profile = typeof profile;
