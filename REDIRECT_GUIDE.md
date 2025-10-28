# Redirect Guide: adampang.com → adamtomas.fun

This guide explains how to redirect your old domain (adampang.com) to your new canonical domain (adamtomas.fun).

## Option 1: DNS-Level Redirect (Recommended)

If both domains are on the same registrar/DNS provider:

### Namecheap Instructions:
1. Log into your Namecheap account
2. Go to Domain List → Click "Manage" next to adampang.com
3. Go to "Advanced DNS" tab
4. Add these records:

   **URL Redirect Record:**
   - Type: URL Redirect Record
   - Host: @
   - Value: https://adamtomas.fun
   - Type: Permanent (301)

   **URL Redirect Record (www):**
   - Type: URL Redirect Record
   - Host: www
   - Value: https://adamtomas.fun
   - Type: Permanent (301)

5. Save changes (can take 30 minutes to propagate)

### Cloudflare Instructions:
1. Log into Cloudflare dashboard
2. Select adampang.com domain
3. Go to "Rules" → "Page Rules"
4. Create a new page rule:
   - URL: `*adampang.com/*`
   - Setting: "Forwarding URL" - 301 Permanent Redirect
   - Destination: `https://adamtomas.fun/$2`
5. Save and deploy

## Option 2: GitHub Pages Redirect

If adampang.com is hosted on GitHub Pages:

1. In your adampang.com repository, create a simple index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=https://adamtomas.fun">
    <link rel="canonical" href="https://adamtomas.fun">
    <title>Redirecting...</title>
    <script>window.location.href = "https://adamtomas.fun";</script>
</head>
<body>
    <p>Redirecting to <a href="https://adamtomas.fun">adamtomas.fun</a>...</p>
</body>
</html>
```

2. Update CNAME file to point to adampang.com
3. Push to GitHub

## Option 3: Netlify Redirect

If adampang.com is on Netlify:

1. Create a `_redirects` file in your adampang.com site root:

```
# Redirect all pages to adamtomas.fun
/*    https://adamtomas.fun/:splat    301!
```

2. Or add to your `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "https://adamtomas.fun/:splat"
  status = 301
  force = true
```

3. Deploy the changes

## Option 4: Vercel Redirect

If using Vercel, add to your `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "destination": "https://adamtomas.fun/:path*",
      "permanent": true
    }
  ]
}
```

## Verification

After setting up redirects, verify they work:

1. **Check redirect:** Visit http://adampang.com in your browser
2. **Verify status code:** Use curl:
   ```bash
   curl -I http://adampang.com
   ```
   Should show: `HTTP/1.1 301 Moved Permanently`

3. **Test with www:**
   ```bash
   curl -I http://www.adampang.com
   ```

4. **Check all paths preserve:**
   - http://adampang.com/blog → https://adamtomas.fun/blog
   - http://adampang.com/contact → https://adamtomas.fun/contact

## Email Setup: adam@adamtomas.fun

### Namecheap Email Forwarding (Free):
1. Domain List → Manage adamtomas.fun
2. Go to "Advanced DNS"
3. Add MX Records (if using email forwarding):
   - MX Record: @ → mx1.privateemail.com (Priority: 10)
   - MX Record: @ → mx2.privateemail.com (Priority: 10)

4. Or use Email Forwarding:
   - Go to "Redirect Email" tab
   - Add: adam@adamtomas.fun → adamtpang@gmail.com
   - Enable "Catch-All" if you want *@adamtomas.fun

### Google Workspace (Paid - $6/month):
1. Go to workspace.google.com
2. Sign up with adamtomas.fun domain
3. Follow DNS setup instructions
4. Create adam@adamtomas.fun mailbox

### Cloudflare Email Routing (Free):
1. In Cloudflare dashboard for adamtomas.fun
2. Go to "Email" → "Email Routing"
3. Add destination: adamtpang@gmail.com
4. Create route: adam@adamtomas.fun → adamtpang@gmail.com
5. Verify DNS records are added automatically

## Update These Everywhere:

After redirect is live, update your links across:

- [ ] GitHub profile (bio, README)
- [ ] LinkedIn
- [ ] Twitter/X bio
- [ ] Instagram bio
- [ ] Farcaster profile
- [ ] Substack settings
- [ ] SoundCloud bio
- [ ] YouTube channel about page
- [ ] Cal.com profile
- [ ] Any business cards or materials

## SEO Considerations

The 301 permanent redirect will:
- Transfer SEO value from adampang.com to adamtomas.fun
- Update Google's index (can take 2-4 weeks)
- Preserve backlinks

Consider submitting a change of address in Google Search Console:
1. Add both domains to Search Console
2. Use the "Change of Address" tool
3. Submit adamtomas.fun as the new preferred domain

## Timeline

- DNS changes: 30 minutes - 48 hours
- Google index update: 2-4 weeks
- Full SEO transfer: 1-3 months

## Troubleshooting

**"Domain doesn't redirect"**
- Check DNS propagation: https://dnschecker.org
- Clear browser cache
- Try incognito/private mode

**"Getting 404 errors"**
- Verify CNAME file in GitHub repo
- Check if GitHub Pages is enabled
- Ensure custom domain is set correctly

**"Redirect loop"**
- Check you're not redirecting adamtomas.fun to itself
- Clear all cache and cookies
- Check for conflicting redirect rules

## Questions?

If you run into issues:
1. Check which hosting provider adampang.com is currently on
2. Run: `dig adampang.com` to see current DNS setup
3. Check registrar (likely Namecheap) for both domains
4. Verify current hosting platform (GitHub Pages, Netlify, Vercel, etc.)

Need to run diagnostics? Use these commands:
```bash
# See where domain points
dig adampang.com

# Check HTTP response
curl -I http://adampang.com

# Full trace
curl -L -v http://adampang.com
```
