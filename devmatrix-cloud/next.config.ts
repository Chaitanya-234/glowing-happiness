/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // For production deployment
  output: 'standalone',

  // Fix: tell Turbopack the correct workspace root
  turbopack: {
    root: __dirname,
  },

  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devmetrix.in',
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'framer-motion',
      'react-konva',
      '@react-three/drei',
      '@react-three/fiber'
    ],
  },
}

module.exports = nextConfig