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

    // Force wagmi + cinawalletkit into the SAME chunk so WagmiProvider and
    // ConnectButton share one React context at runtime. Without this, webpack
    // splits them → two contexts → WagmiProviderNotFoundError.
    config.optimization = config.optimization || {};
    const prev = config.optimization.splitChunks;
    config.optimization.splitChunks = {
      ...(typeof prev === 'object' ? prev : {}),
      cacheGroups: {
        ...(typeof prev === 'object' ? prev?.cacheGroups : {}),
        wallet: {
          test: /[\\/](node_modules[\\/](wagmi|@wagmi|@tanstack[\\/]react-query)|packages[\\/]cinawalletkit)[\\/]/,
          name: 'wallet',
          chunks: 'all',
          enforce: true,
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;
