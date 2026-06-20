// Static asset worker for CRA
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    
    // Handle root path - serve index.html
    if (pathname === '/' || pathname === '') {
      pathname = '/index.html';
    }
    
    // Try to serve the requested file
    const assetUrl = new URL(pathname, url.origin);
    const assetRequest = new Request(assetUrl.toString(), {
      method: request.method,
      headers: request.headers,
    });
    
    const response = await env.ASSETS.fetch(assetRequest);
    
    // If file not found and it's not a static asset, serve index.html for client-side routing
    if (response.status === 404 && !pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff|woff2|ttf|eot)$/)) {
      const indexPath = new URL('/index.html', url.origin);
      const indexRequest = new Request(indexPath.toString(), {
        method: request.method,
        headers: request.headers,
      });
      return env.ASSETS.fetch(indexRequest);
    }
    
    return response;
  },
};
