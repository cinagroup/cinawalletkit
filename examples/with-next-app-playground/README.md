# CinaWalletKit Playground

An interactive playground for configuring the CinaWalletKit `ConnectButton` and previewing it live — similar to [demo.reown.com](https://demo.reown.com).

## Features

- **Theme**: light / dark / midnight, accent color, border radius
- **Locale**: 8 languages (en, zh, es, ja, ko, de, fr, pt)
- **Modal size**: compact / wide
- **Initial network**: pick which chain is selected by default
- **Feature toggles**: recent transactions, cool mode, app info header

All changes apply instantly to the live `<ConnectButton />` preview on the right.

## Develop

```bash
pnpm dev
```

## Deploy (Cloudflare Workers)

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your-id> pnpm deploy
```

Live at [playground.cinacoin.com](https://playground.cinacoin.com).
