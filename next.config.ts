import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['fakestoreapi.com'],
  },
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
