/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    // Exclude backup directories and other unwanted paths
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/_backup/**', '**/node_modules/**'],
    }
    
    // Add module exclusions
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [
        /node_modules/,
        /_backup/,
        /Programming\/.*\/_backup/,
      ],
    })
    
    return config
  },
};

module.exports = nextConfig;
