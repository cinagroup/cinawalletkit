const createNextIntlPlugin = require('next-intl/plugin');

// Explicitly specify the i18n config path for Turbopack compatibility
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
  const nextConfig = {
    basePath: process.env.CINA_BASE_PATH || '',
    reactStrictMode: true,
  transpilePackages: [
    '@cinagroup/cinawalletkit',
    'wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
