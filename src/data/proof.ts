/**
 * Proof of work. The top of the homepage reads from this list.
 *
 * Rule for this file: every entry must be public, verifiable, and worded
 * no stronger than its public source. Verified 2026-09-14:
 *
 *   client   wording matches anchormarianas.com and anchormarianas.com/work,
 *            which already publish "Hilton Guam, paid website & gym app work".
 *            No outcome numbers are claimed because none are public.
 *   songs    each URL resolves to a real SoundCloud track page titled
 *            "Stream <title> by adampang.com". Dates come from the song's
 *            strummer.fun/songs entry.
 *   pangpod  pangpod.com is live; the description is its own meta line.
 *
 * Products live in apps.ts and render in the Creations section, not here.
 */

export type ClientProof = {
  client: string;
  work: string;
  href: string;
};

export type SongProof = {
  title: string;
  year: number;
  href: string;
};

export const clientWork: ClientProof[] = [
  {
    client: 'Hilton Guam',
    work: 'paid website and gym app work',
    href: 'https://anchormarianas.com/work',
  },
];

export const songs: SongProof[] = [
  { title: 'aria log day 247', year: 2025, href: 'https://soundcloud.com/adamtpang/aria-log-day-247' },
  { title: 'metro martian', year: 2025, href: 'https://soundcloud.com/adamtpang/metro-martian' },
  { title: 'adventure time', year: 2025, href: 'https://soundcloud.com/adamtpang/adventure-time' },
  { title: 'girl bossa', year: 2021, href: 'https://soundcloud.com/adamtpang/girlbossa' },
];

export const podcast = {
  name: 'PangPod',
  line: 'Long conversations about making things, figuring life out, and becoming friends along the way.',
  href: 'https://pangpod.com',
};
