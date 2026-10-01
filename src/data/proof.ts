/**
 * Proof of work. The top of the homepage reads from this list.
 *
 * Rules, from Adam's note "Being someone I would hire" (2026-10-01):
 * modest and accurate, nothing dressed up, say plainly what is early.
 * Each sentence is his own claim from that note, or checked on the date
 * shown. No numbers or outcomes beyond what he wrote.
 *
 *   hilton guam     same wording anchormarianas.com/work publishes, checked
 *                   2026-09-14.
 *   quantus         his claim: paid for a month, built on their site, made
 *                   mining easier. No public link confirmed yet, so none shown.
 *   helium-harness  public repo, 200 on 2026-10-01. Usage claim is his.
 *   pangpod         pangpod.com live with one public episode, checked 2026-09-14.
 */

export const whatIDo = 'i build small software tools and make a podcast.';

export type Proof = {
  name: string;
  line: string;
  href?: string;
};

export const proofs: Proof[] = [
  {
    name: 'Hilton Guam',
    line: 'paid website and gym app work.',
    href: 'https://anchormarianas.com/work',
  },
  {
    name: 'Quantus',
    line: 'paid me for a month. i built on their site and made mining easier.',
  },
  {
    name: 'helium-harness',
    line: 'lets an ai agent drive my browser. i use it myself, it filled in a hotel booking and a job form for me.',
    href: 'https://github.com/adamtpang/helium-harness',
  },
  {
    name: 'PangPod',
    line: 'my podcast. one episode out so far.',
    href: 'https://pangpod.com',
  },
];
