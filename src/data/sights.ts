/**
 * Sights. The visual spectrum.
 *
 * Each tile is either a real image (drop a JPG into /public/sights/<slug>.jpg
 * and set image: '/sights/<slug>.jpg') or a gradient placeholder until then.
 *
 * Click a tile -> opens the source (Instagram post, Pinterest pin/board,
 * etc.).
 */

export type Sight = {
  slug: string;
  caption: string;
  href: string;
  image?: string;
};

export const sights: Sight[] = [
  { slug: 'mood-1', caption: 'mornings', href: 'https://instagram.com/adamtpang' },
  { slug: 'mood-2', caption: 'studio', href: 'https://instagram.com/adamtpang' },
  { slug: 'mood-3', caption: 'people', href: 'https://instagram.com/adamtpang' },
  { slug: 'mood-4', caption: 'mood', href: 'https://pinterest.com/adamtpang' },
];

/** Slug-derived gradient. Same warm-spectrum logic as Sounds. */
export function gradientForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash % 60) + 5;
  return `linear-gradient(135deg, hsl(${hue} 75% 60%) 0%, hsl(${(hue + 30) % 60 + 10} 70% 50%) 100%)`;
}
