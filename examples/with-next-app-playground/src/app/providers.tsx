'use client';

import dynamic from 'next/dynamic';
import type { PlaygroundSettings } from '../components/Provider';

// Dynamic import WalletPreview with ssr: false. This component bundles
// WagmiProvider + CinaWalletKitProvider + ConnectButton in ONE module,
// guaranteeing they share the same wagmi context instance.
const WalletPreview = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({
      default: mod.WalletPreview,
    })),
  { ssr: false, loading: () => null },
);

export function WalletPreviewWrapper({
  settings,
}: {
  settings: PlaygroundSettings;
}) {
  return <WalletPreview settings={settings} />;
}
