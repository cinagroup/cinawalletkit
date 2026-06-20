// Static/SSR asset worker that strips a basePath prefix before serving.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const basePath = env.BASE_PATH || '';

    // Strip basePath prefix from pathname
    if (basePath && url.pathname.startsWith(basePath)) {
      url.pathname = url.pathname.slice(basePath.length) || '/';
    }

    // Let Assets binding handle the request with the rewritten URL
    const rewrittenRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
    });
    return env.ASSETS.fetch(rewrittenRequest);
  },
};
