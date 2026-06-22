import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (e.g. /_next, /_vercel)
  // - Static files (with a file extension)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

const handleI18nRouting = createMiddleware(routing);

// Note: this file is named `middleware.ts` (not `proxy.ts`) because OpenNext's
// Cloudflare adapter does not yet support Next.js 16's `proxy.ts` rename and
// requires Edge-based middleware. The classic `middleware.ts` naming runs on the
// Edge Runtime, which is what Cloudflare Workers supports.
export default function middleware(request: NextRequest) {
  return handleI18nRouting(request);
}
