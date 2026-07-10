'use client';

import {
  getDefaultConfig,
  CinaWalletKitProvider,
  lightTheme,
  darkTheme,
  midnightTheme,
} from '@cinagroup/cinawalletkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';
import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import type { PlaygroundSettings } from './types';
import { ACCENT_COLORS, DEFAULT_SETTINGS } from './types';

// Context for the page to push settings into the layout-level Provider.
const SettingsContext = createContext<{
  settings: PlaygroundSettings;
  setSettings: (s: PlaygroundSettings) => void;
}>({ settings: DEFAULT_SETTINGS, setSettings: () => {} });

export function usePlaygroundSettings() {
  return useContext(SettingsContext);
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

// EXACT same structure as with-next-app's Provider:
// WagmiProvider → QueryClientProvider → CinaWalletKitProvider → {children}
// The page renders ConnectButton as {children}, passed through from the layout.
export function Provider({ children }: { children: ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [settings, setSettings] =
    useState<PlaygroundSettings>(DEFAULT_SETTINGS);

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
    <SettingsContext.Provider value={{ settings, setSettings }}>
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
            {children}
          </CinaWalletKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SettingsContext.Provider>
  );
}
