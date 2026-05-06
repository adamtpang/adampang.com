import { list } from '@vercel/blob';

/**
 * Vercel Blob integration for Sights.
 *
 * Setup (one-time, on Vercel dashboard):
 *   1. Project -> Storage -> Create -> Blob
 *   2. Copy the BLOB_READ_WRITE_TOKEN env var into the project
 *   3. Upload images via the dashboard with prefix `sights/`
 *
 * Files uploaded under the `sights/` prefix are listed here at build
 * time and rendered as tiles in the Sights bento. Captions come from
 * the filename (slug between `sights/` and the extension).
 *
 * Falls back silently to an empty array if the token is missing or
 * the API errors, so local dev + first deploy never break.
 */

export type SightImage = {
  url: string;
  pathname: string;
  caption: string;
  uploadedAt: Date;
};

export async function listSightImages(): Promise<SightImage[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: 'sights/', limit: 24 });
    return blobs
      .filter((b) => /\.(jpe?g|png|webp|avif|gif)$/i.test(b.pathname))
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        caption: captionFromPath(b.pathname),
        uploadedAt: new Date(b.uploadedAt),
      }))
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  } catch (e) {
    return [];
  }
}

function captionFromPath(p: string): string {
  const base = p.replace(/^sights\//, '').replace(/\.[^/.]+$/, '');
  return base.replace(/[-_]/g, ' ').toLowerCase();
}
