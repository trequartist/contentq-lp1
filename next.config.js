/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // disable caching in dev to avoid corrupt writes
    }
    return config;
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
