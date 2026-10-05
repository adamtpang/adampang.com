# adampang.com

## Current direction, October 5, 2026

Adam approved building and shipping one white page: a framed portrait, a modest name, a short personal introduction, music, selected outlinks, and WhatsApp/call/email. No lock screen, app sheets, client claims, unfinished project lists, or identity slogans.

- Next.js 15 / React 19 on Vercel. Start from verified main, not the divergent original checkout.
- Homepage is server-rendered in `src/app/page.tsx`. Layout and frame styles are in `home.module.css`.
- Fraunces 400 is the name font; Inter 400/500 is the interface font. White canvas, near-black text, blue interaction/focus accents. Portrait uses the existing approved public `profile.png`.
- `Portrait.tsx` uses Framer Motion for a small hover lift. No entrance opacity hides server-rendered content. Reduced motion is respected.
- `MusicPlayer.tsx` loads Spotify's compact native embed only after a request. The 80px player stays mounted. Ordinary Spotify outlink works without JavaScript. Spotify controls its own playback/account restrictions. Its custom iframe API currently serves eval-based code; do not weaken the main page CSP to use it.
- Contact destinations are retained from verified production. Do not send messages or place calls as Adam.
- Existing shared tokens and download routes remain unchanged so PangPod's consumer contract is preserved. The homepage uses its own font bindings; keep its documentation distinct from the shared consumers.

## Verification and release

Run `pnpm verify` and inspect the local browser at laptop and mobile sizes. Test Spotify loading, blocked-network fallback, keyboard controls, JavaScript-disabled access, and reduced motion. Use the isolated Helium agent profile.

Ship through a branch and pull request. Resolve `adampang.com` directly after the merge to verify that it serves the release SHA. The last verified baseline was `3746daa32f74bc07e2a9b3b42fd257d895741120`; deployment history alone is not proof of the active domain.

The local production build, strict lint, contrast and token checks passed. `scripts/check-home.py` passed laptop sizes 1440x900, 1366x768, 1024x768 and 1280x600, mobile widths 390 and 320, keyboard entry, deferred Spotify loading, stable player mounting, provider outlink fallback and JavaScript-disabled link access. Screenshots were visually reviewed. Audible output was not reviewed in the muted agent browser.
