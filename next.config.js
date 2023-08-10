/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    loader: 'custom',
    path: '',
  },
}

module.exports = nextConfig
