import { buildTokensCss } from '@/design/tokens';

/**
 * GET /design/tokens.css
 *
 * Design tokens as CSS custom properties, ready to drop into any project.
 * Same generator as /design/tokens.json and the <head> block.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildTokensCss(), {
    headers: {
      'content-type': 'text/css; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
