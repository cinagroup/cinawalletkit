import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Provider = dynamic(
  () =>
    import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false, loading: () => null },
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
