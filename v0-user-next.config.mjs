/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['thehackernews.com', 'lh3.googleusercontent.com', 'blogger.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Update experimental config to use puppeteer-core
  experimental: {
  },
  serverExternalPackages: ['puppeteer-core'],
}

export default nextConfig

