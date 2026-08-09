/**
 * The timeline. Single source for /about, /api/profile.json, and /llms.txt.
 *
 * Shape borrowed from a bio page that does this well: each beat is
 * year / what / role / consequence rather than a year plus a run-on
 * sentence. Splitting the parts is what lets the page typeset them at
 * different weights and sizes instead of rendering one grey block.
 *
 * These were previously stored twice, as prose in profile.ts and again
 * inline in about/page.tsx. Same drift risk as everything else, so they
 * now live here and both read from it.
 *
 * Every field is a restructuring of what the site already claimed. No new
 * biographical facts were added. `note` is optional and several are thin,
 * because the source line was thin.
 */

export type Milestone = {
  /** Display string, so ranges like "2023-2025" work. */
  year: string;
  /** The what. A noun, not a sentence. Set at display size. */
  title: string;
  /** The role or status held. One short phrase. */
  role: string;
  /** One line of consequence. Optional. */
  note?: string;
};

export const milestones: Milestone[] = [
  {
    year: '2002',
    title: 'Guam',
    role: 'born',
  },
  {
    year: '2020',
    title: 'Music',
    role: 'started writing seriously',
    note: 'Finished high school the same year.',
  },
  {
    year: '2022',
    title: 'App Academy',
    role: 'software engineer',
    note: 'Graduated, then took the first engineering job.',
  },
  {
    year: '2024',
    title: 'Network School',
    role: 'there on day one',
    note: 'Present for the first two days of the launch.',
  },
  {
    year: '2025',
    title: 'Network School',
    role: 'longtermer #2',
    note: 'Moved in full-time and started shipping in public.',
  },
  {
    year: '2025',
    title: 'Eign',
    role: 'engineer trial, one month',
    note: 'Built internal tooling including lightmark.app and tried B2B sales on LinkedIn Sales Navigator. Quit in December, it wasn’t paying.',
  },
  {
    year: '2026',
    title: 'Pangaea',
    role: 'writing in public',
    note: 'Also started strummer.fun and rebuilt this site.',
  },
  {
    year: '2026',
    title: 'Quantus',
    role: 'ambassador, since july',
    note: 'Wallet activations, security audits toward mainnet, and raising investment through his own network.',
  },
];

/** Flattened back to prose for profile.json and llms.txt consumers. */
export const milestonesAsProse = milestones.map((m) => ({
  year: Number(m.year.slice(0, 4)),
  event: [`${m.title} . ${m.role}.`, m.note].filter(Boolean).join(' '),
}));
