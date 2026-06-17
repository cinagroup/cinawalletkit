import './global.css';
import '@cinagroup/cinawalletkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { CinaWalletKitProvider } from '@cinagroup/cinawalletkit';

import App from './App';
import { config } from './wagmi';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CinaWalletKitProvider>
          <App />
        </CinaWalletKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
