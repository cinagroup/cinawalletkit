/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  // Build for Cloudflare Workers:
  // - ESM module format so the worker entry (worker/server.ts) can import it.
  // - The Cloudflare runtime is handled by @remix-run/cloudflare (loaded in the
  //   worker entry), so we leave the default node platform for the Remix build.
  serverModuleFormat: 'esm',
  serverBuildPath: 'build/index.js',
  future: {
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_lazyRouteDiscovery: true,
    v3_singleFetch: true,
    v3_fetcherPersist: true,
  },
  browserNodeBuiltinsPolyfill: {
    modules: { buffer: true, events: true, http: true },
  },
  serverDependenciesToBundle: ['@base-org/account', /^@base-org\/account\/.*/],
};
