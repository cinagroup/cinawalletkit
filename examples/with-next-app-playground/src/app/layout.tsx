import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'CinaWalletKit Playground',
  description: 'Interactive playground for the CinaWalletKit ConnectButton',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
