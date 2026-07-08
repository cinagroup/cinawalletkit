'use client';

import { useState } from 'react';
import type { Locale } from '@cinagroup/cinawalletkit';
import type { Chain } from 'wagmi/chains';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { ConfigPanel } from '../components/ConfigPanel';
import { WalletPreviewWrapper } from './providers';
import type { PlaygroundSettings } from '../components/Provider';

type ThemeKey = 'light' | 'dark' | 'midnight';
type AccentKey = 'blue' | 'purple' | 'green' | 'orange';
type RadiusKey = 'none' | 'small' | 'medium' | 'large';

const CHAINS: Record<string, Chain> = {
  Ethereum: mainnet,
  Polygon: polygon,
  Optimism: optimism,
  Arbitrum: arbitrum,
  Base: base,
  Sepolia: sepolia,
};

const ACCENTS: Record<AccentKey, string> = {
  blue: '#0b2a4a',
  purple: '#6e3aff',
  green: '#0d7d4a',
  orange: '#e0611f',
};

const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
  { value: 'es-419', label: 'Español' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' },
  { value: 'de-DE', label: 'Deutsch' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'pt-BR', label: 'Português' },
];

export default function Page() {
  // Playground state — drives the live Provider preview.
  const [theme, setTheme] = useState<ThemeKey>('light');
  const [accent, setAccent] = useState<AccentKey>('blue');
  const [radius, setRadius] = useState<RadiusKey>('large');
  const [locale, setLocale] = useState<Locale>('en-US');
  const [modalSize, setModalSize] = useState<'compact' | 'wide'>('compact');
  const [initialChainKey, setInitialChainKey] = useState<string>('Ethereum');
  const [showRecentTxs, setShowRecentTxs] = useState(true);
  const [coolMode, setCoolMode] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(true);

  const settings: PlaygroundSettings = {
    theme,
    accentColor: ACCENTS[accent],
    borderRadius: radius,
    locale,
    modalSize,
    initialChainId: CHAINS[initialChainKey].id,
    showRecentTransactions: showRecentTxs,
    coolMode,
    showAppInfo,
  };

  return (
    <div style={styles.layout}>
      {/* Left: configuration panel */}
      <aside style={styles.sidebar}>
        <header style={styles.sidebarHeader}>
          <h1 style={styles.title}>⚡ Playground</h1>
          <p style={styles.subtitle}>
            Configure CinaWalletKit and preview live. Like{' '}
            <a
              href="https://demo.reown.com"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              demo.reown.com
            </a>
            .
          </p>
        </header>

        <ConfigPanel
          theme={theme}
          setTheme={setTheme}
          accent={accent}
          setAccent={setAccent}
          radius={radius}
          setRadius={setRadius}
          locale={locale}
          setLocale={setLocale}
          modalSize={modalSize}
          setModalSize={setModalSize}
          initialChainKey={initialChainKey}
          setInitialChainKey={setInitialChainKey}
          showRecentTxs={showRecentTxs}
          setShowRecentTxs={setShowRecentTxs}
          coolMode={coolMode}
          setCoolMode={setCoolMode}
          showAppInfo={showAppInfo}
          setShowAppInfo={setShowAppInfo}
          chains={CHAINS}
          locales={LOCALES}
        />

        <footer style={styles.footer}>
          <a
            href="https://www.cinawalletkit.com/docs/introduction"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Docs ↗
          </a>
        </footer>
      </aside>

      {/* Right: live preview.
          WalletPreview is dynamically imported (ssr:false) and contains
          WagmiProvider + CinaWalletKitProvider + ConnectButton in ONE module,
          so they share the same wagmi context. */}
      <main style={styles.preview}>
        <div style={styles.previewToolbar}>
          <span style={styles.badge}>LIVE PREVIEW</span>
        </div>
        <div style={styles.previewStage}>
          <WalletPreviewWrapper settings={settings} />
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    minHeight: '100vh',
  },
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #e6e8eb',
    padding: '24px 20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  sidebarHeader: { paddingBottom: 16, borderBottom: '1px solid #eef0f2' },
  title: { margin: 0, fontSize: 20, fontWeight: 700 },
  subtitle: {
    margin: '6px 0 0',
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  link: { color: '#3b82f6', textDecoration: 'none' },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTop: '1px solid #eef0f2',
    fontSize: 12,
    color: '#9ca3af',
  },
  preview: { display: 'flex', flexDirection: 'column' },
  previewToolbar: {
    padding: '12px 24px',
    borderBottom: '1px solid #e6e8eb',
    background: '#fff',
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#0d7d4a',
    background: '#dcfce7',
    padding: '3px 8px',
    borderRadius: 6,
  },
  previewStage: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 24,
    gap: 16,
  },
} as const;
