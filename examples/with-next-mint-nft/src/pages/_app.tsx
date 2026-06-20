import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const Provider = dynamic(
  () => import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
