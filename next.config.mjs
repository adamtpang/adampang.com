import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this folder so Next.js doesn't get confused by
  // a stray lockfile higher up the tree (OneDrive Aether parent dir).
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
