import { useState } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';

import {
  CinaWalletKitProvider,
  ConnectButton,
  getDefaultConfig,
} from '@cinagroup/cinawalletkit';
import { WagmiProvider } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

import globalStylesUrl from './styles/global.css';
import rainbowStylesUrl from '@cinagroup/cinawalletkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Env = { PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'CinaWalletKit Remix Example',
    viewport: 'width=device-width,initial-scale=1',
  },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: rainbowStylesUrl },
];

// Reads PUBLIC_ENABLE_TESTNETS from the Remix load context. On Cloudflare
// Workers, process.env is unavailable, so the Worker's server entry passes the
// value in via the load context (see worker/server.ts).
export const loader: LoaderFunction = ({ context }) => {
  const ctx = (context ?? {}) as Partial<Env>;
  const data: LoaderData = {
    ENV: {
      PUBLIC_ENABLE_TESTNETS: ctx.PUBLIC_ENABLE_TESTNETS || 'false',
    },
  };

  return json(data);
};

const queryClient = new QueryClient();

export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  // Remix modules cannot have side effects so the initialization of `wagmi`
  // client happens during render, but the result is cached via `useState`
  // and a lazy initialization function.
  // See: https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects
  const [{ config, chains }] = useState(() => {
    const testChains = ENV.PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [];

    const chains: readonly [Chain, ...Chain[]] = [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      ...testChains,
    ];

    const config = getDefaultConfig({
      appName: 'CinaWalletKit Remix Example',
      projectId: 'YOUR_PROJECT_ID',
      chains,
      ssr: true,
    });

    return {
      config,
      chains,
    };
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {config && chains ? (
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <CinaWalletKitProvider>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '12px',
                  }}
                >
                  <ConnectButton />
                </div>
              </CinaWalletKitProvider>
              <Outlet />
            </QueryClientProvider>
          </WagmiProvider>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
