const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CINA_BASE_PATH || '',
  reactStrictMode: true,
  // Only transpile cinawalletkit — NOT wagmi.
  transpilePackages: ['@cinagroup/cinawalletkit'],
  webpack(config) {
    // cinawalletkit's pre-built dist has its own wagmi peer dependency.
    // pnpm isolates it to a different physical directory than the app's wagmi.
    // If both are bundled, you get two React contexts → WagmiProviderNotFoundError.
    //
    // Alias ALL wagmi imports (bare + subpaths) to the exact copy under
    // cinawalletkit's node_modules.
    const cwDir = path.dirname(require.resolve('@cinagroup/cinawalletkit'));
    const cwNodeModules = path.resolve(cwDir, '..', 'node_modules');
    const wagmiRoot = path.join(cwNodeModules, 'wagmi');

    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
      // Exact match for 'wagmi' and prefix match for 'wagmi/*' subpaths.
      '^wagmi$': wagmiRoot,
      '^wagmi/(.+)$': path.join(wagmiRoot, '$1'),
    };

    return config;
  },
};

module.exports = nextConfig;
