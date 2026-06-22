import { createRequestHandler } from '@remix-run/cloudflare';
import type { ServerBuild, AppLoadContext } from '@remix-run/cloudflare';

// The Remix server build (ESM, compiled by `remix build`).
import * as build from '../build/index.js';

const remixHandler = createRequestHandler(
  build as unknown as ServerBuild,
  'production',
);

interface Env {
  ASSETS: Fetcher;
  PUBLIC_ENABLE_TESTNETS?: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Serve hashed static assets from public/build/* via the Workers Assets
    // binding first. These never need to go through the Remix handler.
    if (url.pathname.startsWith('/build/')) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    // Expose Workers env vars to Remix loaders via the load context.
    const loadContext: AppLoadContext = {
      PUBLIC_ENABLE_TESTNETS: env.PUBLIC_ENABLE_TESTNETS || 'false',
    };

    try {
      return await remixHandler(request, loadContext);
    } catch (error) {
      console.error('Remix handler error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
