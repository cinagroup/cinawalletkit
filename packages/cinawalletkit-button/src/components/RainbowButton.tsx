import {
  CinaWalletKitProvider,
  type CinaWalletKitProviderProps,
  WalletButton,
} from '@cinagroup/cinawalletkit';
import React from 'react';

export function RainbowButtonProvider({
  children,
  ...options
}: Omit<
  CinaWalletKitProviderProps,
  'chains' | 'avatar' | 'initialChain' | 'modalSize' | 'showRecentTransactions'
>) {
  return <CinaWalletKitProvider {...options}>{children}</CinaWalletKitProvider>;
}

export const RainbowButton = () => {
  return <WalletButton wallet="rainbow" />;
};

RainbowButton.Custom = WalletButton.Custom;
