import { useCallback, useEffect } from 'react';

const storageKey = 'rk-version';

function setCinaWalletKitVersion({ version }: { version: string }) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, version);
  }
}

export function useFingerprint() {
  const fingerprint = useCallback(() => {
    setCinaWalletKitVersion({ version: '__buildVersion' });
  }, []);
  useEffect(() => {
    fingerprint();
  }, [fingerprint]);
}
