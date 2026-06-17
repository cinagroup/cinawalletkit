import '../styles/globals.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider } from '@cinagroup/cinawalletkit';

import { config } from '../wagmi';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <CinaWalletKitProvider>
          <Component {...pageProps} />
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
