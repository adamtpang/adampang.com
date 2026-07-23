import type { MetadataRoute } from 'next';
import { profile, SITE_URL, LAST_UPDATED } from '@/data/profile';

/**
 * sitemap.xml, generated from profile.pages so a new route is listed the
 * moment it is added there. The hand-written version had drifted to 2 of
 * the 6 real routes.
 */
const PRIORITY: Record<string, number> = {
  '/': 1,
  '/about': 0.9,
  '/now': 0.8,
  '/ns': 0.7,
  '/design': 0.6,
  '/support': 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED);

  return profile.pages.map((p) => ({
    url: p.path === '/' ? SITE_URL : `${SITE_URL}${p.path}`,
    lastModified,
    // /now is the page that changes most; the rest are stable.
    changeFrequency: p.path === '/now' ? 'monthly' : 'yearly',
    priority: PRIORITY[p.path] ?? 0.5,
  }));
}
