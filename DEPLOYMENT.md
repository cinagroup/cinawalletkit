# Cloudflare 部署指南

本文档说明如何将 CinaWalletKit 文档站和示例项目部署到 Cloudflare。

## 前置条件

1. **Cloudflare 账户**：注册 https://cloudflare.com
2. **Cloudflare API Token**：
   - 登录 Cloudflare Dashboard
   - 进入 **My Profile** → **API Tokens** → **Create Token**
   - 选择 **Edit Cloudflare Workers** 模板
   - 创建并保存 Token
3. **Cloudflare Account ID**：
   - 在 Dashboard 右侧栏找到 **Account ID**
4. **域名配置**：
   - 在 Cloudflare 添加域名 `cinagroup.com`
   - 配置 DNS 记录指向 Cloudflare Pages/Workers

## 环境变量设置

在 GitHub 仓库的 **Settings** → **Secrets and variables** → **Actions** 中添加：

| Secret 名称 | 说明 |
|------------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |
| `GITHUB_TOKEN` | GitHub Token（自动提供） |

## 部署方式

### 方式 1：GitHub Actions 自动部署（推荐）

推送代码到 `main` 分支时自动触发部署：

```bash
git push origin main
```

GitHub Actions 会自动：
- 构建所有项目
- 部署到 Cloudflare
- 创建 PR 预览环境

### 方式 2：手动部署

#### 部署文档站

```bash
cd site
pnpm install
pnpm deploy:production
```

#### 部署静态示例

```bash
cd examples/with-vite
pnpm install
pnpm deploy:production
```

#### 部署 Next.js 示例

```bash
cd examples/with-next
pnpm install
pnpm deploy:production
```

## 域名配置

### 文档站

- 域名：`walletkit.cinagroup.com`
- 类型：Cloudflare Workers
- 路由：所有请求

### 示例项目

使用子路径模式：

| 示例 | 路径 |
|------|------|
| with-vite | `walletkit.cinagroup.com/examples/vite` |
| with-next | `walletkit.cinagroup.com/examples/next` |
| with-next-app | `walletkit.cinagroup.com/examples/next-app` |
| ... | ... |

## 注意事项

### Next.js i18n 兼容性

文档站使用 Next.js 内置 i18n（18 种语言），需要 SSR 支持。`@opennextjs/cloudflare` 适配器已配置。

### Remix 和 React Router

这两个示例使用经典 SSR 模式，部署到 Cloudflare Workers 需要额外的适配器配置。当前配置为基础版本，可能需要根据实际需求调整。

### Cloudflare Workers 限制

- **免费计划**：100,000 请求/天
- **Workers Bundle Size**：1 MB（压缩后）
- **KV Storage**：免费 1 GB

### 构建命令

| 项目 | 构建命令 | 输出目录 |
|------|---------|---------|
| site | `pnpm build:cf` | `.open-next/` |
| with-vite | `pnpm build` | `dist/` |
| with-create-react-app | `pnpm build` | `build/` |
| Next.js 示例 | `pnpm build` + `npx opennextjs-cloudflare` | `.open-next/` |
| with-remix | `pnpm build` | `build/` + `public/` |
| with-react-router | `pnpm build` | `build/` |

## 故障排查

### 构建失败

检查 Node.js 版本（需要 >= 24）：

```bash
node --version
```

### 部署失败

1. 检查 API Token 权限
2. 检查 Account ID 是否正确
3. 查看 Cloudflare Dashboard 日志

### 路由问题

检查 `wrangler.toml` 中的路由配置，确保与项目结构匹配。

## 预览环境

Pull Request 会自动创建预览环境：

- URL：`<project>-<branch>.workers.dev`
- 自动部署，无需手动操作
- PR 合并后自动清理

## 成本估算

| 项目 | 月度请求量（预估） | 成本 |
|------|------------------|------|
| 文档站 | 50,000 | 免费 |
| 示例项目（13 个） | 10,000 each | 免费 |
| **总计** | **~180,000** | **免费** |

Cloudflare 免费计划足够支持开发和小规模使用。
