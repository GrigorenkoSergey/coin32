/** @type {import('next').NextConfig} */

const nextConfig = {
  // very strange behavior with hook useEffect in strict mode:
  // it works twice and runs unmount function when mounted for the first time
  reactStrictMode: false,
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
