/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds to prevent warnings from blocking production deployment
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
