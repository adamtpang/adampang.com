# Netlify CMS Setup Instructions

## Overview
You now have Netlify CMS configured for your blog! This allows you to publish and manage blog posts directly from `adampang.com/admin/` without needing GitHub tokens or local git access.

## Setup Steps

### 1. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose GitHub and select your `adampang.com` repository
4. Set build settings:
   - Build command: `bundle exec jekyll build`
   - Publish directory: `_site`
5. Deploy!

### 2. Enable Netlify Identity
1. In your Netlify dashboard, go to Site Settings → Identity
2. Click "Enable Identity"
3. Under Registration preferences, select "Invite only" (recommended)
4. Under Git Gateway, click "Enable Git Gateway"

### 3. Invite Yourself as Admin
1. Go to Identity tab in your Netlify dashboard
2. Click "Invite users"
3. Enter your email address
4. Check your email and accept the invitation

### 4. Test the Admin
1. Go to `https://yoursitename.netlify.app/admin/`
2. Login with your Netlify Identity credentials
3. You should see your blog posts and drafts!

## How It Works

- **Posts**: Managed in `_posts/` folder - these are published blog posts
- **Drafts**: Managed in `_archive/` folder - these are unpublished drafts
- **Auto-deploy**: Any changes made through the admin interface will automatically trigger a new site build
- **No GitHub tokens needed**: Netlify CMS uses Git Gateway which handles GitHub authentication

## Features

✅ Create new posts
✅ Edit existing posts
✅ Manage drafts
✅ Upload images
✅ Rich markdown editor
✅ Live preview
✅ Auto-deployment

## Migration from Old Admin

Your old admin interface at `/blog/admin/` will still work locally, but the new Netlify CMS admin at `/admin/` will work everywhere without requiring GitHub tokens.

## Next Steps

1. Deploy to Netlify following the steps above
2. Set up Identity and Git Gateway
3. Invite yourself as a user
4. Start publishing!

The beauty of this setup is that it works with your existing Jekyll + GitHub Pages workflow, but adds a professional CMS interface that works anywhere.