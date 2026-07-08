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

module.exports = nextConfig;
