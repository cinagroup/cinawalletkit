'use client';

import type React from 'react';
import dynamic from 'next/dynamic';

const Provider = dynamic(
  () => import('../components/Provider').then((mod) => ({ default: mod.Provider })),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
