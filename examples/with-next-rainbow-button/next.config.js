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
};

module.exports = nextConfig;
