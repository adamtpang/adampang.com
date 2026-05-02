import { ImageResponse } from 'next/og';

/**
 * OpenGraph image. Auto-generated for every share. Renders at edge.
 *
 * Update the visual here and every link preview updates with the next
 * deploy. No PNG to maintain.
 */

export const runtime = 'edge';

export const alt = 'Adam Pang. Living at Network School. Building, writing, making music.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#FAF8F4',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Sunrise glow accent. */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255, 92, 57, 0.55) 0%, rgba(255, 92, 57, 0) 70%)',
          }}
        />

        {/* Top bar: sigil + title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#0E0E0C',
            fontSize: '22px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            opacity: 0.7,
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#FF5C39',
            }}
          />
          <span>adampang.com . internet hub</span>
        </div>

        {/* Center: name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '180px',
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              color: '#0E0E0C',
              display: 'flex',
              alignItems: 'baseline',
              gap: '24px',
            }}
          >
            <span>Adam</span>
            <span style={{ color: '#FF5C39' }}>Pang</span>
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#0E0E0C',
              opacity: 0.75,
              maxWidth: '900px',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
            }}
          >
            building, writing, making music. living at network school.
          </div>
        </div>

        {/* Bottom: 6 identities */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            color: '#0E0E0C',
            fontSize: '24px',
            opacity: 0.55,
            fontFamily: 'sans-serif',
          }}
        >
          <span>optimist</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>curious</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>creative</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>musician</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>writer</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>founder</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
