import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamic import Provider with ssr: false to avoid WagmiProviderNotFoundError during SSG
const Provider = dynamic(
  () => import('../components/Provider').then(mod => ({ default: mod.Provider })),
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: string };
  return (
    <Provider locale={locale}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
