'use client';

import { useState } from 'react';
import { ConfigPanel } from '../components/ConfigPanel';
import { Providers } from './providers';
import {
  DEFAULT_SETTINGS,
  CHAIN_OPTIONS,
  LOCALE_OPTIONS,
  ACCENT_COLORS,
  type PlaygroundSettings,
  type ThemeKey,
  type AccentKey,
  type RadiusKey,
} from '../components/types';

export default function Page() {
  const [settings, setSettings] =
    useState<PlaygroundSettings>(DEFAULT_SETTINGS);

  const update = <K extends keyof PlaygroundSettings>(
    key: K,
    value: PlaygroundSettings[K],
  ) => setSettings((prev) => ({ ...prev, [key]: value }));

  // Build the swatch data from ACCENT_COLORS (defined in Provider module)
  const accentSwatches = (Object.keys(ACCENT_COLORS) as AccentKey[]).map(
    (k) => ({
      value: k,
      color: ACCENT_COLORS[k],
    }),
  );

  return (
    <div style={styles.layout}>
      {/* Left: configuration panel */}
      <aside style={styles.sidebar}>
        <header style={styles.sidebarHeader}>
          <h1 style={styles.title}>Playground</h1>
          <p style={styles.subtitle}>
            Configure CinaWalletKit and preview live.{' '}
            <a
              href="https://demo.reown.com"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              Like demo.reown.com
            </a>
          </p>
        </header>

        <ConfigPanel
          theme={settings.theme}
          setTheme={(v) => update('theme', v as ThemeKey)}
          accent={settings.accent}
          setAccent={(v) => update('accent', v as AccentKey)}
          radius={settings.radius}
          setRadius={(v) => update('radius', v as RadiusKey)}
          locale={settings.locale}
          setLocale={(v) => update('locale', v as PlaygroundSettings['locale'])}
          modalSize={settings.modalSize}
          setModalSize={(v) => update('modalSize', v as 'compact' | 'wide')}
          initialChainKey={
            CHAIN_OPTIONS.find((c) => c.id === settings.initialChainId)?.key ??
            CHAIN_OPTIONS[0].key
          }
          setInitialChainKey={(v) => {
            const chain = CHAIN_OPTIONS.find((c) => c.key === v);
            if (chain) update('initialChainId', chain.id);
          }}
          showRecentTxs={settings.showRecentTransactions}
          setShowRecentTxs={(v) => update('showRecentTransactions', v)}
          coolMode={settings.coolMode}
          setCoolMode={(v) => update('coolMode', v)}
          showAppInfo={settings.showAppInfo}
          setShowAppInfo={(v) => update('showAppInfo', v)}
          chainOptions={CHAIN_OPTIONS.map((c) => ({
            key: c.key,
            label: c.key,
          }))}
          localeOptions={LOCALE_OPTIONS}
          accentSwatches={accentSwatches}
        />

        <footer style={styles.footer}>
          <a
            href="https://www.cinawalletkit.com/docs/introduction"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Docs
          </a>
        </footer>
      </aside>

      {/* Right: live preview */}
      <main style={styles.preview}>
        <div style={styles.previewToolbar}>
          <span style={styles.badge}>LIVE PREVIEW</span>
        </div>
        <div style={styles.previewStage}>
          <Providers settings={settings} />
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
    flexDirection: 'column' as const,
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
  preview: { display: 'flex', flexDirection: 'column' as const },
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
