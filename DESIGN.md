# Adam Pang . Design System

The brand book. Every visual choice on adampang.com flows from this.
If something on the site doesn't match here, fix the site.
If something here is wrong, fix this.

## 1. Identity in one line

> A 23-year-old optimist from Guam. Building, writing, making music
> at Network School. **Sunrise on white.**

Two words always paired: **sunrise** (the spark) and **white** (the canvas).

## 2. Color

### Signature
| Token | Hex | Usage |
| --- | --- | --- |
| `sunrise` | `#FF5C39` | Primary accent. Active states, CTAs, highlights. |

Sunrise is used everywhere a viewer's eye should go. Never used for
body text. Used in gradients, icons, dots, underlines.

### Sunrise gradient (the bold moments)
```
linear-gradient(135deg, #FF5C39 0%, #FF8970 50%, #F59E0B 100%)
```
Used on the name, primary CTAs, the active year pill in Sounds.

### Warm partners (ambient tints, never solid backgrounds)
| Token | Hex | Where |
| --- | --- | --- |
| `coral` | `#FF8970` | Reserved |
| `peach` | `#FFB69E` | Building glow |
| `dawn` | `#FFD2B8` | Currently glow |
| `amber` | `#F59E0B` | Now glow |
| `gold` | `#E8A93B` | Optional |
| `rose` | `#FFA999` | Sounds glow |

Each section gets one warm tone. Never green, blue, violet, or
desaturated grey. Stay warm.

### Canvas
| Token | Hex | Usage |
| --- | --- | --- |
| `paper` | `#FFFFFF` | Default light background. Pure white. |
| `paper.soft` | `#FAFAF7` | Cards, subtle insets. |
| `paper.muted` | `#F2F1ED` | Muted strips. |
| `ink` | `#0E0E0C` | Primary text. Default dark background. |
| `ink.soft` | `#1F1F1C` | Card surface in dark mode. |
| `ink.muted` | `#6B6B66` | Secondary text. |

### Color rules
1. White is the canvas. No grey-tinted backgrounds.
2. Sunrise is the only saturated solid color.
3. Warm partners only appear as ambient glows or gradient stops.
4. No cool colors. Ever. (Status pills allowed: emerald = live.)
5. Body copy uses `ink` at varying opacities (100, 80, 70, 65, 50, 40).

## 3. Typography

| Family | Use | Source |
| --- | --- | --- |
| **Fraunces** | Display, headlines, italic accents | Google Fonts (variable) |
| **Inter** | Body, UI, buttons | Google Fonts |
| **JetBrains Mono** | Numbers, dates, ages, view counts | Google Fonts |

### Display sizing (Fraunces)
| Use | Mobile | Desktop |
| --- | --- | --- |
| Hero name | `text-[3.25rem]` | `text-[9rem]` (lg) |
| Section title | `text-3xl` | `text-4xl` |
| Sub-headline | `text-2xl` | `text-3xl` |
| Pull quote | `text-xl italic` | `text-2xl italic` |

### Body sizing (Inter)
| Use | Size |
| --- | --- |
| Lead paragraph | `text-base sm:text-lg md:text-xl` |
| Body | `text-base` |
| Card description | `text-sm` |
| Caption | `text-xs` |
| Eyebrow | `text-[0.65rem]` uppercase, `tracking-[0.2em]` |

### Typography rules
1. Numbers in mono. Always.
2. Italic only on Fraunces for emphasis. Never on Inter.
3. Lowercase voice everywhere except proper nouns.
4. Tight tracking on display (`tracking-tightest`, `-0.045em`).
5. Loose tracking on caps (`tracking-[0.18em]` to `[0.22em]`).

## 4. Voice

> lowercase. specific. honest. warm. no em dashes ever.

### Examples

**Yes**
- *building, writing, making music. living at network school.*
- *prompt me*
- *one playlist per year. the through-line.*

**No**
- "Building software at Network School - shipping fast!"
- "Subscribe to Pangaea — my newsletter"
- "Click here to learn more"

### Voice rules
1. Always lowercase, except proper nouns.
2. Periods, not em dashes.
3. Specific verbs over vague ones (*shipping* not *making*).
4. No business-speak. No corporate-tense.
5. Talk like Adam, not like a brand.

## 5. Motion

### Easing
Default ease curve: `cubic-bezier(0.16, 1, 0.3, 1)` aka *ease-out-quart*.
Used for nearly every transition.

### Durations
| Use | Duration |
| --- | --- |
| Micro (hover) | 200ms |
| Small (state change) | 400ms |
| Medium (reveal) | 700ms |
| Large (page transition, splash dismiss) | 600 to 900ms |

### Springs (Framer Motion)
| Feel | Stiffness | Damping | Mass |
| --- | --- | --- | --- |
| Snappy (magnetic) | 220 | 18 | 0.4 |
| Soft (cursor ring) | 280 | 24 | 0.6 |

### Motion rules
1. Restrained. Reveal once on scroll, not repeatedly.
2. Stagger reveals in 40 to 80ms increments.
3. Hover lifts: `-translate-y-0.5` to `-1`. Never more.
4. Respect `prefers-reduced-motion`. Skip transforms, keep fades.

## 6. Layout

### Width
- Long-form sections: `max-w-3xl` (768px)
- Header + Footer: `max-w-5xl` (1024px)

### Spacing
- Section vertical: `py-16 sm:py-20 md:py-28`
- Section horizontal: `px-5 sm:px-6`
- Card padding: `p-5 md:p-6`
- Element gaps: `gap-2 sm:gap-3` (buttons), `gap-4` (cards), `gap-8` (sections)

### Radius
- Buttons: `rounded-full`
- Cards: `rounded-2xl`
- Mini elements (pills, dots): `rounded-full`

## 7. Surfaces and depth

- **Glass surfaces**: `bg-paper/60 backdrop-blur-sm` for floating buttons
- **Glow shadows on CTAs**: `shadow-lg shadow-sunrise/25 hover:shadow-xl hover:shadow-sunrise/40`
- **Card shadows**: minimal. `shadow-sm` at most. Borders + ambient glows do the depth work.
- **Section glows**: radial gradient blob, 900px, 32% intensity, 40px blur

## 8. Cursor

CSS-only. Sunrise SVG dot via `cursor: url(...)`.
- Default body: 24px SVG, 3.5px sunrise dot
- Interactive (a, button, etc.): 32px SVG with halo + 5px dot
- Text inputs: native I-beam

## 9. Iconography

- Sigil: a single 6 to 8px sunrise dot, often paired with a mono caption.
- Arrows: text characters (↗ ↓ → ←) at small sizes. No SVG icon library.

## 10. Favicon

Solid sunrise rounded square. 32x32, rx=9. White is implied by absence.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="9" fill="#FF5C39"/>
</svg>
```

## 11. The vibe splash

First-visit overlay. Full-bleed sunrise radial gradient. Fraunces
"press play. enter the vibe." Click to dismiss + auto-trigger
Spotify play. Skips on subsequent same-session visits.

This is the cfcf.ca pattern adapted: music belongs to first-impression.

## 12. What this site is not

- Corporate. Not a brand site.
- A single-page marketing landing. It is a hub.
- Uniform. Each section has its own warm tonal accent.
- Restrained for the sake of restraint. Restrained for the sake of clarity.
- Forever. This is v2. v3 will look different. Update this doc when it does.

## 13. Source files

- Tokens: `tailwind.config.ts`
- Globals: `src/app/globals.css`
- Section template: `src/components/Section.tsx`
- Glow primitive: `src/components/SectionGlow.tsx`
- Vibe splash: `src/components/VibeSplash.tsx`

## 14. Personal color identity

> White is the canvas. Sunrise is the spark. Together: adam pang.

White: clarity, openness, honesty, plenty of room to write your own
future. Sunrise: optimism, the start of things, warmth, guam mornings.
