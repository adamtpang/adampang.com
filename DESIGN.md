# Adam Pang design system

The human-readable brand book for adampang.com.

The machine source of truth is `src/design/tokens.json`. The `/design` page,
Tailwind theme, downloadable JSON, and downloadable CSS all read from it.

This system is shared. pangpod.com consumes the same `tokens.json` and
`tokens.ts` (see Sharing below), so a token change here is a change to both
sites.

## Identity

> Elemental optimism on black and white.

The system is professional playful: quiet structure, vivid signals, real
content, and restrained motion. It should feel made by a person with broad
curiosity, not assembled from a generic startup template.

## Color

### Structure

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg` | `#fafafa` | `#0a0a0a` | Page background, gradient start |
| `bg-mid` | `#f0f4ff` | `#0d0d14` | Page gradient midpoint |
| `bg-end` | `#e8ecf8` | `#0a0f1a` | Page gradient end |
| `card` | `#ffffff` | `#141414` | Bento surfaces |
| `sunken` | `#f1f5f9` | `#1c1c1f` | Inset wells, code blocks |
| `line` | `#e2e8f0` | `#27272a` | Borders and dividers |
| `fg` | `#1a1a1a` | `#fafafa` | Primary text |
| `muted` | `#5b6674` | `#a1a1aa` | Secondary text, captions |
| `faint` | `#626b78` | `#8b8b93` | Tertiary text, metadata |

The page background is a faint, fixed vertical gradient from `bg` through
`bg-mid` to `bg-end`. Cards sit on it as solid surfaces.

Light mode is the default. Dark mode is a complete alternate, not an inverted
afterthought.

### Interaction

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `accent` | `#2563eb` | `#60a5fa` | Links, CTAs, focus rings, selected state |
| `accent-ink` | `#1d4ed8` | `#93c5fd` | Accent-colored text (AA-safe) |
| `on-accent` | `#ffffff` | `#0a0a0a` | Labels sitting on an accent fill |

A fixed `ramp.accent` scale (50 to 900) exists for tints. Components use 600
for hover fills.

Blue is the one global interaction color. It tells a visitor what can be
acted on. It is not a wash over the entire interface.

### Four elements

| Element | Section token | Light | Dark | Text (`-ink`, light) | Meaning |
| --- | --- | --- | --- | --- | --- |
| Fire | `sights` | `#ef4444` | `#f87171` | `#c81e1e` | Vision, energy, the spark |
| Water | `sounds` | `#38bdf8` | `#7dd3fc` | `#227195` | Flow, waves, music |
| Air | `curiosity` | `#f59e0b` | `#fbbf24` | `#935f07` | Ideas, freedom, attention |
| Earth | `creativity` | `#34d399` | `#6ee7b7` | `#1e7857` | Substance, building, proof |

Purple `spirit`, `#c084fc` (text `#7f57a6`), is reserved for rare expressive moments. It never
becomes a fifth section or a body-text color. `alert` (`#ef4444`, text
`#c81e1e`) is for destructive states only.

### Color rules

1. Black and white carry the composition.
2. Blue owns interaction across the whole site.
3. Each bento owns exactly one elemental hue.
4. Section hues appear in sigils, fills, progress, and small accents.
5. Body text uses `fg`, `muted`, or `faint`, never a decorative hue.
6. Use the `-ink` companion token when colored text is necessary.
7. Reference tokens, never raw hex values in components.

## Typography

| Family | Use |
| --- | --- |
| Space Grotesk 700 | Display, navigation, card titles |
| Lato 300/400/700 | Body copy and interface text. 300 is the default body weight |
| JetBrains Mono | Numbers, dates, labels, metadata |

### Type rules

1. Display text stays compact. Only one statement per page may use display scale.
2. Card headings remain proportional to their containers.
3. Numbers and dates use mono.
4. Letter spacing is zero across the shared system. Use only the token utilities (`tracking-tightest`,
   `tracking-tighter`, `tracking-label`, `tracking-wide`), all `0`. Arbitrary
   `tracking-[...]` values and Tailwind defaults like `tracking-tight` are
   rejected by `pnpm check:tokens`.
5. Labels may use uppercase. Type sizes are fixed, not viewport-scaled.
6. Lowercase is preferred for interface voice. Proper nouns stay correct.

## Layout

The homepage is a compressed bento that should fit a typical laptop viewport.
Mobile may scroll naturally.

| Token | Value | Use |
| --- | --- | --- |
| `radius.lg` | `16px` | Bento cards, the default container |
| `radius.md` | `12px` | Inputs, small cards |
| `radius.sm` | `8px` | Badges and media tiles |
| `radius.full` | `9999px` | Buttons, pills, avatars |
| Card padding | `20px`, then `24px` | Mobile, then larger screens |
| Base gap | `12px` to `16px` | Bento and component rhythm |

Shadows are subtle: `shadow.card` at rest, `shadow.card-md` for hover lift,
`shadow.card-lg` for popovers.

Cards are for bounded tools and repeated items. Do not place decorative cards
inside cards. Media tiles inside Sights are the exception because they are the
content itself.

## Motion

One easing curve owns the site:

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

| Use | Duration |
| --- | --- |
| Hover | `200ms` |
| State change | `400ms` |
| Reveal | `700ms` |

Motion clarifies hierarchy and state. Hover lift is limited to `2px`. Reveals
run once. Every animation collapses under `prefers-reduced-motion`.

## Imagery

Sights contains Adam's real photographs. A small truthful set is stronger than
a large placeholder gallery.

1. The first image is the strongest personal image and receives LCP priority.
2. Images use a stable aspect ratio and explicit dimensions.
3. Captions are concrete places or moments, not generic mood words.
4. Instagram and Pinterest are doors to the wider visual body of work.
5. New images go in `public/sights/` with numeric filename prefixes.

## Creations

The homepage shows a restrained selection of the strongest finished Aether
projects. `thedojo.fun` owns the complete work portfolio and workshop catalog.

1. A public URL is not proof that a product is finished.
2. Homepage projects must be usable, differentiated, and accurately described.
3. Status means public state, not revenue or adoption.
4. Experiments and work in progress belong in the dojo workshop, not the
   homepage selection.

## Voice

> lowercase. specific. honest. warm. no em dashes.

Use concrete nouns and verbs. Say what exists. Do not use inflated counts as a
substitute for outcomes. Calls to action should name the destination or action.

## Iconography

Use Lucide icons for familiar controls. Each bento heading uses its elemental
sigil. The favicon is a black and white yin-yang on the blue interaction field.
It represents opposing modes held inside one optimistic system.

## Sharing with pangpod.com

pangpod.com copies `src/design/tokens.json` and `src/design/tokens.ts` from
this repo. Its contract:

1. The copy comes from a committed ref, `origin/main` by default (what Vercel
   deploys), never from a local working tree.
2. `npm run design:sync` in pangpod.com pulls the files. `npm run design:check`
   fails if they differ, ignoring line endings, and names the commit checked.
3. Change tokens here, merge to main, then sync PangPod. Never edit PangPod's
   copy directly.
4. pangpod.com's tests assert two shared rules: token letter spacing is zero,
   and type sizes are never viewport-scaled.

## Cursor

The custom cursor is an accent-colored dot, with a larger halo over links and
controls. SVG cursor images cannot read CSS variables, so
`src/design/cursor.ts` generates `--cursor-dot` and `--cursor-link` from the
accent token for light and dark. `globals.css` only uses the variables. This
generator is adampang.com only, not part of the tokens PangPod syncs.
`pnpm check:tokens` rejects raw hex in `globals.css`.

## Source map

- Tokens: `src/design/tokens.json`
- Token generator: `src/design/tokens.ts`
- Tailwind mapping: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Cursor generator: `src/design/cursor.ts`
- Living reference: `src/app/design/DesignSystem.tsx`
- Element sigils: `src/components/ElementSigil.tsx`
- Sights: `src/components/Sights.tsx`
- Creations: `src/components/Building.tsx`
- Downloadable tokens: `/design/tokens.json`, `/design/tokens.css`
- Shared consumer: `pangpod.com/scripts/sync-design.mjs`

When documentation and code disagree, fix the disagreement immediately. Do not
create a second source of visual truth.
