import { GIVES_MIRROR_HTML } from '@/data/gives-mirror';

/**
 * GET /gives
 *
 * Serves the adam.gives page as-is, as a Route Handler rather than a
 * page.tsx. The mirrored document is a full, self-contained <html> with
 * its own <head>, inline styles, and script; a page.tsx would nest it
 * inside this app's own <html>/<body> from layout.tsx, which is invalid.
 * A Route Handler returns raw bytes and is never wrapped by the root
 * layout, so the document ships exactly as authored.
 *
 * The mirrored HTML carries its own canonical tag pointing at
 * https://adam.gives/, so this route does not appear in sitemap.xml and
 * is not listed as one of this site's own pages in profile.ts.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(GIVES_MIRROR_HTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
