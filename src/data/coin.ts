/**
 * The coin. Adam's model of his own work.
 *
 * Two faces, one object. Art and science are not two careers, they are the
 * same thing seen from two sides, which is the shape of Deutsch's argument
 * in The Fabric of Reality: separate-looking strands turn out to be one
 * fabric. People are the edge, the part that joins both faces and the only
 * part visible while it turns.
 *
 * Rendered by components/Coin.tsx and published in /api/profile.json so an
 * agent reading the site gets the self-model, not just the resume.
 */

export type CoinFace = {
  /** Side label. Mono eyebrow. */
  side: string;
  /** The one word. Display size. */
  title: string;
  /** What lives on this side, in his own taxonomy. */
  disciplines: string[];
  /** Real work that proves it. */
  practices: { label: string; href: string }[];
  /** Which section hue rims this face. Decorative only. */
  hue: 'creativity' | 'accent';
};

export const coin: {
  faces: [CoinFace, CoinFace];
  edge: { label: string; line: string };
  thesis: { claim: string; body: string; source: string };
} = {
  faces: [
    {
      side: 'side a',
      title: 'art',
      disciplines: ['music'],
      practices: [
        { label: 'soundcloud', href: 'https://soundcloud.com/adamtpang' },
        { label: 'wonderhall', href: 'https://wonderhall.live' },
        { label: 'strummer', href: 'https://strummer.fun' },
      ],
      hue: 'creativity',
    },
    {
      side: 'side b',
      title: 'science',
      disciplines: ['philosophy', 'business', 'tech'],
      practices: [
        { label: 'pangaea', href: 'https://pangaea.blog' },
        { label: 'anchor marianas', href: 'https://anchormarianas.com' },
        { label: 'github', href: 'https://github.com/adamtpang' },
      ],
      hue: 'accent',
    },
  ],

  edge: {
    label: 'people',
    line: 'under both. the edge that joins the faces, and the only part you see while it turns.',
  },

  thesis: {
    claim: 'we are special.',
    body:
      'not because of where we are. the earth is not the centre of anything. ' +
      'special because of what people can do: explain things, and there is no ' +
      'limit to what can be explained. that is why one person can hold a song ' +
      'and a business and a proof at once. they are the same activity.',
    source: 'david deutsch, the fabric of reality and the beginning of infinity',
  },
};
