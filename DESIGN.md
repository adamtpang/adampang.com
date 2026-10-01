# Adam Pang design tokens

The shared token reference for adampang.com and pangpod.com.

The machine source of truth is `src/design/tokens.json`. The Tailwind theme and
the downloadable `/design/tokens.json` and `/design/tokens.css` all read from it.
pangpod.com copies the token files from this repo (see Sharing below), so a token
change here changes both sites.

adampang.com itself is one plain page: a name, a contact line, and a privacy
link. It uses the canvas, text, and accent tokens and nothing else. The rest of
the system is kept for PangPod.

## Color

### Structure

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `bg` | `#fafafa` | `#0a0a0a` | Page background, gradient start |
| `bg-mid` | `#f0f4ff` | `#0d0d14` | Page gradient midpoint |
| `bg-end` | `#e8ecf8` | `#0a0f1a` | Page gradient end |
| `card` | `#ffffff` | `#141414` | Card surfaces |
| `sunken` | `#f1f5f9` | `#1c1c1f` | Inset wells, code blocks |
| `line` | `#e2e8f0` | `#27272a` | Borders and dividers |
| `fg` | `#1a1a1a` | `#fafafa` | Primary text |
| `muted` | `#5b6674` | `#a1a1aa` | Secondary text, captions |
| `faint` | `#626b78` | `#8b8b93` | Tertiary text, metadata |

`bg-mid` and `bg-end` exist for an optional faint vertical page gradient.
adampang.com uses flat `bg`.

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

### Section hues

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
2. Blue owns interaction.
3. Section hues appear only in small accents, never as body text.
4. Body text uses `fg`, `muted`, or `faint`.
5. Use the `-ink` companion token when colored text is necessary.
6. Reference tokens, never raw hex values. `pnpm check:tokens` rejects raw hex in `globals.css`.

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

## Radius and shadow

| Token | Value | Use |
| --- | --- | --- |
| `radius.lg` | `16px` | Cards, the default container |
| `radius.md` | `12px` | Inputs, small cards |
| `radius.sm` | `8px` | Badges and media tiles |
| `radius.full` | `9999px` | Buttons, pills, avatars |

Shadows are subtle: `shadow.card` at rest, `shadow.card-md` for hover lift,
`shadow.card-lg` for popovers.

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

## Sharing with pangpod.com

pangpod.com copies `src/design/tokens.json`, `src/design/tokens.ts`, and
`src/design/cursor.ts` from this repo. Its contract:

1. The copy comes from a committed ref, `origin/main` by default (what Vercel
   deploys), never from a local working tree.
2. `npm run design:sync` in pangpod.com pulls the files. `npm run design:check`
   fails if they differ, ignoring line endings, and names the commit checked.
3. Change tokens here, merge to main, then sync PangPod. Never edit PangPod's
   copy directly.
4. pangpod.com's tests assert two shared rules: token letter spacing is zero,
   and type sizes are never viewport-scaled.

## Cursor

`src/design/cursor.ts` generates `--cursor-dot` and `--cursor-link` from the
accent token for light and dark, because SVG cursor images cannot read CSS
variables. PangPod uses it. adampang.com no longer does, but the file stays here
because PangPod syncs it from this repo.

## Source map

- Tokens: `src/design/tokens.json`
- Token generator: `src/design/tokens.ts`
- Cursor generator: `src/design/cursor.ts`
- Tailwind mapping: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Downloadable tokens: `/design/tokens.json`, `/design/tokens.css`
- Shared consumer: `pangpod.com/scripts/sync-design.mjs`
- Checks: `pnpm check:tokens`, `pnpm check:contrast`
