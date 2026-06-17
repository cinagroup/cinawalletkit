import React, {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';
import { useConfig } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { provideCinaWalletKitChains } from './provideCinaWalletKitChains';

export interface CinaWalletKitChain extends Chain {
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

interface CinaWalletKitChainContextValue {
  chains: CinaWalletKitChain[];
  initialChainId?: number;
}

const CinaWalletKitChainContext = createContext<CinaWalletKitChainContextValue>({
  chains: [],
});

interface CinaWalletKitChainProviderProps {
  initialChain?: Chain | number;
  children: ReactNode;
}

export function CinaWalletKitChainProvider({
  children,
  initialChain,
}: CinaWalletKitChainProviderProps) {
  const { chains } = useConfig();

  return (
    <CinaWalletKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideCinaWalletKitChains(chains),
          initialChainId:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }),
        [chains, initialChain],
      )}
    >
      {children}
    </CinaWalletKitChainContext.Provider>
  );
}

export const useCinaWalletKitChains = () =>
  useContext(CinaWalletKitChainContext).chains;

export const useInitialChainId = () =>
  useContext(CinaWalletKitChainContext).initialChainId;

export const useCinaWalletKitChainsById = () => {
  const cinawalletkitChains = useCinaWalletKitChains();

  return useMemo(() => {
    const cinawalletkitChainsById: Record<number, CinaWalletKitChain> = {};

    for (const rkChain of cinawalletkitChains) {
      cinawalletkitChainsById[rkChain.id] = rkChain;
    }

    return cinawalletkitChainsById;
  }, [cinawalletkitChains]);
};
