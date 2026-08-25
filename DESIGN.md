# Adam Pang design system

The human-readable brand book for adampang.com.

The machine source of truth is `src/design/tokens.json`. The `/design` page,
Tailwind theme, downloadable JSON, and downloadable CSS all read from it.

## Identity

> Elemental optimism on black and white.

The system is professional playful: quiet structure, vivid signals, real
content, and restrained motion. It should feel made by a person with broad
curiosity, not assembled from a generic startup template.

## Color

### Structure

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| Canvas | `#fafafa` | `#0a0a0a` | Page background |
| Card | `#ffffff` | `#141414` | Bento surfaces |
| Ink | `#1a1a1a` | `#fafafa` | Primary text |
| Line | `#e2e8f0` | `#27272a` | Borders and dividers |

Light mode is the default. Dark mode is a complete alternate, not an inverted
afterthought.

### Interaction

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `accent` | `#2563eb` | `#60a5fa` | Links, CTAs, focus rings, selected state |

Blue is the one global interaction color. It tells a visitor what can be
acted on. It is not a wash over the entire interface.

### Four elements

| Element | Section | Light | Meaning |
| --- | --- | --- | --- |
| Fire | Sights | `#ef4444` | Vision, energy, the spark |
| Water | Sounds | `#38bdf8` | Flow, waves, music |
| Air | Curiosity | `#f59e0b` | Ideas, freedom, attention |
| Earth | Creations | `#34d399` | Substance, building, proof |

Purple spirit, `#c084fc`, is reserved for rare expressive moments. It never
becomes a fifth section or a body-text color.

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
| Space Grotesk | Display, navigation, card titles |
| Lato | Body copy and interface text |
| JetBrains Mono | Numbers, dates, labels, metadata |

### Type rules

1. Display text stays compact. Only one statement per page may use display scale.
2. Card headings remain proportional to their containers.
3. Numbers and dates use mono.
4. Letter spacing is never negative beyond the named display tokens.
5. Labels may use uppercase with the named tracking tokens.
6. Lowercase is preferred for interface voice. Proper nouns stay correct.

## Layout

The homepage is a compressed bento that should fit a typical laptop viewport.
Mobile may scroll naturally.

| Token | Value | Use |
| --- | --- | --- |
| Card radius | `16px` | Bento cards |
| Small radius | `8px` | Badges and media tiles |
| Card padding | `20px`, then `24px` | Mobile, then larger screens |
| Base gap | `12px` to `16px` | Bento and component rhythm |

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

## Source map

- Tokens: `src/design/tokens.json`
- Token generator: `src/design/tokens.ts`
- Tailwind mapping: `tailwind.config.ts`
- Global styles: `src/app/globals.css`
- Living reference: `src/app/design/DesignSystem.tsx`
- Element sigils: `src/components/ElementSigil.tsx`
- Sights: `src/components/Sights.tsx`
- Creations: `src/components/Building.tsx`

When documentation and code disagree, fix the disagreement immediately. Do not
create a second source of visual truth.
