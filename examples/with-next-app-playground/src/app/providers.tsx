'use client';

import type React from 'react';
import dynamic from 'next/dynamic';
import type { PlaygroundSettings } from '../components/Provider';

// Dynamic import Provider with ssr: false — same pattern as with-next-app.
const Provider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({
      default: mod.Provider,
    })),
  { ssr: false, loading: () => null },
);

export function Providers({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: PlaygroundSettings;
}) {
  return <Provider settings={settings}>{children}</Provider>;
}
