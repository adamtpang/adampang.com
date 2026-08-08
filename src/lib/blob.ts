import { list } from '@vercel/blob';
import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Sights image source. Two layers, tried in order:
 *
 *   1. LOCAL  — any image in /public/sights/ (committed to the repo).
 *      Zero setup. Drop a JPG in that folder, it renders on next
 *      deploy. This is the default path.
 *
 *   2. BLOB   — Vercel Blob store, prefix `sights/`. Used only if the
 *      local folder is empty AND a BLOB_READ_WRITE_TOKEN is present.
 *      Lets you add photos from the Vercel dashboard without a commit.
 *
 * If both are empty the component falls back to gradient placeholders.
 * Captions come from the filename (hyphens/underscores -> spaces).
 * Order tiles by prefixing filenames with 01-, 02-, etc.
 */

export type SightImage = {
  url: string;
  pathname: string;
  caption: string;
  uploadedAt: number;
};

const IMG_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

export async function listSightImages(): Promise<SightImage[]> {
  const local = await listLocalSights();
  if (local.length > 0) return local;
  return listBlobSights();
}

/** Read /public/sights/ from the filesystem at build/request time. */
async function listLocalSights(): Promise<SightImage[]> {
  try {
    const dir = path.join(process.cwd(), 'public', 'sights');
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && IMG_RE.test(e.name))
      .map((e) => e.name)
      .sort(); // 01-*, 02-* ordering by filename
    return files.map((name, i) => ({
      url: `/sights/${name}`,
      pathname: `sights/${name}`,
      caption: captionFromPath(name),
      uploadedAt: i,
    }));
  } catch {
    return []; // dir doesn't exist yet
  }
}

/** Read the Vercel Blob store (only when a token is configured). */
async function listBlobSights(): Promise<SightImage[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: 'sights/', limit: 24 });
    return blobs
      .filter((b) => IMG_RE.test(b.pathname))
      .map((b) => ({
        url: b.url,
        pathname: b.pathname,
        caption: captionFromPath(b.pathname),
        uploadedAt: new Date(b.uploadedAt).getTime(),
      }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt);
  } catch {
    return [];
  }
}

function captionFromPath(p: string): string {
  const base = p
    .replace(/^sights\//, '')
    .replace(/\.[^/.]+$/, '')
    .replace(/^\d+[-_]/, ''); // strip leading order prefix like "01-"
  return base.replace(/[-_]/g, ' ').toLowerCase();
}
