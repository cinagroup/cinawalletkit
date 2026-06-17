# CinaWalletKit 品牌自主化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 RainbowKit fork 全面品牌替换为 CinaWalletKit，分 4 层执行

**Architecture:** 按依赖关系分 4 层：核心（包名/目录）→ 源码（import/组件/CSS）→ 文档（README/site）→ 外围（examples/CLI/CHANGELOG），每层完成后验证构建

**Tech Stack:** pnpm workspace, TypeScript, React, Next.js (site), Vanilla Extract (CSS), esbuild (build)

---

## 文件结构概览

### 需要重命名的目录（第 1 层）
- `packages/rainbowkit/` → `packages/cinawalletkit/`
- `packages/rainbow-button/` → `packages/cinawalletkit-button/`
- `packages/rainbowkit-siwe-next-auth/` → `packages/cinawalletkit-siwe-next-auth/`
- `packages/create-rainbowkit/` → `packages/create-cinawalletkit/`

### 需要修改的核心文件（第 1 层）
- `packages/*/package.json`（4 个）— name, author, repository, dependencies
- 根 `package.json` — name, scripts, repository
- `pnpm-workspace.yaml` — 路径引用

### 需要修改的源码文件（第 2 层）
- 所有 `.ts`/`.tsx`/`.js` 文件中的 import 路径（250+ 文件）
- `packages/cinawalletkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx` — 组件名 + CSS 属性
- `packages/cinawalletkit/build.js` — CSS 前缀 + 环境变量
- `packages/cinawalletkit/src/core/network/enhancedProvider.ts` — 环境变量
- `packages/cinawalletkit/src/core/network/enhancedProvider.test.ts` — 环境变量

### 需要修改的文档文件（第 3 层）
- `README.md` — 全面重写
- `LICENSE` — 添加版权行
- `CLAUDE.md` / `AGENTS.md` — 品牌替换
- `site/data/*/docs/*.mdx` — 18 种语言（250+ 文件）
- `site/public/llms.txt` / `robots.txt` / `sitemap-0.xml`
- `site/next-sitemap.config.js`

### 需要修改的外围文件（第 4 层）
- `examples/*/package.json`（14 个）— dependencies
- `examples/*/*.ts`/`*.tsx` — import 路径
- `packages/create-cinawalletkit/templates/next-app/` — 模板文件
- `packages/*/CHANGELOG.md`（约 20 个）— 历史品牌引用

---

## 第 1 层 — 核心（包名/目录/package.json）

### Task 1.1: 重命名包目录

**Files:**
- Modify: `packages/rainbowkit/` → `packages/cinawalletkit/`
- Modify: `packages/rainbow-button/` → `packages/cinawalletkit-button/`
- Modify: `packages/rainbowkit-siwe-next-auth/` → `packages/cinawalletkit-siwe-next-auth/`
- Modify: `packages/create-rainbowkit/` → `packages/create-cinawalletkit/`

- [ ] **Step 1: 重命名 packages/rainbowkit 目录**

```bash
cd E:\cinagroup\cinawalletkit
ren packages\rainbowkit packages\cinawalletkit
```

- [ ] **Step 2: 重命名 packages/rainbow-button 目录**

```bash
cd E:\cinagroup\cinawalletkit
ren packages\rainbow-button packages\cinawalletkit-button
```

- [ ] **Step 3: 重命名 packages/rainbowkit-siwe-next-auth 目录**

```bash
cd E:\cinagroup\cinawalletkit
ren packages\rainbowkit-siwe-next-auth packages\cinawalletkit-siwe-next-auth
```

- [ ] **Step 4: 重命名 packages/create-rainbowkit 目录**

```bash
cd E:\cinagroup\cinawalletkit
ren packages\create-rainbowkit packages\create-cinawalletkit
```

- [ ] **Step 5: 验证目录重命名**

```bash
dir packages
```

Expected: 看到 `cinawalletkit`, `cinawalletkit-button`, `cinawalletkit-siwe-next-auth`, `create-cinawalletkit`

- [ ] **Step 6: Commit**

```bash
git add packages/
git commit -m "refactor: 重命名包目录为 cinawalletkit 系列"
```

---

### Task 1.2: 更新 packages/cinawalletkit/package.json

**Files:**
- Modify: `packages/cinawalletkit/package.json`

- [ ] **Step 1: 读取当前文件内容**

```bash
type packages\cinawalletkit\package.json
```

- [ ] **Step 2: 修改 name, author, repository 字段**

使用文本编辑器或脚本修改以下字段：
```json
{
  "name": "@cinagroup/cinawalletkit",
  "author": "CinaGroup",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cinagroup/cinawalletkit.git",
    "directory": "packages/cinawalletkit"
  }
}
```

- [ ] **Step 3: 验证修改**

```bash
type packages\cinawalletkit\package.json | findstr "name author repository"
```

Expected: 显示 `@cinagroup/cinawalletkit`, `CinaGroup`, `github.com/cinagroup/cinawalletkit`

- [ ] **Step 4: Commit**

```bash
git add packages/cinawalletkit/package.json
git commit -m "refactor: 更新 cinawalletkit 包名和元数据"
```

---

### Task 1.3: 更新 packages/cinawalletkit-button/package.json

**Files:**
- Modify: `packages/cinawalletkit-button/package.json`

- [ ] **Step 1: 修改 name, author, dependencies, repository**

```json
{
  "name": "@cinagroup/cinawalletkit-button",
  "author": "CinaGroup",
  "dependencies": {
    "@cinagroup/cinawalletkit": "workspace:*"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cinagroup/cinawalletkit.git",
    "directory": "packages/cinawalletkit-button"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/cinawalletkit-button/package.json
git commit -m "refactor: 更新 cinawalletkit-button 包名和元数据"
```

---

### Task 1.4: 更新 packages/cinawalletkit-siwe-next-auth/package.json

**Files:**
- Modify: `packages/cinawalletkit-siwe-next-auth/package.json`

- [ ] **Step 1: 修改 name, author, peerDependencies, devDependencies, repository**

```json
{
  "name": "@cinagroup/cinawalletkit-siwe-next-auth",
  "author": "CinaGroup",
  "peerDependencies": {
    "@cinagroup/cinawalletkit": "2.2.x",
    ...
  },
  "devDependencies": {
    "@cinagroup/cinawalletkit": "workspace:*",
    ...
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cinagroup/cinawalletkit.git",
    "directory": "packages/cinawalletkit-siwe-next-auth"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/cinawalletkit-siwe-next-auth/package.json
git commit -m "refactor: 更新 cinawalletkit-siwe-next-auth 包名和元数据"
```

---

### Task 1.5: 更新 packages/create-cinawalletkit/package.json

**Files:**
- Modify: `packages/create-cinawalletkit/package.json`

- [ ] **Step 1: 修改 name, bin 字段**

```json
{
  "name": "@cinagroup/create-cinawalletkit",
  "bin": {
    "create-cinawalletkit": "dist/cli.js"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/create-cinawalletkit/package.json
git commit -m "refactor: 更新 create-cinawalletkit 包名和 bin 入口"
```

---

### Task 1.6: 更新 packages/example/package.json

**Files:**
- Modify: `packages/example/package.json`

- [ ] **Step 1: 修改 dependencies 字段**

```json
{
  "dependencies": {
    "@cinagroup/cinawalletkit-button": "workspace:*",
    "@cinagroup/cinawalletkit": "workspace:*",
    "@cinagroup/cinawalletkit-siwe-next-auth": "workspace:*",
    ...
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/example/package.json
git commit -m "refactor: 更新 example 依赖引用"
```

---

### Task 1.7: 更新根 package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 修改 name, repository 字段**

```json
{
  "name": "cinawalletkit",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cinagroup/cinawalletkit.git"
  }
}
```

- [ ] **Step 2: 修改 scripts 中的 --filter 路径**

替换所有 `@rainbow-me/rainbow*` 为 `@cinagroup/cinawalletkit*`：
```json
{
  "scripts": {
    "dev": "pnpm --recursive --parallel --filter @cinagroup/cinawalletkit* --filter example dev",
    "dev:lib": "pnpm --parallel --filter @cinagroup/cinawalletkit* dev",
    "test:cli": "pnpm --filter @cinagroup/create-cinawalletkit test:build",
    "test:cli:dev": "pnpm --filter @cinagroup/create-cinawalletkit test:dev",
    "test:cli:clean": "rm -rf ./packages/create-cinawalletkit/generated-test-app",
    "ci:example": "pnpm --filter @cinagroup/cinawalletkit* prepare && pnpm --filter example build",
    "ci:site": "pnpm --filter @cinagroup/cinawalletkit* prepare && pnpm --filter site build"
  }
}
```

- [ ] **Step 3: 修改 clean 脚本中的路径**

```json
{
  "clean": "rm -rf ./packages/cinawalletkit/dist && rm -rf ./packages/cinawalletkit-siwe-next-auth/dist && rm -rf ./packages/cinawalletkit-button/dist && rm -rf ./packages/create-cinawalletkit/dist && rm -rf ./packages/cinawalletkit/node_modules && pnpm install"
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "refactor: 更新根 package.json 包名和脚本"
```

---

### Task 1.8: 更新 pnpm-workspace.yaml

**Files:**
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: 修改路径引用**

```yaml
packages:
  - 'packages/*'
  - 'packages/create-cinawalletkit/**/*-app'
  - 'site'
  - 'examples/*'
```

- [ ] **Step 2: Commit**

```bash
git add pnpm-workspace.yaml
git commit -m "refactor: 更新 pnpm workspace 路径"
```

---

### Task 1.9: 验证第 1 层

- [ ] **Step 1: 删除 node_modules 和 lock 文件**

```bash
rmdir /s /q node_modules
rmdir /s /q packages\cinawalletkit\node_modules
rmdir /s /q packages\cinawalletkit-button\node_modules
rmdir /s /q packages\cinawalletkit-siwe-next-auth\node_modules
rmdir /s /q packages\create-cinawalletkit\node_modules
del pnpm-lock.yaml
```

- [ ] **Step 2: 重新安装依赖**

```bash
pnpm install
```

Expected: 成功完成，生成新的 `pnpm-lock.yaml`

- [ ] **Step 3: Commit lock 文件**

```bash
git add pnpm-lock.yaml
git commit -m "chore: 重新生成 pnpm-lock.yaml"
```

**第 1 层验证通过** ✅

---

## 第 2 层 — 源码（import/组件名/CSS/环境变量）

### Task 2.1: 批量替换 import 路径

**Files:**
- Modify: 所有 `.ts`/`.tsx`/`.js` 文件（250+ 文件）

- [ ] **Step 1: 在 packages/ 目录下替换 import 路径**

使用 PowerShell 批量替换：
```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "@rainbow-me/rainbowkit", "@cinagroup/cinawalletkit" | Set-Content $_.FullName -NoNewline
}
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "@rainbow-me/rainbow-button", "@cinagroup/cinawalletkit-button" | Set-Content $_.FullName -NoNewline
}
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "@rainbow-me/rainbowkit-siwe-next-auth", "@cinagroup/cinawalletkit-siwe-next-auth" | Set-Content $_.FullName -NoNewline
}
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "@rainbow-me/create-rainbowkit", "@cinagroup/create-cinawalletkit" | Set-Content $_.FullName -NoNewline
}
```

- [ ] **Step 2: 验证替换结果**

```bash
findstr /s /r "@rainbow-me" packages\*.ts packages\*.tsx packages\*.js
```

Expected: 无输出（除了可能的注释）

- [ ] **Step 3: Commit**

```bash
git add packages/
git commit -m "refactor: 批量替换 import 路径为 @cinagroup"
```

---

### Task 2.2: 替换组件名和类型名

**Files:**
- Modify: `packages/cinawalletkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx`
- Modify: 所有引用这些组件名的文件

- [ ] **Step 1: 重命名组件文件目录**

```bash
ren packages\cinawalletkit\src\components\RainbowKitProvider packages\cinawalletkit\src\components\CinaWalletKitProvider
ren packages\cinawalletkit\src\components\CinaWalletKitProvider\RainbowKitProvider.tsx packages\cinawalletkit\src\components\CinaWalletKitProvider\CinaWalletKitProvider.tsx
```

- [ ] **Step 2: 替换组件名 RainbowKitProvider → CinaWalletKitProvider**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "RainbowKitProvider", "CinaWalletKitProvider" | Set-Content $_.FullName -NoNewline
}
```

- [ ] **Step 3: 替换相关类型名**

```powershell
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "RainbowKitProviderProps", "CinaWalletKitProviderProps" | Set-Content $_.FullName -NoNewline
}
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "RainbowKitAuthenticationProvider", "CinaWalletKitAuthenticationProvider" | Set-Content $_.FullName -NoNewline
}
```

- [ ] **Step 4: 验证**

```bash
findstr /s "RainbowKitProvider" packages\*.ts packages\*.tsx
```

Expected: 无输出

- [ ] **Step 5: Commit**

```bash
git add packages/
git commit -m "refactor: 替换组件名 RainbowKitProvider → CinaWalletKitProvider"
```

---

### Task 2.3: 替换 CSS 作用域选择器 data-rk → data-cwk

**Files:**
- Modify: `packages/cinawalletkit/build.js:59`
- Modify: `packages/cinawalletkit/src/components/CinaWalletKitProvider/CinaWalletKitProvider.tsx:37`

- [ ] **Step 1: 修改 build.js**

```javascript
// 第 59 行，将：
prefixSelector({ prefix: '[data-rk]' }),
// 改为：
prefixSelector({ prefix: '[data-cwk]' }),
```

- [ ] **Step 2: 修改 CinaWalletKitProvider.tsx**

```typescript
// 第 37 行，将：
const attr = 'data-rk';
// 改为：
const attr = 'data-cwk';
```

- [ ] **Step 3: 验证**

```bash
findstr /s "data-rk" packages\*.js packages\*.ts packages\*.tsx
```

Expected: 无输出

- [ ] **Step 4: Commit**

```bash
git add packages/cinawalletkit/build.js packages/cinawalletkit/src/components/CinaWalletKitProvider/CinaWalletKitProvider.tsx
git commit -m "refactor: 替换 CSS 作用域选择器 data-rk → data-cwk"
```

---

### Task 2.4: 替换环境变量 RAINBOW_PROVIDER_API_KEY → CINA_PROVIDER_API_KEY

**Files:**
- Modify: `packages/cinawalletkit/.env.local.example`
- Modify: `packages/cinawalletkit/build.js`
- Modify: `packages/cinawalletkit/src/core/network/enhancedProvider.ts`
- Modify: `packages/cinawalletkit/src/core/network/enhancedProvider.test.ts`

- [ ] **Step 1: 批量替换环境变量名**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages\cinawalletkit -Recurse -Include *.ts,*.tsx,*.js,*.example | ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace "RAINBOW_PROVIDER_API_KEY", "CINA_PROVIDER_API_KEY" | Set-Content $_.FullName -NoNewline
}
```

- [ ] **Step 2: 验证**

```bash
findstr /s "RAINBOW_PROVIDER_API_KEY" packages\*
```

Expected: 无输出

- [ ] **Step 3: Commit**

```bash
git add packages/cinawalletkit/.env.local.example packages/cinawalletkit/build.js packages/cinawalletkit/src/core/network/enhancedProvider.ts packages/cinawalletkit/src/core/network/enhancedProvider.test.ts
git commit -m "refactor: 替换环境变量 RAINBOW_PROVIDER_API_KEY → CINA_PROVIDER_API_KEY"
```

---

### Task 2.5: 替换源代码注释中的 RainbowKit → CinaWalletKit

**Files:**
- Modify: 所有 `packages/*/src/` 中的 `.ts`/`.tsx` 文件

- [ ] **Step 1: 批量替换注释中的品牌名**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "RainbowKit", "CinaWalletKit"
    $content = $content -replace "rainbowkit", "cinawalletkit"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 2: 验证**

```bash
findstr /s "RainbowKit" packages\*.ts packages\*.tsx
```

Expected: 无输出（除了可能的 CHANGELOG）

- [ ] **Step 3: Commit**

```bash
git add packages/
git commit -m "refactor: 替换源代码注释中的品牌名"
```

---

### Task 2.6: 验证第 2 层

- [ ] **Step 1: 构建所有包**

```bash
pnpm build
```

Expected: 所有包成功生成 dist 产物

- [ ] **Step 2: 运行测试**

```bash
pnpm test
```

Expected: 所有测试通过

- [ ] **Step 3: 运行 lint**

```bash
pnpm lint
```

Expected: 无 lint 错误

**第 2 层验证通过** ✅

---

## 第 3 层 — 文档（README/site/LICENSE）

### Task 3.1: 重写 README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 创建新的 README 内容**

```markdown
# CinaWalletKit

The best way to connect a wallet.

<p align="center">
  <img src="./site/public/logo.png" alt="CinaWalletKit" width="200" />
</p>

[![npm version](https://img.shields.io/npm/v/@cinagroup/cinawalletkit.svg)](https://www.npmjs.com/package/@cinagroup/cinawalletkit)
[![npm downloads](https://img.shields.io/npm/dm/@cinagroup/cinawalletkit.svg)](https://www.npmjs.com/package/@cinagroup/cinawalletkit)
[![License](https://img.shields.io/npm/l/@cinagroup/cinawalletkit.svg)](https://github.com/cinagroup/cinawalletkit/blob/main/LICENSE)

## Installation

```bash
npm install @cinagroup/cinawalletkit wagmi viem @tanstack/react-query
```

## Documentation

Visit [walletkit.cinagroup.com](https://walletkit.cinagroup.com) to view the full documentation.

## License

MIT License

Copyright (c) 2026 CinaGroup
Copyright (c) 2024 Rainbow

Based on [RainbowKit](https://github.com/rainbow-me/rainbowkit), originally developed by Rainbow. Licensed under MIT.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: 重写 README 为 CinaWalletKit 品牌"
```

---

### Task 3.2: 更新 LICENSE

**Files:**
- Modify: `LICENSE`

- [ ] **Step 1: 添加 CinaGroup 版权行**

在 LICENSE 文件顶部添加：
```
MIT License

Copyright (c) 2026 CinaGroup
Copyright (c) 2024 Rainbow
```

- [ ] **Step 2: Commit**

```bash
git add LICENSE
git commit -m "docs: 添加 CinaGroup 版权行，保留原始 Rainbow 版权"
```

---

### Task 3.3: 更新 CLAUDE.md 和 AGENTS.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: 替换品牌引用**

```powershell
cd E:\cinagroup\cinawalletkit
(Get-Content CLAUDE.md -Raw) -replace "RainbowKit", "CinaWalletKit" | Set-Content CLAUDE.md -NoNewline
(Get-Content CLAUDE.md -Raw) -replace "rainbow-me", "cinagroup" | Set-Content CLAUDE.md -NoNewline
(Get-Content CLAUDE.md -Raw) -replace "rainbowkit.com", "walletkit.cinagroup.com" | Set-Content CLAUDE.md -NoNewline

(Get-Content AGENTS.md -Raw) -replace "RainbowKit", "CinaWalletKit" | Set-Content AGENTS.md -NoNewline
(Get-Content AGENTS.md -Raw) -replace "rainbow-me", "cinagroup" | Set-Content AGENTS.md -NoNewline
(Get-Content AGENTS.md -Raw) -replace "rainbowkit.com", "walletkit.cinagroup.com" | Set-Content AGENTS.md -NoNewline
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md AGENTS.md
git commit -m "docs: 更新 CLAUDE.md 和 AGENTS.md 品牌引用"
```

---

### Task 3.4: 批量替换 site/ 所有 18 语言 mdx 文件

**Files:**
- Modify: `site/data/*/docs/*.mdx`（250+ 文件）

- [ ] **Step 1: 批量替换 site 文档中的品牌引用**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path site\data -Recurse -Include *.mdx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "RainbowKit", "CinaWalletKit"
    $content = $content -replace "rainbowkit", "cinawalletkit"
    $content = $content -replace "rainbowkit.com", "walletkit.cinagroup.com"
    $content = $content -replace "@rainbow-me/", "@cinagroup/"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 2: 验证替换数量**

```bash
findstr /s "rainbowkit.com" site\data\*
```

Expected: 无输出

- [ ] **Step 3: Commit**

```bash
git add site/data/
git commit -m "docs: 批量替换 site 文档中的品牌引用"
```

---

### Task 3.5: 更新 site/public/ 静态文件

**Files:**
- Modify: `site/public/llms.txt`
- Modify: `site/public/llms-full.txt`
- Modify: `site/public/robots.txt`
- Modify: `site/public/sitemap-0.xml`

- [ ] **Step 1: 批量替换静态文件中的品牌引用**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path site\public -Include *.txt,*.xml | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "rainbowkit.com", "walletkit.cinagroup.com"
    $content = $content -replace "RainbowKit", "CinaWalletKit"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 2: Commit**

```bash
git add site/public/llms.txt site/public/llms-full.txt site/public/robots.txt site/public/sitemap-0.xml
git commit -m "docs: 更新 site 静态文件中的品牌引用"
```

---

### Task 3.6: 更新 site/ 代码文件

**Files:**
- Modify: `site/package.json`
- Modify: `site/components/Provider/Provider.tsx`
- Modify: `site/components/TitleAndMetaTags/TitleAndMetaTags.tsx`
- Modify: `site/next-sitemap.config.js`

- [ ] **Step 1: 更新 site/package.json**

```json
{
  "dependencies": {
    "@cinagroup/cinawalletkit": "workspace:*",
    ...
  }
}
```

- [ ] **Step 2: 更新 next-sitemap.config.js**

```javascript
module.exports = {
  siteUrl: 'https://walletkit.cinagroup.com',
  ...
}
```

- [ ] **Step 3: 更新组件文件中的品牌引用**

```powershell
Get-ChildItem -Path site\components -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "RainbowKit", "CinaWalletKit"
    $content = $content -replace "rainbowkit.com", "walletkit.cinagroup.com"
    $content = $content -replace "@rainbow-me/", "@cinagroup/"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 4: Commit**

```bash
git add site/package.json site/components/ site/next-sitemap.config.js
git commit -m "docs: 更新 site 代码文件中的品牌引用"
```

---

### Task 3.7: 验证第 3 层

- [ ] **Step 1: 构建 site**

```bash
cd site
pnpm build
```

Expected: site 构建成功

- [ ] **Step 2: 返回根目录**

```bash
cd ..
```

**第 3 层验证通过** ✅

---

## 第 4 层 — 外围（examples/CLI/CHANGELOG）

### Task 4.1: 更新 examples/ 所有 14 个示例

**Files:**
- Modify: `examples/*/package.json`（14 个）
- Modify: `examples/*/*.ts`/`*.tsx`（所有源代码文件）

- [ ] **Step 1: 批量替换 examples 中的依赖引用**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path examples -Recurse -Include package.json | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "@rainbow-me/rainbowkit", "@cinagroup/cinawalletkit"
    $content = $content -replace "@rainbow-me/rainbow-button", "@cinagroup/cinawalletkit-button"
    $content = $content -replace "@rainbow-me/rainbowkit-siwe-next-auth", "@cinagroup/cinawalletkit-siwe-next-auth"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 2: 批量替换 examples 中的 import 路径**

```powershell
Get-ChildItem -Path examples -Recurse -Include *.ts,*.tsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "@rainbow-me/rainbowkit", "@cinagroup/cinawalletkit"
    $content = $content -replace "@rainbow-me/rainbow-button", "@cinagroup/cinawalletkit-button"
    $content = $content -replace "@rainbow-me/rainbowkit-siwe-next-auth", "@cinagroup/cinawalletkit-siwe-next-auth"
    $content = $content -replace "RainbowKitProvider", "CinaWalletKitProvider"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 3: Commit**

```bash
git add examples/
git commit -m "refactor: 更新 examples 中的品牌引用"
```

---

### Task 4.2: 更新 CLI 模板

**Files:**
- Modify: `packages/create-cinawalletkit/templates/next-app/` 中的所有文件

- [ ] **Step 1: 批量替换模板文件中的品牌引用**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages\create-cinawalletkit\templates -Recurse | ForEach-Object {
    if ($_.Extension -match "\.(ts|tsx|js|json|md)$") {
        $content = Get-Content $_.FullName -Raw
        $content = $content -replace "RainbowKit", "CinaWalletKit"
        $content = $content -replace "rainbowkit", "cinawalletkit"
        $content = $content -replace "@rainbow-me/", "@cinagroup/"
        Set-Content $_.FullName $content -NoNewline
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/create-cinawalletkit/templates/
git commit -m "refactor: 更新 CLI 模板中的品牌引用"
```

---

### Task 4.3: 更新 CHANGELOG.md 文件

**Files:**
- Modify: `packages/*/CHANGELOG.md`（约 20 个文件）
- Modify: `examples/*/CHANGELOG.md`

- [ ] **Step 1: 批量替换 CHANGELOG 中的品牌引用**

```powershell
cd E:\cinagroup\cinawalletkit
Get-ChildItem -Path packages,examples -Recurse -Include CHANGELOG.md | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace "RainbowKit", "CinaWalletKit"
    $content = $content -replace "rainbowkit", "cinawalletkit"
    $content = $content -replace "@rainbow-me/", "@cinagroup/"
    Set-Content $_.FullName $content -NoNewline
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/*/CHANGELOG.md examples/*/CHANGELOG.md
git commit -m "docs: 更新 CHANGELOG 中的品牌引用"
```

---

### Task 4.4: 验证第 4 层

- [ ] **Step 1: 构建示例项目**

```bash
cd examples\with-next
pnpm build
```

Expected: 示例构建成功

- [ ] **Step 2: 返回根目录**

```bash
cd ..\..
```

- [ ] **Step 3: 最终全面验证**

```bash
pnpm install
pnpm build
pnpm test
pnpm lint
```

Expected: 全部成功

**第 4 层验证通过** ✅

---

## 最终验证清单

- [ ] **Step 1: 验证不再存在原始品牌引用（除 LICENSE 外）**

```bash
findstr /s "@rainbow-me" packages\*.json packages\*.ts packages\*.tsx site\*.ts site\*.tsx examples\*.json examples\*.ts 2>nul | findstr /v "LICENSE"
```

Expected: 无输出

- [ ] **Step 2: 验证所有构建产物**

```bash
dir packages\cinawalletkit\dist
dir packages\cinawalletkit-button\dist
dir packages\cinawalletkit-siwe-next-auth\dist
dir packages\create-cinawalletkit\dist
```

Expected: 所有目录都有 dist 产物

- [ ] **Step 3: 验证 site 构建**

```bash
cd site
dir .next
```

Expected: `.next` 目录存在

- [ ] **Step 4: 最终 commit**

```bash
git add .
git commit -m "feat: 完成 CinaWalletKit 品牌自主化"
```

---

## 总结

- **总任务数**: 16 个 Task
- **总步骤数**: 约 60 步
- **预计耗时**: 2-3 小时（含验证）
- **破坏性变更**: `RainbowKitProvider` → `CinaWalletKitProvider`（预期行为）

**完成标准**:
- ✅ 项目中不再出现 `@rainbow-me/`、`RainbowKit`（除 LICENSE 和归属说明外）
- ✅ `pnpm install`、`pnpm build`、`pnpm test` 全部成功
- ✅ site 能正常构建
- ✅ 所有 examples 能正常构建
