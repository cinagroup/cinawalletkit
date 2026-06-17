# CinaWalletKit 品牌自主化设计规格

**日期**: 2026-06-17  
**状态**: 待审阅  
**范围**: RainbowKit fork 全面品牌替换

---

## 1. 背景

本项目是 RainbowKit (https://github.com/rainbow-me/rainbowkit) 的 fork，目标是将所有品牌标识替换为 CinaGroup 的 CinaWalletKit，实现完全品牌自主化。

当前状态：源代码内保留完整的原始品牌（`@rainbow-me/rainbowkit`、RainbowKit logo、rainbowkit.com 等），涉及 250+ 个文件、数千处引用。

---

## 2. 品牌词典（替换映射表）

| # | 原始值 | 替换值 | 影响范围 |
|---|--------|--------|----------|
| 1 | `@rainbow-me/rainbowkit` | `@cinagroup/cinawalletkit` | 所有 import、package.json |
| 2 | `@rainbow-me/rainbow-button` | `@cinagroup/cinawalletkit-button` | 依赖声明、import |
| 3 | `@rainbow-me/rainbowkit-siwe-next-auth` | `@cinagroup/cinawalletkit-siwe-next-auth` | 依赖声明、import |
| 4 | `@rainbow-me/create-rainbowkit` | `@cinagroup/create-cinawalletkit` | CLI 包名、bin 入口 |
| 5 | `RainbowKit` (显示名/组件名) | `CinaWalletKit` | 组件名、类型名、JSDoc、注释 |
| 6 | `rainbowkit` (小写/路径) | `cinawalletkit` | 目录名、变量名、URL 路径 |
| 7 | `rainbowkit.com` | `walletkit.cinagroup.com` | site 配置、文档链接 |
| 8 | `data-rk` (CSS 选择器) | `data-cwk` | 2 处构建/组件代码 |
| 9 | `RAINBOW_PROVIDER_API_KEY` | `CINA_PROVIDER_API_KEY` | 5 个文件的环境变量 |
| 10 | `"author": "Rainbow"` | `"author": "CinaGroup"` | 4 个 package.json |
| 11 | `github.com/rainbow-me/rainbowkit` | `github.com/cinagroup/cinawalletkit` | repository 字段 |

---

## 3. 不动的内容

- **wagmi**：上游 Web3 依赖库（380+ 文件），不是项目品牌
- **Rainbow 钱包 connector**：`rainbow` 作为钱包名称是合法引用，不是品牌
- **第三方库的 import 和引用**：与品牌无关的外部依赖
- **原始 LICENSE 版权行**：`Copyright (c) 2024 Rainbow` 必须保留（MIT 协议要求）

---

## 4. 目录重命名

| 现有 | 重命名为 |
|------|----------|
| `packages/rainbowkit/` | `packages/cinawalletkit/` |
| `packages/rainbow-button/` | `packages/cinawalletkit-button/` |
| `packages/rainbowkit-siwe-next-auth/` | `packages/cinawalletkit-siwe-next-auth/` |
| `packages/create-rainbowkit/` | `packages/create-cinawalletkit/` |

**注意**：`packages/example/` 目录名保持不变（私有包，不发布到 npm），仅更新内部 import 路径。

---

## 5. 执行策略：4 层分批

### 第 1 层 — 核心（验证：`pnpm install` 成功）

**目标**：使 npm 包名和目录结构正确，依赖关系可解析。

**文件清单**：
- 4 个包目录重命名
- `packages/cinawalletkit/package.json` — name, author, repository
- `packages/cinawalletkit-button/package.json` — name, author, dependencies, repository
- `packages/cinawalletkit-siwe-next-auth/package.json` — name, author, peerDependencies, devDependencies, repository
- `packages/create-cinawalletkit/package.json` — name, bin 字段
- `packages/example/package.json` — dependencies 字段
- 根 `package.json` — name, scripts 中的 `--filter` 路径, repository
- `pnpm-workspace.yaml` — `create-cinawalletkit/**/*-app`

**验证**：`pnpm install` 成功完成，生成新的 `pnpm-lock.yaml`。

---

### 第 2 层 — 源码（验证：`pnpm build` 成功）

**目标**：所有 TypeScript/JavaScript 源代码中的品牌引用正确。

**文件清单**：

**2a. import 路径替换**（所有 `.ts`/`.tsx`/`.js` 文件）：
```typescript
// 旧
import { ... } from '@rainbow-me/rainbowkit';
import { ... } from '@rainbow-me/rainbow-button';
import { ... } from '@rainbow-me/rainbowkit-siwe-next-auth';

// 新
import { ... } from '@cinagroup/cinawalletkit';
import { ... } from '@cinagroup/cinawalletkit-button';
import { ... } from '@cinagroup/cinawalletkit-siwe-next-auth';
```

**2b. 组件名和类型名替换**：
- `RainbowKitProvider` → `CinaWalletKitProvider`
- `RainbowKitProviderProps` → `CinaWalletKitProviderProps`
- `RainbowKitAuthenticationProvider` → `CinaWalletKitAuthenticationProvider`
- 其他以 `RainbowKit` 开头的类型/接口/变量

**2c. CSS 作用域选择器**：
- `packages/cinawalletkit/build.js:59` — `prefixSelector({ prefix: '[data-rk]' })` → `'[data-cwk]'`
- `packages/cinawalletkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx:37` — `const attr = 'data-rk';` → `'data-cwk'`

**2d. 环境变量**：
- `packages/cinawalletkit/.env.local.example` — `RAINBOW_PROVIDER_API_KEY` → `CINA_PROVIDER_API_KEY`
- `packages/cinawalletkit/build.js` (2 处)
- `packages/cinawalletkit/src/core/network/enhancedProvider.ts` (2 处)
- `packages/cinawalletkit/src/core/network/enhancedProvider.test.ts` (2 处)

**2e. 源代码注释/JSDoc**：
- 所有 `packages/*/src/` 中的注释、JSDoc、文档字符串里的 `RainbowKit` → `CinaWalletKit`

**验证**：`pnpm build` 成功，所有包生成 dist 产物。

---

### 第 3 层 — 文档（验证：site 能构建）

**目标**：所有文档、README、LICENSE 反映新品牌。

**文件清单**：

**3a. README.md（根目录）**：
- 标题：`RainbowKit` → `CinaWalletKit`
- Logo 图片链接：替换为 CinaWalletKit logo（占位，后续替换实际图片）
- 描述："The best way to connect a wallet" → 保持不变（此描述通用，无需修改）
- npm badge、CodeSandbox 链接、文档链接
- 底部添加：`Based on [RainbowKit](https://github.com/rainbow-me/rainbowkit), originally developed by Rainbow. Licensed under MIT.`

**3b. LICENSE**：
- 添加行：`Copyright (c) 2026 CinaGroup`
- 保留行：`Copyright (c) 2024 Rainbow`

**3c. CLAUDE.md / AGENTS.md**：
- 所有 `RainbowKit`、`rainbow-me`、`rainbowkit.com` 引用替换

**3d. site/ 所有 18 语言 mdx 文件**（250+ 文件）：
- `RainbowKit` → `CinaWalletKit`
- `rainbowkit.com` → `walletkit.cinagroup.com`
- `@rainbow-me/` → `@cinagroup/`
- 非拉丁语系文件中的 "RainbowKit" 直接替换为 "CinaWalletKit"，不翻译

**3e. site/public/ 静态文件**：
- `llms.txt` (22 次)
- `llms-full.txt`
- `robots.txt` (2 次)
- `sitemap-0.xml` (26 次)
- `next-sitemap.config.js` (20 次)

**3f. site/ 代码文件**：
- `site/package.json` — dependencies
- `site/components/Provider/Provider.tsx`
- `site/components/TitleAndMetaTags/TitleAndMetaTags.tsx`
- 其他引用品牌的组件

**验证**：`cd site && pnpm build` 成功。

---

### 第 4 层 — 外围（验证：examples 能构建）

**目标**：示例项目、CLI 模板、CHANGELOG 文件全部更新。

**文件清单**：

**4a. examples/ 所有 14 个示例**：
- 每个示例的 `package.json` — dependencies 中的 `@rainbow-me/` → `@cinagroup/`
- 每个示例的 `.ts`/`.tsx`/`.js` 文件 — import 路径

**4b. packages/create-cinawalletkit/templates/next-app/**：
- 模板文件中的所有品牌引用
- 模板的 `package.json`

**4c. CLI bin 入口**：
- `packages/create-cinawalletkit/package.json` — `bin` 字段：`"create-cinawalletkit": "dist/cli.js"`
- `packages/create-cinawalletkit/src/cli.ts` — 内部引用（如有）

**4d. CHANGELOG.md（所有子包）**：
- 约 20 个 CHANGELOG 文件
- 历史条目中的品牌引用保留或替换？（建议：替换为当前品牌，保持历史一致性）

**验证**：`cd examples/with-next && pnpm build` 成功（至少 1 个示例验证）。

---

## 6. 特殊处理说明

### 6.1 API 破坏性变更

`RainbowKitProvider` → `CinaWalletKitProvider` 是破坏性 API 变更，影响所有消费者。这是品牌自主化的预期行为。

### 6.2 多语言文档处理

- 中文/日文/韩文等非拉丁语系文件中的 "RainbowKit" 直接替换为 "CinaWalletKit"
- 不翻译品牌名称，保持统一

### 6.3 CSS 样式输出

重新构建后，`styles.css` 自动使用 `[data-cwk]` 前缀。消费者需要在根元素上设置 `data-cwk` 属性（由 `CinaWalletKitProvider` 自动处理）。

### 6.4 pnpm-lock.yaml

第 1 层 `pnpm install` 时自动生成，无需手动编辑。

### 6.5 LICENSE 合规

MIT 协议要求保留原始版权声明。因此：
- 添加 `Copyright (c) 2026 CinaGroup`
- 保留 `Copyright (c) 2024 Rainbow`
- 可选：在 README 底部添加归属说明

### 6.6 Logo / 图片资源

当前 README 头图指向 GitHub user-images URL。需要：
- 创建或上传 CinaWalletKit logo
- 更新所有文档中的 logo 引用
- 本规格不处理 logo 设计，仅处理文本引用占位

---

## 7. 验证清单

每层完成后执行以下验证：

| 层 | 验证命令 | 预期结果 |
|----|----------|----------|
| 1 | `pnpm install` | 成功，无错误 |
| 2 | `pnpm build` | 所有包生成 dist 产物 |
| 3 | `cd site && pnpm build` | site 构建成功 |
| 4 | `cd examples/with-next && pnpm build` | 示例构建成功 |
| 全部 | `pnpm test` | 所有测试通过 |
| 全部 | `pnpm lint` | 无 lint 错误 |

---

## 8. 风险评估

| 风险 | 缓解措施 |
|------|----------|
| 批量替换误伤（如 `rainbow` 在钱包注册表中是合法值） | 分层执行，每层验证；使用精确匹配而非盲目替换 |
| 组件 API 变更导致消费者代码破坏 | 这是预期行为；提供迁移文档（site/guides） |
| 多语言文档替换遗漏 | 使用 grep 验证所有语言目录 |
| 环境变量名变更导致运行时错误 | 同步更新 `.env.local.example` 和文档 |

---

## 9. 排除范围

- Logo / 图片设计（仅处理文本引用）
- 域名注册和 DNS 配置
- npm 包发布流程（仅处理包名定义）
- CI/CD 配置（`.github/workflows/`）中的品牌引用（如需要，可作为后续任务）

---

## 10. 成功标准

- 项目中不再出现 `@rainbow-me/`、`RainbowKit`（除 LICENSE 和归属说明外）
- `pnpm install`、`pnpm build`、`pnpm test` 全部成功
- site 能正常构建（即使未部署）
- 所有 examples 能正常构建

---

**规格审阅者**: 用户  
**下一步**: 用户审阅 → writing-plans skill → 实施
