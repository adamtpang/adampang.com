/**
 * ElementSigil. Avatar: The Last Airbender element marks.
 *
 * A small rounded-square "bead" in the element's color with a white
 * glyph, echoing the ceramic element-bead necklace. Replaces the
 * plain colored dots that headed each bento.
 *
 *   water  sounds       flow, waves, music
 *   earth  creativity   substance, building
 *   fire   sights       vision, the spark
 *   air    curiosity    mind, freedom, ideas
 *
 * Colors come from tokens.json through Tailwind. This keeps the sigils in
 * sync with the bento accents in both light and dark mode.
 */

export type Element = 'water' | 'earth' | 'fire' | 'air';

const COLOR: Record<Element, string> = {
  water: 'bg-sounds',
  earth: 'bg-creativity',
  fire: 'bg-sights',
  air: 'bg-curiosity',
};

const GLYPH: Record<Element, React.ReactNode> = {
  // wave
  water: (
    <path
      d="M2.5 8 Q 5 4.5 8 8 T 13.5 8"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  ),
  // grounded square
  earth: <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" fill="#fff" />,
  // flame
  fire: (
    <path
      d="M8 3 C 10.5 6 11 8.5 8 13 C 5 8.5 5.5 6 8 3 Z"
      fill="#fff"
    />
  ),
  // air swirl
  air: (
    <path
      d="M3 9 Q 8 3 13 7 Q 9.5 11 6 8.5"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  ),
};

export default function ElementSigil({
  element,
  size = 18,
  className = '',
}: {
  element: Element;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-[5px] ${COLOR[element]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.78} height={size * 0.78} viewBox="0 0 16 16">
        {GLYPH[element]}
      </svg>
    </span>
  );
}
