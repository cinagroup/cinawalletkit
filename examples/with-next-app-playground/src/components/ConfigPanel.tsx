'use client';

import type { ThemeKey, AccentKey, RadiusKey } from './types';

interface ConfigPanelProps {
  theme: ThemeKey;
  setTheme: (v: ThemeKey) => void;
  accent: AccentKey;
  setAccent: (v: AccentKey) => void;
  radius: RadiusKey;
  setRadius: (v: RadiusKey) => void;
  locale: string;
  setLocale: (v: string) => void;
  modalSize: 'compact' | 'wide';
  setModalSize: (v: 'compact' | 'wide') => void;
  initialChainKey: string;
  setInitialChainKey: (v: string) => void;
  showRecentTxs: boolean;
  setShowRecentTxs: (v: boolean) => void;
  coolMode: boolean;
  setCoolMode: (v: boolean) => void;
  showAppInfo: boolean;
  setShowAppInfo: (v: boolean) => void;
  chainOptions: readonly { key: string; label: string }[];
  localeOptions: { value: string; label: string }[];
  accentSwatches: { value: AccentKey; color: string }[];
}

export function ConfigPanel(props: ConfigPanelProps) {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    radius,
    setRadius,
    locale,
    setLocale,
    modalSize,
    setModalSize,
    initialChainKey,
    setInitialChainKey,
    showRecentTxs,
    setShowRecentTxs,
    coolMode,
    setCoolMode,
    showAppInfo,
    setShowAppInfo,
    chainOptions,
    localeOptions,
    accentSwatches,
  } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Section title="Theme">
        <RadioRow
          name="theme"
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'midnight', label: 'Midnight' },
          ]}
          value={theme}
          onChange={(v) => setTheme(v as ThemeKey)}
        />
      </Section>

      <Section title="Accent color">
        <SwatchRow
          options={accentSwatches}
          value={accent}
          onChange={(v) => setAccent(v as AccentKey)}
        />
      </Section>

      <Section title="Border radius">
        <RadioRow
          name="radius"
          options={[
            { value: 'none', label: 'None' },
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
          value={radius}
          onChange={(v) => setRadius(v as RadiusKey)}
        />
      </Section>

      <Section title="Locale">
        <Select value={locale} onChange={setLocale} options={localeOptions} />
      </Section>

      <Section title="Modal size">
        <RadioRow
          name="modalSize"
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'wide', label: 'Wide' },
          ]}
          value={modalSize}
          onChange={(v) => setModalSize(v as 'compact' | 'wide')}
        />
      </Section>

      <Section title="Initial network">
        <Select
          value={initialChainKey}
          onChange={setInitialChainKey}
          options={chainOptions.map((c) => ({ value: c.key, label: c.label }))}
        />
      </Section>

      <Section title="Features">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Check
            label="Show recent transactions"
            checked={showRecentTxs}
            onChange={setShowRecentTxs}
          />
          <Check label="Cool mode" checked={coolMode} onChange={setCoolMode} />
          <Check
            label="Show app info header"
            checked={showAppInfo}
            onChange={setShowAppInfo}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset style={fieldStyle}>
      <legend style={legendStyle}>{title}</legend>
      {children}
    </fieldset>
  );
}

function RadioRow({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map((o) => (
        <label key={o.value} style={radioLabelStyle}>
          <input
            type="radio"
            name={name}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            style={{ marginRight: 5 }}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function SwatchRow({
  options,
  value,
  onChange,
}: {
  options: { value: string; color: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.value}
          onClick={() => onChange(o.value)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            cursor: 'pointer',
            border:
              value === o.value ? '2px solid #111' : '2px solid transparent',
            background: o.color,
            boxShadow: value === o.value ? '0 0 0 2px #fff inset' : 'none',
          }}
        />
      ))}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={selectStyle}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

const fieldStyle: React.CSSProperties = {
  border: '1px solid #eef0f2',
  borderRadius: 10,
  padding: '10px 12px',
  margin: 0,
};
const legendStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#6b7280',
  padding: '0 6px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};
const radioLabelStyle: React.CSSProperties = {
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};
const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  fontSize: 13,
  borderRadius: 8,
  border: '1px solid #d1d5db',
  background: '#fff',
};
