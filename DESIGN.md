# adampang.com . design system

The single source of truth for color, type, motion, and voice on
adampang.com. Whenever a section is added or a component is built, it
should pass the rules below before shipping.

---

## 1. Color palette

### Signature
```
PACIFIC SUNRISE   #FF5C39    rgb(255, 92, 57)
```
The one accent. Used for:
- Hero name accent ("Pang")
- Link hover state
- Underline decoration
- CTA primary fill (light mode)
- Live-data heartbeat dots
- Custom cursor (dot + ring)
- Favicon

Never used for body text. Never used as a background fill larger than a
button. Always paired with paper or ink, never with another color.

### Light mode
```
PAPER         #FAF8F4    rgb(250, 248, 244)   page background
PAPER soft    #F2EFE8                         secondary surface
PAPER muted   #E8E4DA                         tertiary surface

INK           #0E0E0C    rgb(14, 14, 12)      primary text
INK soft      #1F1F1C                         secondary text
INK muted     #6B6B66                         tertiary text / labels
INK faint     #A8A8A2                         decorative text / disabled
```

### Dark mode (sunrise lifts to #FF6D50 for contrast)
```
INK           #0E0E0C                         page background
INK soft      #1F1F1C                         secondary surface

PAPER         #FAF8F4                         primary text
PAPER 75%                                     body text
PAPER 40%                                     tertiary text / labels
```

### Functional accents (status pills, tags only)
```
EMERALD 500   #10B981    "live"
SUNRISE       #FF5C39    "shipping"
AMBER 400     #FBBF24    "building"
VIOLET 500    #8B5CF6    "claude" tag
SKY 500       #0EA5E9    "thinking" tag
```

These are NEVER used outside of the small status-dot context.

### What's banned
- Any blue, green, or purple as a primary accent (only sunrise)
- Hardcoded hex outside Tailwind tokens
- Gradients larger than a 200px tile
- Pure black `#000` (use `--ink #0E0E0C`)
- Pure white `#FFF` (use `--paper #FAF8F4`)

---

## 2. Typography

### Stack
```
DISPLAY    Fraunces (variable, opsz + SOFT axes)
BODY       Inter
NUMBERS    JetBrains Mono (only for tabular nums, dates, ages, view counts)
```

All loaded via `next/font` with `display: 'swap'`. Subset: latin only.

### Type scale (used consistently across sections)
```
HERO H1    text-6xl md:text-8xl lg:text-9xl    Fraunces 700 + opsz=144
SECTION H2 text-3xl md:text-4xl                Fraunces 600
CARD H3    text-lg / text-2xl                  Fraunces 500
BODY       text-base md:text-lg                Inter 400
LABEL      text-xs uppercase tracking-[0.18em] Inter 500
NUMS       nums utility class                  JetBrains Mono 400
```

### Voice rules
- Lowercase. Always. Body, buttons, headings, labels.
- Proper nouns are exempt: "Adam Pang", "Network School", "Spotify", names of books.
- No em dashes. Use periods, commas, or colons. Voice is direct.
- Sentences are short. Multi-clause sentences are split.
- First-person used sparingly. Avoid the word "I" when context allows.

---

## 3. Motion

### Easing
```
ease = cubic-bezier(0.16, 1, 0.3, 1)
```
Used everywhere. No other easing curve in the codebase.

### Durations
```
INSTANT       150ms    hover state, color swap
QUICK         300ms    button press, micro
NORMAL        600ms    section reveal, fade in
SLOW          900ms    hero entrance, big swap
LANGUID       1600ms   life progress bar fill, ambient
```

### Patterns
- **Stagger reveal**: every list animates in with 40-60ms delay between items
- **whileInView**: sections trigger on scroll, `viewport={{ once: true, margin: '-40px' }}`
- **Magnetic CTAs**: cursor pulls button toward it within ~40px radius, multiplier 0.25
- **Cursor**: two layers, dot springs at stiffness 800, ring at 220
- **Crossfade**: AnimatePresence with mode="wait" between slides

### Always respect
- `prefers-reduced-motion: reduce` skips non-essential animation
- Touch / coarse-pointer devices don't see custom cursor or magnetic pulls

---

## 4. Spacing & layout

```
CONTAINER     max-w-3xl        (768px) for content sections
HEADER MAX    max-w-5xl        (1024px) for nav and footer
PADDING X     px-6             (24px) on all sections
SECTION Y     py-20 md:py-28
HAIRLINE      1px              ink/5 light, paper/5 dark
RADIUS        rounded-2xl      cards
RADIUS BIG    rounded-3xl      hero photo
```

Generous vertical rhythm. Never cram. White space is part of the design.

---

## 5. Components are data-driven

Every list on the homepage reads from `src/data/`:
```
identities.ts    (currently unused, kept for revival)
sounds.ts        9 years of Spotify Wrapped
books.ts         currently reading
apps.ts          shipped + in flight
now.ts           active focus
leverage.ts      naval's four with proof
outlinks.ts      every internet presence
```

Adding new content = editing one of these files. Never hand-edit JSX
for content updates.

---

## 6. The non-negotiables

If a component breaks any of these, it isn't 10/10 yet:

1. Loads under 1s on a 4G connection
2. Works without JavaScript (graceful degradation)
3. Passes WCAG AA color contrast
4. Has a focus-visible state for keyboard users
5. Has a hover state that uses sunrise as the verb
6. Animates in with the standard ease curve and duration
7. Pulls content from a data file, not hardcoded JSX
8. Looks great on a 320px iPhone SE
9. Looks great on a 4K display
10. Tells one specific thing about Adam, not a generic claim
