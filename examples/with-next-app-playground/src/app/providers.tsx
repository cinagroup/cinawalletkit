'use client';

import dynamic from 'next/dynamic';
import type { PlaygroundSettings } from '../components/Provider';

// Dynamic import Provider with ssr: false — exactly like with-next-app.
// This ensures WagmiProvider + CinaWalletKitProvider + ConnectButton load
// in a separate lazy chunk, only on the client.
const Provider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({
      default: mod.Provider,
    })),
  { ssr: false, loading: () => null },
);

export function Providers({ settings }: { settings: PlaygroundSettings }) {
  return <Provider settings={settings} />;
}
