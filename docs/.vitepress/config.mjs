import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '梁龙',
  description: '独立全栈开发者 · AI Agent 应用开发 · 抖音数据监控与自动化',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: '梁龙 · 帧间',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '项目', link: '/projects/' },
      { text: '关于我', link: '/about/' },
      { text: 'GitHub', link: 'https://github.com/lszlovelhl' },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '最近文章',
          items: [
            { text: '幂等防重：让 Agent 不再重复处理同一条消息', link: '/posts/agent-idempotency' },
            { text: '从 SQLite 迁移踩坑到多账号并行：抖音监控工具工程化复盘', link: '/posts/douyin-tool-engineering' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lszlovelhl' },
      { icon: 'email', link: 'mailto:lsz1310225074@icloud.com' },
    ],

    footer: {
      message: '独立开发 · 梁龙科技',
      copyright: '© 2026 lszlovelhl',
    },

    editLink: {
      pattern: 'https://github.com/lszlovelhl/lszlovelhl.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },
})
