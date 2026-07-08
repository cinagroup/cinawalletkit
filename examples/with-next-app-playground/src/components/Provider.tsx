'use client';

import {
  getDefaultConfig,
  CinaWalletKitProvider,
  lightTheme,
  darkTheme,
  midnightTheme,
  type Locale,
} from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { http } from 'wagmi';
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

export function PlaygroundProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: PlaygroundSettings;
}) {
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
        {/* CinaWalletKitProvider MUST be inside WagmiProvider + QueryClientProvider,
            in the SAME component that owns the config — same structure as the
            working with-next-app example. */}
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
          {children}
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
