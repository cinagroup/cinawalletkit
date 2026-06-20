/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CINA_BASE_PATH || '',
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: [
    '@cinagroup/cinawalletkit',
    'wagmi',
    '@wagmi/core',
    '@wagmi/connectors',
  ],
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
