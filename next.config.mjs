import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Next.js emits a small amount of inline bootstrap code and the design-token
 * style block, so `unsafe-inline` is required until the app moves to
 * per-request nonces. Every network source is named explicitly.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  "frame-src https://open.spotify.com",
  `connect-src 'self' https://us.i.posthog.com https://vitals.vercel-insights.com${isDevelopment ? ' ws: http:' : ''}`,
  "media-src 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join('; ');

/** /cv embeds its own PDF, so it may frame same-origin documents. */
const cvContentSecurityPolicy = contentSecurityPolicy.replace(
  'frame-src https://open.spotify.com',
  "frame-src 'self' https://open.spotify.com",
);

/** The resume PDF may be framed by this site only (the /cv embed). */
const pdfHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this folder so Next.js doesn't get confused by
  // a stray lockfile higher up the tree (OneDrive Aether parent dir).
  outputFileTracingRoot: __dirname,
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
      // Later matches override the same header keys set above.
      { source: '/cv', headers: [{ key: 'Content-Security-Policy', value: cvContentSecurityPolicy }] },
      { source: '/adam-pang-resume.pdf', headers: pdfHeaders },
      { source: '/cv.pdf', headers: pdfHeaders },
    ];
  },
};

export default nextConfig;
