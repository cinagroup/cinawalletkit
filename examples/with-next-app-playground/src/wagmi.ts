import { getDefaultConfig } from '@cinagroup/cinawalletkit';
import { http } from 'wagmi';
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

// All chains selectable in the playground.
export const CHAINS = {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} as const;

export type ChainKey = keyof typeof CHAINS;

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [sepolia.id]: http(),
};

// Lazy initialization via useState ensures config is created in the
// same execution context as the provider, avoiding WagmiProviderNotFoundError.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
export function getConfig() {
  if (!_config) {
    _config = getDefaultConfig({
      appName: 'CinaWalletKit Playground',
      projectId,
      chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
      transports,
      ssr: true,
    });
  }
  return _config;
}
