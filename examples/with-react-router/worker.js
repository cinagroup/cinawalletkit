// SPA worker for the React Router example.
//
// The app is built in SPA mode (ssr: false), so the whole app is a static
// bundle under build/client. We:
//   1. Optionally strip a BASE_PATH prefix (unused on the subdomain deployment,
//      but kept for parity with the path-based deployment variant).
//   2. Serve the requested static asset from the ASSETS binding.
//   3. Fall back to index.html for unknown non-asset routes so client-side
//      routing works on deep links / refreshes.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const basePath = env.BASE_PATH || '';
    let pathname = url.pathname;

    if (basePath && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || '/';
    }

    const assetUrl = new URL(pathname, url.origin);
    const assetRequest = new Request(assetUrl.toString(), {
      method: request.method,
      headers: request.headers,
    });

    const response = await env.ASSETS.fetch(assetRequest);

    // Serve index.html for unknown routes so client-side routing handles them.
    const isAsset = pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot|map)$/,
    );
    if (response.status === 404 && !isAsset) {
      const indexRequest = new Request(new URL('/index.html', url.origin), {
        method: request.method,
        headers: request.headers,
      });
      return env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
