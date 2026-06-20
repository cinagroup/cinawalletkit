import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowButtonProvider } from '@cinagroup/cinawalletkit-button';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { rainbowConnector } from '@cinagroup/cinawalletkit-button';

// Lazy initialization via useState ensures config is created in the
// same execution context as the provider, avoiding WagmiProviderNotFoundError during SSG.
let _config: ReturnType<typeof createConfig> | undefined;
function getConfig() {
  if (!_config) {
    _config = createConfig({
      connectors: [
        rainbowConnector({
          appName: 'CinaWalletKit demo',
          projectId: 'YOUR_PROJECT_ID',
        }),
      ],
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
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
        <RainbowButtonProvider>
          {children}
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
