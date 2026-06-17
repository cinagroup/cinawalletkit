'use client';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider } from '@cinagroup/cinawalletkit';

import { config } from './wagmi';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider>{children}</CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
