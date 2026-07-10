'use client';

import type React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import Provider with ssr: false — exactly like with-next-app.
// Provider wraps children with WagmiProvider + CinaWalletKitProvider.
const Provider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false, loading: () => null },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
