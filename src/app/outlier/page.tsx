import type { Metadata } from 'next';
import Link from 'next/link';
import s from './outlier.module.css';

export const metadata: Metadata = {
  title: 'Outlier',
  description: 'Things Adam Pang has done that are unusual, each with a number and a way to check it.',
  alternates: { canonical: '/outlier' },
};

type Item = {
  claim: string;
  detail: string;
  links?: { label: string; href: string }[];
};

// Every line here must be true today. "checkable" items carry a public link a stranger can open.
const checkable: Item[] = [
  {
    claim: 'Won the Grok Bot Hackathon, solo',
    detail: 'Austin, October 19, 2026. About 100 people. I built Garage Sale in 2.5 hours.',
    links: [
      { label: 'Live', href: 'https://grokbothackathon.vercel.app' },
      { label: 'Code', href: 'https://github.com/adamtpang/grokbothackathon' },
    ],
  },
  {
    claim: '7,557 GitHub contributions in 12 months',
    detail: 'Counted November 14, 2026. 978 pull requests across 161 repositories.',
    links: [{ label: 'Profile', href: 'https://github.com/adamtpang' }],
  },
  {
    claim: 'Guest on Natural Genius, episode 34',
    detail: 'An hour with Sam Bell on Network School and choosing action before certainty. April 23, 2026.',
    links: [{ label: 'Watch', href: 'https://www.youtube.com/watch?v=obwbhba3Y_g' }],
  },
];

// True as far as I know, but with no public link yet. Kept separate on purpose.
const onMyWord: Item[] = [
  { claim: 'Hearthstone: top 1,000 Legend', detail: 'Americas server, 2026.' },
  { claim: 'TETR.IO: formerly ranked first in Guam', detail: '' },
  { claim: 'WHOOP: two straight weeks of 100% sleep', detail: '' },
  { claim: 'Cut a 2 hour Excel job to 2 minutes', detail: 'A Python script at Guam Power Authority, summer 2024, used by the other interns.' },
];

function List({ items }: { items: Item[] }) {
  return (
    <ul className={s.list}>
      {items.map((it) => (
        <li key={it.claim}>
          <p className={s.claim}>{it.claim}</p>
          {it.detail && <p className={s.detail}>{it.detail}</p>}
          {it.links && (
            <p className={s.proof}>
              {it.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
              ))}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Outlier() {
  return (
    <main className={s.page}>
      <div className={s.column}>
        <Link className={s.back} href="/">Adam Pang</Link>
        <h1 className={s.title}>Outlier</h1>
        <p className={s.lede}>Things I have done that are unusual. Each has a number and, where I have one, a link you can check.</p>

        <h2 className={s.h}>You can check these</h2>
        <List items={checkable} />

        <h2 className={s.h}>On my word, for now</h2>
        <p className={s.note}>True, but I have not published proof yet.</p>
        <List items={onMyWord} />

        <p className={s.updated}>Updated November 14, 2026</p>
      </div>
    </main>
  );
}
