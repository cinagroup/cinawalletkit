import type { CinaWalletKitWalletConnectParameters } from './Wallet';

interface ComputeMetaDataParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const computeWalletConnectMetaData = ({
  appName,
  appDescription,
  appUrl,
  appIcon,
}: ComputeMetaDataParameters): CinaWalletKitWalletConnectParameters['metadata'] => {
  return {
    name: appName,
    description: appDescription ?? appName,
    url:
      appUrl ?? (typeof window !== 'undefined' ? window.location.origin : ''),
    icons: [...(appIcon ? [appIcon] : [])],
  };
};
