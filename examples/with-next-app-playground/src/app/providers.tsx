'use client';

import { Provider, type PlaygroundSettings } from '../components/Provider';

// Direct import (not dynamic). The Provider component uses a mounted-gate
// (useEffect) to avoid SSR rendering, while keeping everything in one chunk.
export function Providers({ settings }: { settings: PlaygroundSettings }) {
  return <Provider settings={settings} />;
}
