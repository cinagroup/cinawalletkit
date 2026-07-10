const path = require('path');

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
  headers: async () => [
    {
      source: '/',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
      ],
    },
  ],
  webpack(config) {
    const cwDir = path.dirname(require.resolve('@cinagroup/cinawalletkit'));
    const cwNodeModules = path.resolve(cwDir, '..', 'node_modules');
    const wagmiRoot = path.join(cwNodeModules, 'wagmi');

    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
      '^wagmi$': wagmiRoot,
      '^wagmi/(.+)$': path.join(wagmiRoot, '$1'),
    };

    return config;
  },
};

module.exports = nextConfig;
