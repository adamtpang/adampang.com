# GitHub Pages Setup Guide

## The Challenge

The blog admin interface requires a Node.js server to manage files, which **cannot run directly on GitHub Pages** (GitHub Pages only serves static files).

## Solutions for GitHub Pages

### Option 1: GitHub Actions + Local Development
**Recommended approach:**

1. **Local Development**: Use the admin interface locally for writing/editing
2. **Auto-Deploy**: Set up GitHub Actions to build and deploy on every push

#### Setup:
1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Workflow:
1. Write posts locally using the admin interface
2. Commit changes to GitHub
3. GitHub Actions automatically builds and deploys your site

### Option 2: Static Admin Interface (File-only)
Create a simplified admin that generates file content you can copy/paste:

```html
<!-- Simplified admin that generates Jekyll markdown -->
<script>
function generatePost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];
  
  const frontMatter = `---
title: "${title}"
date: ${date}
---

${content}`;
  
  document.getElementById('output').value = frontMatter;
}
</script>
```

### Option 3: Third-Party CMS Integration
- **Forestry.io** (now TinaCMS)
- **Netlify CMS** 
- **Decap CMS** (formerly Netlify CMS)

### Option 4: Hybrid Approach (Recommended)
1. **Local Admin**: Use the full admin interface for heavy editing
2. **Quick Edits**: Edit files directly on GitHub for small changes
3. **Mobile**: Use GitHub's mobile app for quick post creation

## Setting Up Local + GitHub Pages

### Step 1: Local Development
```bash
# Start the admin API
npm start

# Start Jekyll (in another terminal)
npm run serve

# Visit http://localhost:4000/blog/admin/
```

### Step 2: Content Creation Workflow
1. Create/edit posts using local admin interface
2. Posts are saved to `_posts/` and `_archive/`
3. Commit changes: `git add . && git commit -m "Add new post"`
4. Push to GitHub: `git push origin main`
5. GitHub Pages automatically rebuilds and deploys

### Step 3: GitHub Pages Settings
1. Go to your repo settings
2. Navigate to "Pages"
3. Set source to "GitHub Actions"
4. Your site will be available at `https://yourusername.github.io/yourrepo`

## File Structure for GitHub Pages
```
├── _posts/           # Published posts (title.md)
├── _archive/         # Drafts (title.md)
├── admin.html        # Admin interface (localhost only)
├── blog-api.js       # API server (localhost only)
├── .github/
│   └── workflows/
│       └── deploy.yml # Auto-deployment
└── _config.yml       # Jekyll config
```

## Security Note
The admin interface is password-protected with a simple client-side password. For production use, consider:
- Changing the password in `admin.html` (line 298)
- Using environment variables for the password
- Adding server-side authentication for better security

## Limitations on GitHub Pages
- Cannot run the Node.js admin interface
- No real-time editing
- Must commit changes to see them live
- Limited to Jekyll's plugin restrictions

The local admin interface gives you the best of both worlds: powerful editing capabilities locally, with seamless GitHub Pages deployment.