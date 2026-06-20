import { getDefaultConfig } from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { useState } from 'react';
import { http, WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';
import { CinaWalletKitProvider, type Locale } from '@cinagroup/cinawalletkit';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
};

// Lazy initialization via useState ensures config is created in the
// same execution context as the provider, avoiding WagmiProviderNotFoundError.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
function getConfig() {
  if (!_config) {
    _config = getDefaultConfig({
      appName: 'CinaWalletKit demo',
      projectId,
      chains: [mainnet, polygon, optimism, arbitrum, base],
      transports,
      ssr: true,
    });
  }
  return _config;
}

const queryClient = new QueryClient();

export function Provider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const [config] = useState(() => getConfig());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider locale={locale as Locale}>
          {children}
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
