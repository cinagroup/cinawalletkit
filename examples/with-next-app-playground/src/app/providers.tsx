'use client';

import type React from 'react';
import dynamic from 'next/dynamic';
import type { PlaygroundSettings } from '../components/Provider';

// Dynamic import Provider with ssr: false to avoid WagmiProviderNotFoundError during SSG
const PlaygroundProvider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({
      default: mod.PlaygroundProvider,
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
  return (
    <PlaygroundProvider settings={settings}>{children}</PlaygroundProvider>
  );
}
