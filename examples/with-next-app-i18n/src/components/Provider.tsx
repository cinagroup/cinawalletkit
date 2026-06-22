'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider, type Locale } from '@cinagroup/cinawalletkit';
import type React from 'react';
import { useState } from 'react';
import { getConfig } from '../wagmi';

export function Provider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider locale={locale}>
          {children}
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
