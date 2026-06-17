import { mainnet } from 'wagmi/chains';
import { useCinaWalletKitChains } from '../components/CinaWalletKitProvider/CinaWalletKitChainContext';

export function useIsMainnetConfigured() {
  const CinaWalletKitChains = useCinaWalletKitChains();

  const chainId = mainnet.id;

  const configured = CinaWalletKitChains.some(
    (CinaWalletKitChain) => CinaWalletKitChain.id === chainId,
  );

  return configured;
}
