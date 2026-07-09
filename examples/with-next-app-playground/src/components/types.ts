// Pure types and static data — NO wagmi or cinawalletkit imports.
// This file is safe to import from both the page and the Provider
// without pulling wagmi/cinawalletkit into the page's chunk.

export type ThemeKey = 'light' | 'dark' | 'midnight';
export type AccentKey = 'blue' | 'purple' | 'green' | 'orange';
export type RadiusKey = 'none' | 'small' | 'medium' | 'large';
export type LocaleValue = string;

export interface PlaygroundSettings {
  theme: ThemeKey;
  accent: AccentKey;
  radius: RadiusKey;
  locale: LocaleValue;
  modalSize: 'compact' | 'wide';
  initialChainId: number;
  showRecentTransactions: boolean;
  coolMode: boolean;
  showAppInfo: boolean;
}

export const DEFAULT_SETTINGS: PlaygroundSettings = {
  theme: 'light',
  accent: 'blue',
  radius: 'large',
  locale: 'en-US',
  modalSize: 'compact',
  initialChainId: 1,
  showRecentTransactions: true,
  coolMode: false,
  showAppInfo: true,
};

export const CHAIN_OPTIONS = [
  { key: 'Ethereum', id: 1 },
  { key: 'Polygon', id: 137 },
  { key: 'Optimism', id: 10 },
  { key: 'Arbitrum', id: 42161 },
  { key: 'Base', id: 8453 },
  { key: 'Sepolia', id: 11155111 },
] as const;

export const ACCENT_COLORS: Record<AccentKey, string> = {
  blue: '#0b2a4a',
  purple: '#6e3aff',
  green: '#0d7d4a',
  orange: '#e0611f',
};

export const LOCALE_OPTIONS: { value: string; label: string }[] = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
  { value: 'es-419', label: 'Español' },
  { value: 'ja-JP', label: '日本語' },
  { value: 'ko-KR', label: '한국어' },
  { value: 'de-DE', label: 'Deutsch' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'pt-BR', label: 'Português' },
];
