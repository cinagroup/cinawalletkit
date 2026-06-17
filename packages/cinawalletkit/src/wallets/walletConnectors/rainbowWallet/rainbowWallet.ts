import { isAndroid, isIOS } from '../../../utils/isMobile';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';

export type RainbowWalletOptions = DefaultWalletOptions;

export const rainbowWallet = ({
  projectId,
  walletConnectParameters,
}: RainbowWalletOptions): Wallet => {
  const isRainbowInjected = hasInjectedProvider({ flag: 'isRainbow' });
  const shouldUseWalletConnect = !isRainbowInjected;

  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : isIOS()
        ? `rainbow://wc?uri=${encodeURIComponent(uri)}&connector=cinawalletkit`
        : `https://rnbwapp.com/wc?uri=${encodeURIComponent(
            uri,
          )}&connector=cinawalletkit`;
  };

  return {
    id: 'rainbow',
    name: 'Rainbow',
    rdns: 'me.rainbow',
    iconUrl: async () => (await import('./rainbowWallet.svg')).default,
    iconBackground: '#0c2f78',
    installed: !shouldUseWalletConnect ? isRainbowInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Dcinawalletkit&utm_source=cinawalletkit',
      ios: 'https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=cinawalletkit&mt=8',
      mobile: 'https://rainbow.download?utm_source=cinawalletkit',
      qrCode:
        'https://rainbow.download?utm_source=cinawalletkit&utm_medium=qrcode',
      browserExtension: 'https://rainbow.me/extension?utm_source=cinawalletkit',
    },
    mobile: { getUri: shouldUseWalletConnect ? getUri : undefined },
    qrCode: shouldUseWalletConnect
      ? {
          getUri,
          instructions: {
            learnMoreUrl:
              'https://learn.rainbow.me/connect-to-a-website-or-app?utm_source=cinawalletkit&utm_medium=connector&utm_campaign=learnmore',
            steps: [
              {
                description:
                  'wallet_connectors.rainbow.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.rainbow.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.rainbow.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.rainbow.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.rainbow.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.rainbow.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,

    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ flag: 'isRainbow' }),
  };
};
