import '../styles/global.css';
import '@cinagroup/cinawalletkit/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CinaWalletKit Playground',
  description: 'Interactive playground for the CinaWalletKit ConnectButton',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
