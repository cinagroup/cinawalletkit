'use client';

import type React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider } from '@cinagroup/cinawalletkit';
import {
  CinaWalletKitSiweNextAuthProvider,
  type GetSiweMessageOptions,
} from '@cinagroup/cinawalletkit-siwe-next-auth';

import { config } from '../wagmi';

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to the CinaWalletKit + SIWE example app',
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <CinaWalletKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <CinaWalletKitProvider>{children}</CinaWalletKitProvider>
          </CinaWalletKitSiweNextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
