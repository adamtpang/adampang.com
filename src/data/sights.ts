/**
 * Sights. The visual spectrum.
 *
 * Each tile is either a real image (drop a JPG into /public/sights/<slug>.jpg
 * and set image: '/sights/<slug>.jpg') or a gradient placeholder until then.
 *
 * Click a tile -> opens the source (Instagram post, Pinterest pin/board,
 * camera-roll photo).
 */

export type Sight = {
  slug: string;
  caption: string;
  href: string;
  image?: string;
};

export const sights: Sight[] = [
  {
    slug: 'langkawi',
    caption: 'langkawi mornings',
    href: 'https://instagram.com/adamtpang',
  },
  {
    slug: 'guam',
    caption: 'guam roots',
    href: 'https://instagram.com/adamtpang',
  },
  {
    slug: 'mood-2025',
    caption: '2025 mood',
    href: 'https://pinterest.com/adamtpang/2025',
  },
  {
    slug: 'studio',
    caption: 'studio days',
    href: 'https://instagram.com/adamtpang',
  },
];

/** Year-derived gradient for placeholder tiles. Same logic as Sounds. */
export function gradientForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash % 60) + 5; // keep in warm spectrum 5..65 (red-orange-amber)
  return `linear-gradient(135deg, hsl(${hue} 75% 60%) 0%, hsl(${(hue + 30) % 60 + 10} 70% 50%) 100%)`;
}
