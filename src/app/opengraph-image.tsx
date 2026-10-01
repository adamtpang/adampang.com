import { ImageResponse } from 'next/og';
import tokens from '@/design/tokens.json';

// Image generation cannot read CSS variables, so token values are read directly.
const { bg } = tokens.color.surface;
const { fg } = tokens.color.content;

export const alt = 'Adam Pang';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 96,
          background: bg.light,
          color: fg.light,
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        Adam Pang
      </div>
    ),
    size
  );
}
