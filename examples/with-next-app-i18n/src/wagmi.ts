import { getDefaultConfig } from '@cinagroup/cinawalletkit';
import { http } from 'wagmi';
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
};

// Created lazily inside the Provider (see Provider.tsx) via useState so the
// wagmi config lives in the same execution context as the provider that owns
// it, avoiding WagmiProviderNotFoundError.
let _config: ReturnType<typeof getDefaultConfig> | undefined;
export function getConfig() {
  if (!_config) {
    _config = getDefaultConfig({
      appName: 'CinaWalletKit demo',
      projectId,
      chains: [mainnet, polygon, optimism, arbitrum, base],
      transports,
      ssr: true,
    });
  }
  return _config;
}
