/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
}

module.exports = nextConfig
