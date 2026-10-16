import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '拾栗',
  description: '拾栗 · 独立全栈开发者 · AI Agent 应用开发 · 抖音数据监控与自动化',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,

  head: [
    ['meta', { name: 'theme-color', content: '#faf6ee' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    // Open Graph 社交分享卡片
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '拾栗' }],
    ['meta', { property: 'og:title', content: '拾栗 — 独立全栈开发者' }],
    ['meta', { property: 'og:description', content: '独立全栈开发者 · AI Agent 应用开发。做过抖音数据监控工具与推广申请处理 Agent，也折腾过视频拆解系统，记录工程实践与踩坑。' }],
    ['meta', { property: 'og:url', content: 'https://lszlovelhl.github.io/' }],
    ['meta', { property: 'og:image', content: 'https://lszlovelhl.github.io/og-cover.jpg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '拾栗 — 独立全栈开发者' }],
    ['meta', { name: 'twitter:description', content: '独立全栈开发者 · AI Agent 应用开发。抖音数据监控工具、推广处理 Agent、视频拆解系统。' }],
    ['meta', { name: 'twitter:image', content: 'https://lszlovelhl.github.io/og-cover.jpg' }],
  ],

  themeConfig: {
    logo: '/favicon.png',
    siteTitle: '拾栗',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
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
          text: '拾栗手记',
          items: [
            { text: '给博客换新装：从深蓝冷色到暖纸风的一周', link: '/posts/blog-redesign' },
            { text: '为什么我把 logo 从"大 L"换成了手绘板栗', link: '/posts/chestnut-logo' },
            { text: '一个人怎么活成一支团队：独立开发者工具链', link: '/posts/solo-toolchain' },
            { text: '大模型 API 成本控制实战：从免费档到按量付费', link: '/posts/llm-cost-control' },
            { text: '让 Agent 学会"重试"：幂等、退避与故障恢复', link: '/posts/agent-retry' },
            { text: '从爬虫到 AI Agent 开发者的转型路线图', link: '/posts/crawler-to-agent' },
            { text: '抖音数据监控工具：从爬虫到告警的完整工程', link: '/posts/douyin-monitor' },
            { text: '单人维护 GitHub Pages + VitePress 的 CI/CD 心法', link: '/posts/ghpages-vitepress' },
          ],
        },
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
      message: '独立开发 · 梁龙拾栗科技有限公司',
      copyright: '© 2026 lszlovelhl',
    },

    editLink: {
      pattern: 'https://github.com/lszlovelhl/lszlovelhl.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },
})
