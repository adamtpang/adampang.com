# Release Checks

Before deploying:

1. Resolve `adampang.com` directly using Vercel get_deployment. Record the active deployment ID and Git SHA. A recent production-targeted deployment in a history list is not proof that the domain serves it.
2. Work in an isolated checkout that contains that SHA. Preserve unrelated work and private files elsewhere; do not merge a divergent checkout wholesale.
3. Commit only reviewed source changes, then run `pnpm check:release <active-domain-sha>`.
4. Run `pnpm verify`. It includes strict lint, audit regressions, build, rendered route/security checks, contrast, tokens, structured data, progress and journey tests.
5. Verify desktop 1024x768 and 1366x768, mobile 320px and 390px, keyboard interaction, both themes, and reduced motion in a browser. Confirm images load, descriptions are readable, support destinations are links, and Spotify requests start only after selection.
6. Get approval for production deployment. After deploying, resolve the domain again and confirm its SHA and behavior. Do not infer success from a build or an unrelated READY deployment.

With a local preview running on port 3107, the repeatable browser checks are:

```powershell
Get-Content scripts/check-preview.py -Raw | helium-agent --profile personal-design run
```

Keep preview logs outside `.next` on Windows. Open log handles inside the build folder prevent Next from cleaning it for the next build.

## Source Reconciliation, 2026-09-22

Direct domain lookup returned deployment `dpl_Ab6sfUKSig5pbSricFYYz8gz7shH`, source `git`, SHA `dcc14e925dc0c7561b61c03d66c5faadeea9fab2`. GitHub main resolves to the same SHA. The preview branch starts there.

The earlier audit inferred active production from history entry `a9895cd6`; that was not sufficient evidence. The direct domain lookup supersedes that inference.

The original local main is divergent and remains untouched. Its separate privacy cleanup and design refinements were reviewed: the selected GitHub baseline already removes the legacy archive, includes the podcast link, and has the fixed type/tracking tokens. Its alternative fleet analytics change is not on the active domain baseline; do not introduce it as part of a UI fix.

## Gallery

Only upload photos approved for public display under `sights/` in a public Vercel Blob store. Configure `BLOB_READ_WRITE_TOKEN` server-side. Newest listed Blob photos precede local photos, with duplicate paths removed. The homepage revalidates hourly; local photos remain available if Blob is unconfigured or unavailable. Gallery arrows reveal additional returned photos.

This preview validates merging and local fallback without cloud credentials. An actual cloud upload requires a configured store and a public-approved image; do not claim that test passed without performing it.
