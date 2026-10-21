import { ImageResponse } from 'next/og';
import tokens from '@/design/tokens.json';

const { card } = tokens.color.surface;
const { fg, muted } = tokens.color.content;

export const alt = 'Adam Pang, CV';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '80px 88px',
          background: card.light,
          color: fg.light,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 3, color: muted.light }}>CV</div>
        <div style={{ fontSize: 92, marginTop: 16, lineHeight: 1 }}>Adam Pang</div>
        <div style={{ fontSize: 34, marginTop: 28, maxWidth: 920, lineHeight: 1.35, color: muted.light }}>
          Forward Deployed Engineer. Ships agent systems end to end.
        </div>
      </div>
    ),
    size,
  );
}
