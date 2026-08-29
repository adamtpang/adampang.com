import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Next.js emits a small amount of inline bootstrap code, and this site has
 * one inline theme bootstrap plus JSON-LD. `unsafe-inline` is therefore
 * required until the app moves to per-request nonces. Every network source
 * is still named explicitly; there are no blanket * script or frame sources.
 *
 * The Google Fonts origins are for the full-document /gives mirror. The
 * Vercel Blob pattern preserves the documented image fallback when the local
 * sights folder is empty. Spotify is frame-only and remains click-to-load.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "frame-src https://open.spotify.com",
  `connect-src 'self' https://vitals.vercel-insights.com${isDevelopment ? ' ws: http:' : ''}`,
  "media-src 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this folder so Next.js doesn't get confused by
  // a stray lockfile higher up the tree (OneDrive Aether parent dir).
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'browsing-topics=(), camera=(), geolocation=(), microphone=(), usb=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
