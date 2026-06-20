// This example is based on the wagmi SIWE tutorial
// https://wagmi.sh/examples/sign-in-with-ethereum
import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const Provider = dynamic(
  () => import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
