import { getDefaultConfig, getDefaultWallets } from '@cinagroup/cinawalletkit';
import {
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  readyWallet,
  trustWallet,
} from '@cinagroup/cinawalletkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { useState } from 'react';
import { http, WagmiProvider } from 'wagmi';
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  mainnet,
  optimism,
  polygon,
  scroll,
  mantle,
  zora,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [bsc.id]: http(),
  [avalanche.id]: http(),
  [scroll.id]: http(),
  [mantle.id]: http(),
  [zora.id]: http(),
  [blast.id]: http(),
};

const { wallets } = getDefaultWallets();

// Use a module-level config with stable reference
// Next.js 16 parallel SSG workers each get their own module instance,
// but WagmiProvider + useConfig must share the same wagmi context.
// Lazy initialization via useState ensures config is created in the
// same execution context as the provider.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
function getConfig() {
  if (!_config) {
    _config = getDefaultConfig({
      appName: 'CinaWalletKit.com',
      projectId,
      chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        bsc,
        avalanche,
        scroll,
        mantle,
        zora,
        blast,
      ],
      transports,
      wallets: [
        ...wallets,
        {
          groupName: 'More',
          wallets: [
            readyWallet,
            trustWallet,
            omniWallet,
            imTokenWallet,
            ledgerWallet,
          ],
        },
      ],
      ssr: true,
    });
  }
  return _config;
}

const client = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  const [config] = useState(() => getConfig());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
