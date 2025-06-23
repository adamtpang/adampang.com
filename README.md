# adampang.com

Personal site with theme system, progress tracking, and seamless link management. Inspired by [mem0ry.land](https://www.mem0ry.land/) aesthetics and [Maanasa's progress tracker](https://www.diaryofmaanasa.com/progress) functionality.

## Features

- **🎨 Theme System**: 3 distinct "outfits" (memoryland, midnight, sunrise)
- **🎵 Music Integration**: Theme-specific tracks with Spotify links
- **📊 Progress Tracking**: Visual quest system (100 songs/apps/essays)
- **🔗 Smart Links**: Single-file markdown management system
- **📱 Mobile-First**: Responsive design with Space Grotesk typography
- **✨ Interactive**: Floating particles, theme switching, easter eggs
- **🔍 SEO Optimized**: Proper meta tags, Open Graph, Twitter cards
- **🎮 Gamified**: Progress bars, quest tracking, achievement system

## Quick Start

```bash
jekyll serve
```

Visit `http://localhost:4000`

## Link Management

Edit `_links/links.md` to manage all your links in one place:

```markdown
---
title: "Links"
---

# My Links

🎵 music | https://soundcloud.com/adampang | _blank
💬 chat | https://cal.com/adampang | _blank
💼 work | https://anchormarianas.com | _blank
💻 code | https://github.com/adampang | _blank
📧 email | mailto:adam@adampang.com |
☕ support | https://buymeacoffee.com/adampang | _blank
```

**Format**: `emoji title | url | target`
- `target` is optional (use `_blank` for new tabs)
- The system automatically generates bento cards

## Interactive Features

- **Floating Particles**: Ambient background animation
- **Cursor Trail**: Visual feedback on mouse movement
- **Hover Effects**: Shimmer animations on link cards
- **Easter Egg**: Try the Konami code (↑↑↓↓←→←→BA)

## Customization

- **Background**: Add `/assets/background.jpg` for custom background
- **Music**: Add `/assets/vibes.mp3` for background music
- **Colors**: Edit CSS variables in `index.html`
- **Links**: Edit `_links/links.md` for all link management

## Structure

```
adampang.com/
├── _config.yml              # Jekyll configuration
├── _layouts/default.html    # Main layout
├── _links/links.md          # Single file for all links
├── _plugins/links_parser.rb # Custom parser for links
├── assets/                  # Images and audio
├── index.html              # Main page with all styling
└── README.md               # This file
```

## Philosophy

This site embodies the "adampang.com" philosophy - 12 characters that say it all. The `.com` signals developer identity while the minimalist approach maximizes impact. It's designed as a memorable, game-like experience that serves as your internet hub.

## Deployment

Push to GitHub Pages main branch for automatic deployment.