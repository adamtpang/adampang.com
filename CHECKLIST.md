# adampang.com . 10/10 checklist

Every component must clear this bar before we call it shipped.
Tracked here so we never lose the standard. Strike through items as
they ship.

---

## Hero

- [x] Photo. Rounded-square, sunrise hover ring
- [x] Name in Fraunces with sunrise accent
- [x] Tagline (one line, lowercase, voice-true)
- [x] Three fun CTAs (prompt me, read pangaea, come to ns)
- [x] Scroll hint with bouncing arrow
- [ ] Photo replaced with a high-res 2000+ px portrait optimized via next/image
- [ ] On dark mode the sunrise glow ring tone re-tunes for warmth

## Sounds

- [x] Rotating embed gallery, 9 years of Spotify Wrapped
- [x] Year-pill selector, tap to jump
- [x] Auto-rotation with progress bar, pausable
- [x] Outlinks: vibecheck.style, wonderhall.live, soundcloud
- [ ] Pinterest mood-board image per year (drop into /public/sounds/<year>.jpg, gradient overrides)
- [ ] Listen-along feature (sync with what's currently playing on adam's spotify)

## Currently

- [x] Life-progress bar, computed from birthdate, animates 0 -> %
- [x] Currently reading list with audible note
- [x] Living-at line linking ns.com
- [ ] Currently watching / listening single line below reading

## Now (active focus)

- [x] Tagged list (claude / music / writing / building / thinking)
- [x] Each item links to the active artifact
- [ ] Display "last updated" timestamp pulled from git log

## Leverage (naval's four)

- [x] 2x2 grid: code, media, capital, labor
- [x] Each card: claim, three metrics, link list
- [x] Live-data pulse indicator when fetched stats are present
- [x] GitHub repo + star count fetched at build time, hourly revalidation
- [x] Substack post count from pangaea.blog/feed RSS
- [ ] SoundCloud track + play counts (needs api key OR scraping)
- [ ] Stripe revenue (server-only env var, single rolled-up number)
- [ ] Vercel Analytics integration: views per essay shown next to title
- [ ] Capital metric should reflect actual numbers (MRR, total revenue), not "self funded"

## Building (apps catalog)

- [x] Grid of 9 apps with status pills
- [x] Hover lifts card, name turns sunrise
- [x] Each card links to live URL
- [ ] Each app gets a one-line "what i learned" pull-quote on hover
- [ ] Sort options: by status, by traffic, by launch date
- [ ] Per-app GitHub stars badge if open source

## Footer (elsewhere)

- [x] Five categories: meet, words, sound, work, social
- [x] Every internet presence in one list
- [x] Voice-consistent labels
- [ ] Copy email on click toast
- [ ] Year ticker auto-updates

## /ns page

- [x] Hero pitch with longtermer-#2 narrative
- [x] Diary section with X thread linked
- [x] Two-step referral CTA
- [ ] Diary auto-pulls real tweets from the X thread (needs Twitter API or curl-based scraper)
- [ ] Photo carousel from NS daily life
- [ ] FAQ specific to NS (visa, food, climate, who's there)
- [ ] Embedded calendar widget for booking a tour

## Custom cursor

- [x] Two layers: dot + ring
- [x] Sunrise color, drop shadow, never invisible on white
- [x] More inclusive media query (any-pointer: fine) for windows touch laptops
- [x] Native cursor restored if custom cursor cannot render
- [ ] Magnetic snap to interactive elements (currently just hover scale)
- [ ] Trail history on fast movement (subtle)

## Cross-cutting

### SEO
- [ ] OG image. Auto-generated via Next.js OG API at /api/og: Fraunces sunrise card
- [ ] Twitter card image (same as OG)
- [ ] sitemap.xml via app/sitemap.ts
- [ ] robots.txt allowing all + sitemap reference
- [ ] JSON-LD Person schema in layout
- [ ] Canonical URL set
- [ ] Per-page metadata override

### Accessibility
- [x] Lang="en" on html
- [x] :focus-visible outlines using sunrise
- [x] Reduced-motion respected for cursor + magnetic
- [ ] Reduced-motion respected for hero + section reveals
- [ ] Skip-to-content link
- [ ] Color contrast double-check on sunrise body usage
- [ ] alt text on every image (hero photo done)

### Performance
- [x] Static at build time
- [x] Fonts swapped via next/font, no FOUT
- [x] Image component for headshot
- [x] First Load JS under 160 KB
- [ ] Move grain SVG out of inline data URL to /public/grain.svg
- [ ] Drop JetBrains Mono if unused outside .nums utility
- [ ] Lighthouse audit: target 100 / 100 / 100 / 100

### Voice
- [x] No em dashes anywhere in src/
- [x] Lowercase voice on labels and buttons
- [ ] One spelling/grammar pass on every section copy
- [ ] FAQ section answering 4-6 actual questions

### Tech debt
- [x] _legacy/ directory holds old Jekyll site
- [ ] Audit _legacy/_private/ for personal info that should not be in git
- [ ] README.md rewritten for the Next.js stack
- [ ] Vercel domain redirects verified (adam.gives, adamtpang.com, adampangelinan.com, adamtomas.fun)
- [ ] Claude-in-chrome MCP testing for visual regressions

### Future
- [ ] Spotify now-playing via web api (when vibecheck.style is ready)
- [ ] Pangaea RSS auto-pull last 3 essays into a Writing section
- [ ] FAQ section
- [ ] Custom 404 (app/not-found.tsx)
- [ ] Pinterest mood-board imports for sounds

---

## How we measure 10/10

When a person who has never met Adam visits the site:
- They understand who he is in under 30 seconds
- They feel something specific (curiosity, warmth, momentum)
- They leave knowing what he is working on right now
- They want to write back, listen, read, or come to NS
- They remember the site a week later and tell a friend about it

If a section does not contribute to one of those, it does not exist.
