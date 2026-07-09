const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CINA_BASE_PATH || '',
  reactStrictMode: true,
  transpilePackages: ['@cinagroup/cinawalletkit'],
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

    // CRITICAL: Disable webpack code splitting so that WagmiProvider,
    // CinaWalletKitProvider, and ConnectButton all end up in the SAME chunk.
    // Without this, webpack splits wagmi and cinawalletkit into separate
    // chunks, and they end up using different React context instances at
    // runtime → WagmiProviderNotFoundError.
    if (config.optimization) {
      config.optimization.splitChunks = false;
    }
    config.optimization = config.optimization || {};
    config.optimization.runtimeChunk = undefined;

    return config;
  },
};

module.exports = nextConfig;
