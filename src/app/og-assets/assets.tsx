import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/*
 * Shared pieces for the 1200x630 link-preview images (/ and /cv).
 * The frame and photo are smaller copies of public/gold-frame.png and
 * public/profile.png, made for these cards so the PNGs stay small.
 * Type uses the image renderer's built-in sans (one regular weight), the
 * closest free match to the site's Helvetica that ships with next/og.
 */

const dir = join(process.cwd(), 'src/app/og-assets');

async function dataUri(file: string, mime: string) {
  const bytes = await readFile(join(dir, file));
  return `data:${mime};base64,${bytes.toString('base64')}`;
}

export async function portraitImages() {
  const [frame, photo] = await Promise.all([
    dataUri('gold-frame.png', 'image/png'),
    dataUri('profile.jpg', 'image/jpeg'),
  ]);
  return { frame, photo };
}

/* eslint-disable @next/next/no-img-element -- next/og renders plain <img>; next/image does not work inside ImageResponse. */

/** The gold-framed portrait as it appears on the homepage, at a given frame width (3:4). */
export function FramedPortrait({ frame, photo, width }: { frame: string; photo: string; width: number }) {
  const height = Math.round((width * 4) / 3);
  return (
    <div style={{ display: 'flex', position: 'relative', width, height }}>
      <img
        src={photo}
        alt=""
        width={Math.round(width * 0.64)}
        height={Math.round(height * 0.665)}
        style={{ position: 'absolute', left: Math.round(width * 0.18), top: Math.round(height * 0.16), objectFit: 'cover' }}
      />
      <img src={frame} alt="" width={width} height={height} style={{ position: 'absolute', left: 0, top: 0 }} />
    </div>
  );
}
