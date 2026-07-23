import { profile } from '@/data/profile';

/**
 * GET /api/profile.json
 *
 * The canonical machine-readable profile. Prerendered at build time, so it
 * is a static file on the CDN with no server in the path.
 *
 * CORS is open because the whole point is that an agent or another site can
 * fetch it. The document contains only what is already public on the site.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(profile, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
