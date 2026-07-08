'use client';

import { getDefaultConfig } from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const chains = [mainnet, polygon, optimism, arbitrum, base, sepolia] as const;

// Lazy initialization via useState ensures config is created in the
// same execution context as the provider, avoiding WagmiProviderNotFoundError.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
function getConfig() {
  if (!_config) {
    const transports = Object.fromEntries(chains.map((c) => [c.id, http()]));
    _config = getDefaultConfig({
      appName: 'CinaWalletKit Playground',
      projectId,
      chains: [...chains],
      transports,
      ssr: true,
    });
  }
  return _config;
}

// Layout-level provider: WagmiProvider + QueryClientProvider only.
// This is dynamically imported with ssr:false in the layout, exactly like
// with-next-app. The page renders CinaWalletKitProvider + ConnectButton as
// children of this provider, so wagmi context is always available.
export function Provider({ children }: { children: ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
