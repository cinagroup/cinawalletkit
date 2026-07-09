'use client';

import {
  getDefaultConfig,
  CinaWalletKitProvider,
  ConnectButton,
  lightTheme,
  darkTheme,
  midnightTheme,
  type Locale,
} from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';
import { useState } from 'react';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export interface PlaygroundSettings {
  theme: 'light' | 'dark' | 'midnight';
  accentColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  locale: Locale;
  modalSize: 'compact' | 'wide';
  initialChainId: number;
  showRecentTransactions: boolean;
  coolMode: boolean;
  showAppInfo: boolean;
}

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const chains = [mainnet, polygon, optimism, arbitrum, base, sepolia] as const;

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

// This component is dynamically imported (ssr: false) from providers.tsx.
// That ensures WagmiProvider + CinaWalletKitProvider + ConnectButton all
// load in a SEPARATE lazy chunk, only on the client — never during SSR.
// The regex wagmi alias in next.config.js ensures a single wagmi context.
export function Provider({ settings }: { settings: PlaygroundSettings }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  const themeBuilder =
    settings.theme === 'light'
      ? lightTheme
      : settings.theme === 'dark'
        ? darkTheme
        : midnightTheme;

  const resolvedTheme = themeBuilder({
    accentColor: settings.accentColor,
    borderRadius: settings.borderRadius,
    overlayBlur: 'small',
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider
          theme={resolvedTheme}
          locale={settings.locale}
          modalSize={settings.modalSize}
          initialChain={settings.initialChainId}
          showRecentTransactions={settings.showRecentTransactions}
          coolMode={settings.coolMode}
          appInfo={
            settings.showAppInfo
              ? {
                  appName: 'Playground Demo',
                  learnMoreUrl: 'https://cinacoin.com',
                }
              : undefined
          }
        >
          <ConnectButton />
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
