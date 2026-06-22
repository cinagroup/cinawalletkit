import type { Config } from '@react-router/dev/config';

export default {
  // SPA mode: render fully client-side. The app is a single-page wallet demo,
  // so SSR adds no value, and deploying a static bundle to Cloudflare Workers
  // (mirroring the with-vite / with-create-react-app examples) is simpler and
  // more robust than wiring up the @react-router/cloudflare SSR adapter.
  ssr: false,
} satisfies Config;
