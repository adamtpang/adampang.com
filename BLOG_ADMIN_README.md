# Blog Admin Interface

A BearBlog-inspired admin interface for your Jekyll blog that allows you to create, edit, publish, and manage blog posts through a web interface.

## Features

- ✅ **Create new posts** - Write posts in Markdown with a clean editor
- ✅ **Edit existing posts** - Modify published posts directly
- ✅ **Draft system** - Save drafts in `_archive/` folder before publishing
- ✅ **Publish/Unpublish** - Move posts between `_posts/` and `_archive/`
- ✅ **File management** - Automatically handles Jekyll front matter and file naming
- ✅ **Clean UI** - Minimal, focused interface similar to BearBlog

## Important Changes Made

### File Naming
- **Posts now use simple filenames**: `title.md` instead of `YYYY-MM-DD-title.md`
- **Dates are stored in front matter** rather than filenames
- This makes it easier to manage drafts and move files between `_posts/` and `_archive/`

### Password Protection
- Admin interface is protected with password: `blog2025!`
- **Change this password** in `admin.html` line 298
- Password is stored in browser localStorage after successful login

### GitHub Pages Compatibility
- **The admin interface requires Node.js and won't work on GitHub Pages**
- See `github-pages-setup.md` for deployment strategies
- Recommended: Use admin locally, commit changes, GitHub Actions auto-deploys

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the API Server

The admin interface requires a Node.js API server to manage files:

```bash
npm start
```

This starts the API server on `http://localhost:3001`

### 3. Start Jekyll (in another terminal)

```bash
npm run serve
```

This starts your Jekyll site on `http://localhost:4000`

### 4. Access the Admin

Visit: `http://localhost:4000/blog/admin/`

## Usage

### Creating Posts

1. Click "New Post" button
2. Fill in title, content, and optional cover image
3. Choose "Save Draft" to save to `_archive/` or "Publish" to publish to `_posts/`

### Managing Posts

- **Published tab**: Shows all posts from `_posts/`
  - Edit: Modify post content
  - Unpublish: Move to drafts

- **Drafts tab**: Shows all drafts from `_archive/`
  - Edit: Modify draft content
  - Publish: Move to published posts
  - Delete: Remove draft permanently

### File Structure

```
_posts/           # Published posts (title.md format)
_archive/         # Draft posts (title.md format)
admin.html        # Admin interface (password: blog2025!)
blog-api.js       # API server
package.json      # Dependencies
github-pages-setup.md  # GitHub Pages deployment guide
```

## API Endpoints

The blog API provides RESTful endpoints:

- `GET /api/posts` - List all published posts
- `GET /api/drafts` - List all drafts
- `POST /api/posts` - Publish new post
- `POST /api/drafts` - Save new draft
- `PUT /api/posts/:filename` - Update post
- `PUT /api/drafts/:filename` - Update draft
- `DELETE /api/drafts/:filename` - Delete draft
- `POST /api/posts/:filename/unpublish` - Move post to drafts

## Development

For development with auto-restart:

```bash
npm run dev
```

## Troubleshooting

### "Error connecting to blog API"

Make sure the API server is running:
```bash
npm start
```

### Permission Issues

Ensure the Node.js process has write permissions to `_posts/` and `_archive/` directories.

### CORS Issues

The API includes CORS headers for localhost. If accessing from a different domain, update the CORS configuration in `blog-api.js`.

## Customization

### Change API Port

Edit `blog-api.js` and update the `PORT` variable.

### Modify Admin URL

Change the `permalink` in `admin.html` front matter.

### Styling

The admin interface CSS is embedded in `admin.html`. Modify the `<style>` section to customize the appearance.