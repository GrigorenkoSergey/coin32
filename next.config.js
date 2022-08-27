/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

      config.resolve.alias = {
    ...config.resolve.alias,
      '@/components': ['components'],
      '@/utils': ['utils'],
      '@/utils/*': ['utils/*'],
      '@/icons': ['public/icons'],
      '@/icons/*': ['public/icons/*'],
  };
    return config;
  },

  images: { domains: ['media.rawg.io'] }
};

module.exports = nextConfig;
