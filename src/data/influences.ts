/**
 * Sites studied while building this one, and exactly what was taken from
 * each. In the spirit of brianlovin.com/sites and Sivers' own transparency
 * about influence: credit the source, and be precise about the lesson
 * rather than vague about "inspiration."
 *
 * Rule for this list: only sites with a real, findable artifact in this
 * repo qualify. A site that shaped tone or research direction but left no
 * traceable line of code does not belong here.
 */
export type Influence = {
  site: string;
  href: string;
  by?: string;
  /** What was actually taken. Specific, not vibes. */
  lesson: string;
  /** Where it landed. Repo-relative. */
  landedIn: string[];
};

export const influences: Influence[] = [
  {
    site: 'sive.rs',
    href: 'https://sive.rs',
    by: 'Derek Sivers',
    lesson:
      'measure set in ch, not px. line length that tracks the font instead of a fixed pixel width. his whole site is 2kb of css and one script tag, the standing argument against adding weight here.',
    landedIn: ['src/app/about/page.tsx (max-w-[62ch])'],
  },
  {
    site: 'brianchau.ai/bio',
    href: 'https://brianchau.ai/bio',
    lesson:
      'a timeline as a path you travel, not a list you skim. scroll position mapped to a camera, not a wheel handler hijacked. also the color-quarantine move: rainbow hues live only in decoration (a gradient, a rim), never in text.',
    landedIn: [
      'src/components/JourneyTimeline.tsx',
      'src/lib/journey.ts',
      'src/components/Coin.tsx',
    ],
  },
  {
    site: 'ciechanow.ski',
    href: 'https://ciechanow.ski',
    by: 'Bartosz Ciechanowski',
    lesson:
      'not a source, a confirmation. arguably the most acclaimed personal technical site on the internet is built almost entirely on scroll-linked interactive diagrams, the same mechanic already in use here. one useful detail worth naming: a fixed accent used sparingly against an otherwise near-monochrome page.',
    landedIn: ['src/components/JourneyTimeline.tsx (validated, not sourced)'],
  },
  {
    site: 'brianlovin.com',
    href: 'https://brianlovin.com',
    by: 'Brian Lovin',
    lesson:
      'a flat list of named side projects, each with one honest line describing it. also the direct source for this page: he keeps his own /sites crediting influences, so this one does too.',
    landedIn: ['src/data/influences.ts (this file)'],
  },
];
