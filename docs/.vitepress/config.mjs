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
          text: '帧间 · 拆解与创作系统',
          items: [
            { text: '密钥泄漏与修复：API Key 安全治理', link: '/posts/secret-hardening' },
            { text: '模型路由：业务只认"档位"不认厂商', link: '/posts/model-routing' },
            { text: '单人全栈：两台服务器怎么分工', link: '/posts/two-servers' },
            { text: '五层拆解 + 两层成稿', link: '/posts/breakdown-pipeline' },
            { text: '多模态拆解管线', link: '/posts/multimodal-pipeline' },
          ],
        },
        {
          text: 'Agent 与工具',
          items: [
            { text: '两个面试题项目：从面试现场到可交付', link: '/posts/projects-overview' },
            { text: 'Docker + CI：从"能跑"到"能交付"', link: '/posts/docker-and-ci' },
            { text: '准确率 100%：提取器评测怎么做', link: '/posts/eval-extractor' },
            { text: 'LLM 兜底为什么"看似成功却返回空"', link: '/posts/llm-field-drift' },
            { text: '飞书表格 upsert 与脏数据防御', link: '/posts/lark-upsert-dirty-data' },
            { text: '幂等防重：让 Agent 不再重复处理同一条消息', link: '/posts/agent-idempotency' },
            { text: '从 SQLite 迁移踩坑到多账号并行', link: '/posts/douyin-tool-engineering' },
          ],
        },
        {
          text: '成长与复盘',
          items: [
            { text: '从 Matlab 到 AI Agent：转行技术路线', link: '/posts/career-pivot' },
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
