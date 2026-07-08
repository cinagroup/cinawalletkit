'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@cinagroup/cinawalletkit';

export interface PlaygroundSettings {
  theme: 'light' | 'dark' | 'midnight';
  accentColor: string;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  locale: Locale;
  modalSize: 'compact' | 'wide';
  initialChainId: number;
  showRecentTransactions: boolean;
  coolMode: boolean;
  showAppInfo: boolean;
}

export const defaultSettings: PlaygroundSettings = {
  theme: 'light',
  accentColor: '#0b2a4a',
  borderRadius: 'large',
  locale: 'en-US',
  modalSize: 'compact',
  initialChainId: 1,
  showRecentTransactions: true,
  coolMode: false,
  showAppInfo: true,
};

export const SettingsContext =
  createContext<PlaygroundSettings>(defaultSettings);

export function useSettings() {
  return useContext(SettingsContext);
}
