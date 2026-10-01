import type { MetadataRoute } from 'next';

const SITE_URL = 'https://adampang.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-01');
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'yearly', priority: 1 },
  ];
}
