/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Add any external image domains you need
  },
  // Enable experimental features if needed
  experimental: {
    optimizeFonts: true,
  },
}

module.exports = nextConfig
