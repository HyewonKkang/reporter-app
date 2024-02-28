const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/:path*`,
      },
      {
        source: '/authapi/:path*',
        destination: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_TENTH_HOST,
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
