'use client';

import type React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import Provider with ssr: false to avoid WagmiProviderNotFoundError during SSG.
// This wraps the ENTIRE app at the layout level, so wagmi context is always
// available when any page component renders.
const Provider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false, loading: () => null },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
