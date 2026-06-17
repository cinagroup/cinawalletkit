import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider, type Locale } from '@cinagroup/cinawalletkit';

import { config } from '../wagmi';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider locale={locale}>
          <Component {...pageProps} />
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
