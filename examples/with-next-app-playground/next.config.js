const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.CINA_BASE_PATH || '',
  reactStrictMode: true,
  // Only transpile cinawalletkit — NOT wagmi. If wagmi is in transpilePackages,
  // webpack bundles it twice (once for the app's direct imports, once inside
  // cinawalletkit's dist), creating two React contexts and causing
  // WagmiProviderNotFoundError.
  transpilePackages: ['@cinagroup/cinawalletkit'],
  webpack(config) {
    // Force ALL wagmi imports to resolve to the single copy under
    // cinawalletkit's node_modules, eliminating module duplication.
    const cwDir = path.dirname(require.resolve('@cinagroup/cinawalletkit'));
    const wagmiPath = path.resolve(cwDir, '..', 'node_modules', 'wagmi');
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };
    // Use resolve.modules to prepend cinawalletkit's node_modules
    config.resolve.modules = [
      path.resolve(cwDir, '..', 'node_modules'),
      ...(config.resolve.modules || ['node_modules']),
    ];
    return config;
  },
};

module.exports = nextConfig;
