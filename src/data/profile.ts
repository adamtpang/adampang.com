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
 * Projects and social profiles are imported from their own source files
 * (apps.ts, outlinks.ts) rather than duplicated here, so adding a project
 * in one place updates the homepage, the JSON-LD, and llms.txt together.
 *
 * Every fact below is sourced from the repo or the live site. Nothing is
 * inferred. See OPEN-QUESTIONS in the repo root for the gaps.
 */

import { apps } from './apps';
import { outlinks } from './outlinks';
import { reading } from './curiosities';
import { milestonesAsProse } from './milestones';
import { coin } from './coin';

export const SITE_URL = 'https://adampang.com';

/**
 * Bump when the facts change, not when the site rebuilds. Agents use this
 * to decide whether a cached copy is stale.
 */
export const LAST_UPDATED = '2026-08-25';

/** Places Adam exists online. Drives schema.org sameAs. */
const SAMEAS_CATEGORIES = ['social', 'video', 'sound', 'words', 'code'] as const;

export const sameAs = outlinks
  .filter((l) => (SAMEAS_CATEGORIES as readonly string[]).includes(l.category))
  .filter((l) => l.href.startsWith('http'))
  .map((l) => l.href);

export type ProfileProject = {
  name: string;
  url: string;
  tagline: string;
  status: string;
};

export const profile = {
  lastUpdated: LAST_UPDATED,
  schemaVersion: '1.0',

  name: 'Adam Pang',
  alternateName: 'Adam Tomas Guzman Pangelinan',
  url: SITE_URL,

  headline: 'Builder, writer, musician. Shipping small bets in public.',
  summary:
    'Adam Pang is a builder, writer, and musician born on Guam, living at ' +
    'Network School in Langkawi, Malaysia as longtermer #2. He runs Anchor ' +
    'Marianas, an AI studio, ships software solo and in public, writes essays ' +
    'at pangaea.blog, and makes music. adampang.com is the hub that links his ' +
    'whole body of work from one twelve-character address.',

  roles: ['builder', 'writer', 'musician', 'founder'],

  /**
   * Derived age is deliberately absent. birthYear is the durable fact;
   * an age string goes stale silently every birthday.
   */
  birthYear: 2002,
  birthPlace: { name: 'Guam', type: 'Place' },

  location: {
    current: {
      name: 'Network School',
      locality: 'Langkawi',
      country: 'Malaysia',
      url: 'https://ns.com',
      since: '2025-03',
      note: 'longtermer #2',
    },
    lived: ['Guam', 'United States', 'Langkawi, Malaysia'],
  },

  contact: {
    email: 'adamtpang@gmail.com',
    booking: 'https://cal.com/adamtpang',
    preferred: 'email',
  },

  worksFor: {
    name: 'Anchor Marianas',
    url: 'https://anchormarianas.com',
    role: 'founder',
    description: 'AI studio. Apps in days, not months.',
  },

  affiliation: {
    name: 'Network School',
    url: 'https://ns.com',
    role: 'longtermer #2',
  },

  /** Generated from apps.ts. Adding a project there updates every consumer. */
  projects: apps.map(
    (a): ProfileProject => ({
      name: a.name,
      url: a.url,
      tagline: a.tagline,
      status: a.status,
    })
  ),

  writing: {
    name: 'Pangaea',
    url: 'https://pangaea.blog',
    description: 'Essays. The long version of who he is.',
  },

  /**
   * How he models his own work. Two faces of one object, not two careers.
   * Rendered as the coin on /about; published here so an agent reading the
   * site gets the self-model rather than inferring one from the project list.
   */
  model: {
    shape: 'coin',
    summary:
      'Art and science are two faces of one object, with people as the edge that joins them.',
    faces: coin.faces.map((f) => ({
      side: f.title,
      disciplines: [...f.disciplines],
      work: f.practices.map((p) => ({ name: p.label, url: p.href })),
    })),
    edge: coin.edge.label,
    thesis: `${coin.thesis.claim} ${coin.thesis.body}`,
    influencedBy: coin.thesis.source,
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

  reading: reading.map((b) => ({ title: b.title, author: b.author })),

  sameAs,

  /** Chronological. Generated from src/data/milestones.ts, which /about
   *  also renders, so the timeline is stated in exactly one place. */
  milestones: milestonesAsProse,

  /** Canonical routes on this site, for agents mapping the surface. */
  pages: [
    { path: '/', title: 'home', description: 'The four-element bento: sights, sounds, curiosity, creations.' },
    { path: '/about', title: 'about', description: 'Who he is, chronologically. Milestones and receipts.' },
    { path: '/contact', title: 'contact', description: 'Real ways to contact Adam and what to expect next.' },
    { path: '/privacy', title: 'privacy', description: 'How this site handles analytics, storage, embeds, links, and contact.' },
    { path: '/now', title: 'now', description: 'What he is doing right now, in the sivers.org/now tradition.' },
    { path: '/ns', title: 'network school', description: 'Living at the internet frontier as longtermer #2.' },
    { path: '/support', title: 'support', description: 'Tip jar, crypto, referral wall.' },
    { path: '/design', title: 'design system', description: 'Living token reference. Machine-readable exports.' },
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
