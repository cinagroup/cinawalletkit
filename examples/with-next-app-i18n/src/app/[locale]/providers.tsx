'use client';

import type React from 'react';
import dynamic from 'next/dynamic';
import type { Locale } from '@cinagroup/cinawalletkit';

// Dynamic import Provider with ssr: false to avoid WagmiProviderNotFoundError during SSG
const Provider = dynamic(
  () =>
    import('../../components/Provider').then((mod) => ({
      default: mod.Provider,
    })),
  { ssr: false },
);

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return <Provider locale={locale}>{children}</Provider>;
}
