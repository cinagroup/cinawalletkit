const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CINA_BASE_PATH || '',
  reactStrictMode: true,
  // Only transpile cinawalletkit — NOT wagmi.
  transpilePackages: ['@cinagroup/cinawalletkit'],
  // Prevent Next.js from caching HTML for 1 year (s-maxage=31536000).
  // HTML must always be revalidated so new deploys are picked up immediately.
  headers: async () => [
    {
      source: '/',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
    },
  ],
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
