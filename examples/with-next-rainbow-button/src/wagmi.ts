import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { rainbowConnector } from '@cinagroup/cinawalletkit-button';

export const config = createConfig({
  connectors: [
    rainbowConnector({
      appName: 'CinaWalletKit demo',
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
