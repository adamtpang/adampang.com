# Homepage Reference Preview

2026-09-21: Adam requested a site as good as shreygups.com.

- Isolated branch `design/reference-restraint`, based on `origin/main` at dcc14e92. Original dirty checkout untouched. Not deployed.
- Next.js app. Run `pnpm verify` for build and six validation suites, `pnpm dev` for development.
- Homepage keeps four primary panels; proof is a native disclosure. Removed the long homepage explanation. Retained links, photo, click-to-load Spotify, themes, analytics and structured metadata.
- Homepage-only geometry lives in `src/app/home.module.css`. Shared colors remain in design tokens. Strummer promotion is now a compact text link.
- Updated site-quality assertions to reflect the compact homepage instead of requiring 250 words and sales paragraphs. Security, metadata, privacy and trust-route checks retained.
- Verified build, six suites, focused lint, desktop screenshots at 1440x900 and 1366x768 with no page scroll. At 1024x768 panels fit but the footer requires short scrolling. Mobile 390px and 320px have no horizontal overflow.
- Browser confirmed image loaded, theme switching, proof disclosure and user-initiated Spotify Wrapped 2023 embed. Audio playback itself not verified.
- Local production preview: http://127.0.0.1:3107. No deployment, push or commit performed.
- Next design decision: an original visual/music interaction or stronger project case studies. Do not copy Shrey's artwork or fabricate project outcomes.

## Audit Corrections, 2026-09-22

- Goal: correct the audited defects and show a local preview, not deploy production.
- Active domain resolved directly to GitHub SHA dcc14e925dc0c7561b61c03d66c5faadeea9fab2. The earlier audit's inference from a newer deployment-history entry was incorrect. See RELEASE.md. The original divergent main remains untouched.
- Zcash is now a real external link. Existing Stripe and Buy Me a Coffee destinations retained. Removed paid-subscription metadata, conflicting patron promises and speculative support outcomes.
- Removed the borrowed "500+ founders" personal statistic. Shortened project descriptions and removed truncation/nested cards.
- Sights merges Blob and local photos with remote-first deduplication and local fallback. Added manual gallery paging. Real cloud uploads were not tested without credentials; merge/fallback tests and the existing local photo are verified.
- Music selection is manual, with no timed rotation or moving progress bar. Spotify remains click-to-load. Social tile labels use dark ink for contrast in both modes.
- Homepage fits 1024x768, 1366x768 and 1440x900. Phone widths 320 and 390 have no horizontal overflow or clipped project descriptions.
- pnpm verify passed: strict lint, audit regressions, production build, and all six existing validation suites. Added repeatable Helium browser checks in scripts/check-preview.py. Release gate correctly rejects a dirty checkout.
- Local production preview runs on port 3107. Logs are in the Windows temp directory, never inside .next. No production deployment or push performed.
