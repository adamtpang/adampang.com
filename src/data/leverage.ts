/**
 * Naval's four leverages, applied to adam.
 *   code     . software, the most permissionless leverage
 *   media    . words, music, audio, video, anything that scales attention
 *   capital  . money that buys time and other people's effort
 *   labor    . humans who choose to work with you
 *
 * Each card has a one-line claim, optional metrics, and proof links.
 * Numbers are manual today. Wiring them to live APIs (SoundCloud,
 * Substack RSS, Stripe, GitHub) is a future batch.
 *
 * To update a metric: edit the value here. The display formats automatically.
 */

export type LeverageMetric = {
  /** Short label below the number, e.g. "apps", "subscribers". */
  label: string;
  /** Number or short string. Use plain numbers when possible. */
  value: number | string;
  /** Optional source url, opens on hover/click. */
  source?: string;
  /** True if this number is approximate or rounded. Adds a tilde prefix. */
  approx?: boolean;
};

export type LeverageLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LeverageCard = {
  slug: 'code' | 'media' | 'capital' | 'labor';
  name: string;
  claim: string;
  metrics: LeverageMetric[];
  links: LeverageLink[];
};

export const leverage: LeverageCard[] = [
  {
    slug: 'code',
    name: 'code',
    claim: 'permissionless leverage. software replicates while i sleep.',
    metrics: [
      { label: 'apps live', value: 9 },
      { label: 'apps building', value: 2 },
      { label: 'open source', value: 'github', source: 'https://github.com/adamtpang' },
    ],
    links: [
      { label: 'github.com/adamtpang', href: 'https://github.com/adamtpang', external: true },
      { label: 'see all apps', href: '#building' },
    ],
  },
  {
    slug: 'media',
    name: 'media',
    claim: 'attention compounds. one essay can outlive a decade.',
    metrics: [
      { label: 'newsletter', value: 'pangaea', source: 'https://pangaea.blog' },
      { label: 'soundcloud tracks', value: 'songs', source: 'https://soundcloud.com/adampang' },
      { label: 'x', value: '@adamtpang', source: 'https://x.com/adamtpang' },
    ],
    links: [
      { label: 'pangaea.blog', href: 'https://pangaea.blog', external: true },
      { label: 'soundcloud', href: 'https://soundcloud.com/adampang', external: true },
      { label: 'x.com/adamtpang', href: 'https://x.com/adamtpang', external: true },
      { label: 'youtube', href: 'https://youtube.com/@adamtpang', external: true },
    ],
  },
  {
    slug: 'capital',
    name: 'capital',
    claim: 'bootstrapped, profitable enough to keep shipping.',
    metrics: [
      { label: 'funding', value: 'self' },
      { label: 'studio', value: 'anchor marianas', source: 'https://anchormarianas.com' },
      { label: 'residency', value: 'ns longtermer #2' },
    ],
    links: [
      { label: 'anchormarianas.com', href: 'https://anchormarianas.com', external: true },
      { label: 'come to ns', href: '/ns' },
    ],
  },
  {
    slug: 'labor',
    name: 'labor',
    claim: 'the network is the leverage. ns gave me 500+ founders.',
    metrics: [
      { label: 'home base', value: 'network school' },
      { label: 'studio crew', value: 'anchor marianas' },
      { label: 'community', value: 'thedojo.fun' },
    ],
    links: [
      { label: 'ns.com/adam/invite', href: 'https://ns.com/adam/invite', external: true },
      { label: 'thedojo.fun', href: 'https://thedojo.fun', external: true },
    ],
  },
];
