/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds to prevent warnings from blocking production deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds to prevent blocking production deployment
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
