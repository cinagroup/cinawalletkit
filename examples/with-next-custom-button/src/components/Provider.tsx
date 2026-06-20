import { getDefaultConfig } from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider } from '@cinagroup/cinawalletkit';
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

// Lazy initialization via useState ensures config is created in the
// same execution context as the provider, avoiding WagmiProviderNotFoundError during SSG.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
function getConfig() {
  if (!_config) {
    _config = getDefaultConfig({
      appName: 'CinaWalletKit demo',
      projectId,
      chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
      ],
      ssr: true,
    });
  }
  return _config;
}

const queryClient = new QueryClient();

export function Provider({ children }: { children: ReactNode }) {
  const [config] = useState(() => getConfig());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider>
          {children}
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
