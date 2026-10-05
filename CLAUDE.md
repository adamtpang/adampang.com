# adampang.com

## Current direction, October 5, 2026

Adam approved one white page: a gilded portrait, a modest name, music, selected outlinks, and WhatsApp/call/email. The introduction was removed at his request. No lock screen, app sheets, client claims, unfinished project lists, or identity slogans.

- Next.js 15 / React 19 on Vercel. Start from verified main, not the divergent original checkout.
- Homepage is server-rendered in `src/app/page.tsx`. Layout and frame styles are in `home.module.css`.
- Fraunces 400 is the name font; Inter 400/500 is the interface font. White canvas, near-black text, blue interaction/focus accents. Portrait uses the existing approved public `profile.png`.
- `Portrait.tsx` uses Framer Motion for a small hover lift. No entrance opacity hides server-rendered content. Reduced motion is respected.
- `public/gold-frame.png` is a transparent, generated carved-gold frame overlay; the actual profile photo remains unchanged underneath. `public/favicon.svg` is a pure black-and-white yin-yang symbol.
- `MusicPlayer.tsx` server-renders Spotify's compact 80px native embed immediately, with no custom play gate, focus stealing, or modal. Ordinary Spotify outlink works if the provider is unavailable. Spotify controls its own playback/account restrictions. Its custom iframe API currently serves eval-based code; do not weaken the main page CSP to use it.
- Contact destinations are retained from verified production. Do not send messages or place calls as Adam.
- The link grid contains only confirmed profiles: Instagram, YouTube, X, SoundCloud, GitHub, LinkedIn, WhatsApp and Cal.com. Spotify appears above its player; call/email remain below. Brand marks come from React Icons, rendered on the server. Pangaea is hidden until ready.
- Existing shared tokens and download routes remain unchanged so PangPod's consumer contract is preserved. The homepage uses its own font bindings; keep its documentation distinct from the shared consumers.

## Verification and release

Run `pnpm verify` and inspect the local browser at laptop and mobile sizes. Test Spotify loading, blocked-network fallback, keyboard controls, JavaScript-disabled access, and reduced motion. Use the isolated Helium agent profile.

Ship through a branch and pull request. Resolve `adampang.com` directly after the merge to verify that it serves the release SHA. The last verified baseline was `ea1691abe8e240abc821c8a3d0a89783d68b01f7`; deployment history alone is not proof of the active domain.

The app-outlink update passed production build, strict lint, contrast and token checks. `scripts/check-home.py` passed desktop sizes 1440x900, 1366x768, 1024x768 and 1280x600, tablet widths 768 and 601, mobile widths 390 and 320, brand-logo links, Pangaea removal, immediate Spotify visibility, keyboard entry without focus stealing, provider outlink fallback and JavaScript-disabled content access. Screenshots were visually reviewed. Audible output was not reviewed in the muted agent browser.
