import { ImageResponse } from 'next/og';
import tokens from '@/design/tokens.json';
import { FramedPortrait, portraitImages } from './og-assets/assets';

// Image generation cannot read CSS variables, so token values are read directly.
const { card } = tokens.color.surface;
const { fg, muted } = tokens.color.content;

export const alt = "Adam Pang's portrait in a gold frame beside his name, as it appears on adampang.com.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const { frame, photo } = await portraitImages();
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '0 96px 0 112px',
          background: card.light,
          color: fg.light,
        }}
      >
        <FramedPortrait frame={frame} photo={photo} width={378} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 88 }}>
          <div style={{ fontSize: 104, lineHeight: 1.05 }}>Adam Pang</div>
          <div style={{ fontSize: 34, marginTop: 28, color: muted.light }}>adampang.com</div>
        </div>
      </div>
    ),
    size,
  );
}
