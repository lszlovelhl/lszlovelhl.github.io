---
title: 单人维护 GitHub Pages + VitePress 的 CI/CD 心法
date: 2026-10-16
tags: [CI/CD, VitePress, 博客]
---

# 单人维护 GitHub Pages + VitePress 的 CI/CD 心法

这个博客是 VitePress + GitHub Pages，没有服务器、没有数据库、没有运维——全站是静态文件，部署靠 GitHub Actions 自动完成。单人维护这套东西，心法就一句话：**push 即发布，剩下的全自动化。**

## 为什么选这个组合

- **VitePress**：Vite 驱动的静态站点生成器，Markdown 即文章，支持自定义主题、搜索、SEO meta。写博客不需要碰 HTML。
- **GitHub Pages**：免费托管静态站，配 GitHub Actions 自动部署，域名是现成的 `xxx.github.io`。
- **单人友好**：没有服务器账单，没有宕机电话，只有 `git push`。

## 工作流：push 即发布

`.github/workflows/deploy.yml` 大致长这样（核心三段）：

```yaml
name: Deploy VitePress

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - uses: actions/deploy-pages@v4
```

push 到 main → 自动 build → 自动 deploy → **1-2 分钟线上生效**。部署完全不需要人。

## 本地验证：发布前先自检

push 之前我固定跑三件事：

1. `npm run build`——构建失败就不该 push
2. `npm run preview` 起本地预览（localhost:4173），浏览器过一遍关键页面
3. 新文章检查 frontmatter（title/date/tags）和 sidebar 链接有没有写错

构建会漏掉的问题：链接 404、图片路径错、sidebar 项失效。所以**预览这步不能省**——CI 只保证"能构建"，不保证"没写错"。

## 单人博客的自动化清单

除了部署，还有几件可以自动化的：

**1. SEO 元数据自动化**

`docs/.vitepress/config.mjs` 里配好全站 meta，每一页自动继承：

```js
head: [
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:site_name', content: '拾栗' }],
  ['meta', { property: 'og:image', content: 'https://lszlovelhl.github.io/og-cover.jpg' }],
  ['meta', { property: 'og:image:width', content: '1200' }],
  ['meta', { property: 'og:image:height', content: '630' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
],
```

配置一次，全站生效。og:image 用品牌分享卡，社交分享出去的第一眼就是完整品牌。

**2. sitemap 自动生成 + 提交**

VitePress 有 sitemap 插件，生成 `sitemap.xml`。robots.txt 指向它。站点更新后，去 Google Search Console 重新提交一次 sitemap，Google 会按 lastmod 重新抓取。

**3. 品牌资源版本管理**

logo、favicon、分享卡这些资源放进 `docs/public/`，跟代码一起 git 管理——换了 logo，所有页面自动换。

## 单人最怕什么：流程断裂

单人维护最怕的不是写代码，是**某一步要靠人记**：

- 忘了 build 就 push → CI 帮你发现
- 忘了更新 sidebar → 新文章发出去但没入口 → 所以 sidebar 和文章同步改，别分开做
- 忘了提交 sitemap → Google 不重新抓 → 所以 sitemap 和内容改动一起提交

**把每一步都变成"push 的一部分"**，记忆就不参与关键路径了。

## 心法总结

单人维护静态博客，心法其实就三条：

1. **一切靠 git 驱动**：代码、文章、品牌资源、配置，全部进仓库，没有仓库外的"手动步骤"
2. **CI 兜底，本地自检**：构建失败 CI 拦，内容错误本地预览拦
3. **配置即文档**：全站 meta、sitemap、部署流程都写成配置文件——三个月后回来，看配置就知道全站怎么跑的

这套东西我维护了挺久，总成本约等于"每次写文章多花三分钟"。换来的是：**想写就写，写完即上线，永不宕机**。对独立开发者来说，这是性价比最高的一种"拥有一个网站"的方式。
