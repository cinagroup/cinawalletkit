'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import type { ReactNode } from 'react';
import { config } from '../wagmi';

const queryClient = new QueryClient();

export function Provider({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}