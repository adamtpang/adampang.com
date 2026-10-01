import { ImageResponse } from 'next/og';

/**
 * OpenGraph image. Auto-generated for every share.
 *
 * Update the visual here and every link preview updates with the next
 * deploy. No PNG to maintain.
 *
 * Deliberately NOT `runtime = 'edge'`. The image takes no dynamic input,
 * so edge only bought on-demand rendering and cost static generation
 * ("Using edge runtime on a page currently disables static generation").
 * Prerendered, it is a plain PNG on the CDN.
 */

export const alt = 'Adam Pang. I build small software tools and make a podcast.';
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
          background: '#fafafa',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Blue interaction accent. */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.55) 0%, rgba(37, 99, 235, 0) 70%)',
          }}
        />

        {/* Top bar: sigil + title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            color: '#1a1a1a',
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
              background: '#2563eb',
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
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'baseline',
              gap: '24px',
            }}
          >
            <span>Adam</span>
            <span style={{ color: '#2563eb' }}>Pang</span>
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#1a1a1a',
              opacity: 0.75,
              maxWidth: '900px',
              lineHeight: 1.4,
              fontFamily: 'sans-serif',
            }}
          >
            i build small software tools and make a podcast.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
