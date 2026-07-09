'use client';

import {
  getDefaultConfig,
  CinaWalletKitProvider,
  ConnectButton,
  lightTheme,
  darkTheme,
  midnightTheme,
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
import type { PlaygroundSettings } from './types';
import { ACCENT_COLORS } from './types';

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
// ALL wagmi + cinawalletkit imports live in THIS file only.
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
    accentColor: ACCENT_COLORS[settings.accent],
    borderRadius: settings.radius,
    overlayBlur: 'small',
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider
          theme={resolvedTheme}
          locale={settings.locale as never}
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
