import { ImageResponse } from 'next/og';
import tokens from '@/design/tokens.json';
import resume from './resume.json';
import { FramedPortrait, portraitImages } from '../og-assets/assets';

const { card, line } = tokens.color.surface;
const { fg, muted } = tokens.color.content;

// Every line on this card comes from resume.json. Never the phone number, email or street address.
// The location is the one contact with no link; phone, email and web entries all have one.
const location = resume.contacts.find((c) => !c.href && !/@|\d{3}/.test(c.label));
const city = location?.label ?? 'Texas';
const [first, second] = resume.experience;
const rows = [
  first.role ? `${first.org} · ${first.role}` : first.org,
  second.role ? `${second.org} · ${second.role}` : second.org,
  resume.achievements[0].replace(/\.$/, ''),
];

export const alt = `Adam Pang's CV: software engineer, ${rows.join('; ')}.`;
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
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '0 80px 0 96px',
          background: card.light,
          color: fg.light,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginRight: 48 }}>
          <div style={{ fontSize: 26, color: muted.light }}>CV</div>
          <div style={{ fontSize: 88, lineHeight: 1.05, marginTop: 10 }}>Adam Pang</div>
          <div style={{ fontSize: 25, marginTop: 14, color: muted.light }}>{`Software engineer · ${city}`}</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 34, paddingTop: 26, borderTop: `1px solid ${line.light}` }}>
            {rows.map((row) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', fontSize: 26, marginTop: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: fg.light, marginRight: 20 }} />
                {row}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, marginTop: 34, color: muted.light }}>adampang.com/cv</div>
        </div>
        <FramedPortrait frame={frame} photo={photo} width={246} />
      </div>
    ),
    size,
  );
}
