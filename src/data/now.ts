/**
 * What I'm working on right now. Edit this list when focus shifts.
 *
 * This is the ephemeral, alive list. Catalog of all shipped apps lives
 * in apps.ts. This is just the active drumbeat.
 */

export type NowItem = {
  title: string;
  detail: string;
  href?: string;
  external?: boolean;
  /** Optional emphasis tag. */
  tag?: 'claude' | 'music' | 'writing' | 'building' | 'thinking';
};

export const workingOn: NowItem[] = [
  {
    title: 'vibecheck.style v1',
    detail: 'the music app, polishing for launch',
    href: 'https://vibecheck.style',
    external: true,
    tag: 'music',
  },
  {
    title: 'pangaea.blog',
    detail: 'weekly essays, 500 words max',
    href: 'https://pangaea.blog',
    external: true,
    tag: 'writing',
  },
  {
    title: 'thedojo.fun characters',
    detail: 'chat with legendary founders',
    href: 'https://thedojo.fun',
    external: true,
    tag: 'building',
  },
  {
    title: 'wonderhall',
    detail: 'next concert in the series',
    href: 'https://wonderhall.live',
    external: true,
    tag: 'music',
  },
  {
    title: 'claude code projects',
    detail: 'shipping micro-tools, this site, internal stuff. claude as a teammate.',
    tag: 'claude',
  },
  {
    title: 'this site',
    detail: 'iterating toward 10/10',
    href: 'https://github.com/adamtpang/adampang.com',
    external: true,
    tag: 'building',
  },
];
