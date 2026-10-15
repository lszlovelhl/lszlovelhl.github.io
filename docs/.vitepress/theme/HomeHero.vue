<script setup>
import { onMounted } from 'vue'

// 项目卡片滚动进入视口时播放淡入动画；IO 不可用时不阻塞内容可见
onMounted(() => {
  const cards = document.querySelectorAll('.hh-card')
  if (!cards.length || !('IntersectionObserver' in window)) return
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hh-in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  cards.forEach((card) => io.observe(card))
})
</script>

<template>
  <section class="hh-wrap">
    <!-- 背景光晕 -->
    <div class="hh-glow hh-glow-1" aria-hidden="true"></div>
    <div class="hh-glow hh-glow-2" aria-hidden="true"></div>
    <div class="hh-glow hh-glow-3" aria-hidden="true"></div>

    <div class="hh-grid">
      <!-- 左：身份区 -->
      <div class="hh-left">
        <div class="hh-avatar">
          <img src="/logo.png" alt="梁龙" />
        </div>
        <h1 class="hh-name">梁龙</h1>
        <p class="hh-role">独立全栈开发者 · AI Agent 应用开发</p>
        <p class="hh-bio">
          一个人开发「帧间」爆款视频拆解系统，做过抖音数据监控工具与推广申请处理 Agent。
          这里记录我的工程实践与踩坑。
        </p>
        <div class="hh-actions">
          <a class="hh-btn hh-btn-brand" href="/projects/">项目仓库</a>
          <a class="hh-btn hh-btn-alt" href="/posts/">技术博客</a>
        </div>
      </div>

      <!-- 右：液态玻璃 terminal 窗 -->
      <div class="hh-right">
        <div class="hh-term">
          <div class="hh-term-bar">
            <span class="hh-dot hh-dot-r"></span>
            <span class="hh-dot hh-dot-y"></span>
            <span class="hh-dot hh-dot-g"></span>
            <span class="hh-term-title">zhenjian@lianglong: ~</span>
          </div>
          <div class="hh-term-body">
            <div class="hh-line"><span class="hh-prompt">$</span>&nbsp;whoami</div>
            <div class="hh-line hh-out">梁龙 · 独立全栈开发者 · 单人作战</div>
            <div class="hh-line"><span class="hh-prompt">$</span>&nbsp;ls&nbsp;~/projects</div>
            <div class="hh-line hh-out"><span class="hh-accent">帧间</span>&nbsp;&nbsp;爆款视频拆解与创作系统</div>
            <div class="hh-line hh-out"><span class="hh-accent">douyin-monitor</span>&nbsp;&nbsp;抖音数据监控工具</div>
            <div class="hh-line hh-out"><span class="hh-accent">promotion-agent</span>&nbsp;&nbsp;推广申请处理 Agent</div>
            <div class="hh-line"><span class="hh-prompt">$</span>&nbsp;cat&nbsp;~/stack.txt</div>
            <div class="hh-line hh-out">Python&nbsp;·&nbsp;FastAPI&nbsp;·&nbsp;PostgreSQL&nbsp;·&nbsp;LangChain</div>
            <div class="hh-line hh-out">Vue3&nbsp;·&nbsp;Playwright&nbsp;·&nbsp;DeepSeek&nbsp;API</div>
            <div class="hh-line hh-out hh-warn"># 本地不跑大模型，算力走云端</div>
            <div class="hh-line"><span class="hh-prompt">$</span>&nbsp;<span class="hh-cursor"></span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目玻璃卡片 -->
    <div class="hh-features">
      <a class="hh-card" href="/projects/">
        <span class="hh-card-icon">🎬</span>
        <span class="hh-card-title">帧间 · 爆款视频拆解与创作系统</span>
        <span class="hh-card-desc">
          React + FastAPI + PostgreSQL 全栈，AI 自动拆解视频 + 元素沉淀 + 智能创作，MCN 编导效率提升。
        </span>
      </a>
      <a class="hh-card" href="/projects/">
        <span class="hh-card-icon">📊</span>
        <span class="hh-card-title">抖音数据监控工具</span>
        <span class="hh-card-desc">
          Playwright + FastAPI + SQLite，多账号并行采集、阈值告警、飞书表格自动同步，38 项单测覆盖。
        </span>
      </a>
      <a class="hh-card" href="/projects/">
        <span class="hh-card-icon">🤖</span>
        <span class="hh-card-title">推广申请处理 Agent</span>
        <span class="hh-card-desc">
          Master-Sub Agent 架构，飞书群机器人自动化「提取→校验→确认→写表」，幂等防重 + LLM 兜底，提取准确率 100%。
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
/* ============ 容器 ============ */
.hh-wrap {
  position: relative;
  overflow: hidden;
  padding: 88px 24px 56px;
}

.hh-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(100px);
  opacity: 0.75;
}
.hh-glow-1 {
  width: 620px;
  height: 620px;
  top: -220px;
  left: -180px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.45), transparent 70%);
  animation: hh-drift 14s ease-in-out infinite alternate;
}
.hh-glow-2 {
  width: 560px;
  height: 560px;
  bottom: -200px;
  right: -160px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.26), transparent 70%);
  animation: hh-drift 18s ease-in-out infinite alternate-reverse;
}
.hh-glow-3 {
  width: 460px;
  height: 460px;
  top: 26%;
  right: 24%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
  animation: hh-drift 22s ease-in-out infinite alternate;
}

/* ============ 网格背景 ============ */
.hh-grid {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 64px;
  align-items: center;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ============ 左：身份区 ============ */
.hh-left {
  animation: hh-fade-up 0.7s var(--hh-spring) backwards;
}
.hh-avatar {
  width: 96px;
  height: 96px;
  border-radius: 24px;
  padding: 4px;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.65), rgba(103, 232, 249, 0.2));
  box-shadow:
    0 0 0 1px rgba(34, 211, 238, 0.45),
    0 0 30px rgba(34, 211, 238, 0.25),
    0 16px 48px rgba(2, 6, 23, 0.45);
  margin-bottom: 24px;
}
.hh-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  display: block;
}
.hh-name {
  position: relative;
  margin: 0 0 8px;
  font-size: clamp(42px, 5vw, 56px);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: 0.01em;
  line-height: 1.12;
}
/* 名字下方青色渐变装饰线 */
.hh-name::after {
  content: '';
  display: block;
  width: 56px;
  height: 4px;
  margin-top: 12px;
  border-radius: 2px;
  background: linear-gradient(90deg, #22d3ee, #67e8f9, transparent);
}
.hh-role {
  margin: 0 0 20px;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
  background: linear-gradient(120deg, #22d3ee 0%, #67e8f9 45%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hh-bio {
  margin: 0 0 30px;
  font-size: 16px;
  line-height: 1.85;
  color: #a5b4c8;
  max-width: 480px;
}
.hh-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* ============ 按钮 ============ */
.hh-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 148px;
  padding: 0 20px;
  line-height: 42px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 21px;
  text-decoration: none;
  transition:
    transform 0.3s var(--hh-spring),
    box-shadow 0.3s var(--hh-spring),
    background 0.3s var(--hh-spring),
    border-color 0.3s var(--hh-spring);
}
.hh-btn-brand {
  background: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%);
  color: #06202a;
  border: 1px solid transparent;
}
.hh-btn-brand:hover {
  background: linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%);
  color: #04212a;
  box-shadow: 0 8px 28px rgba(34, 211, 238, 0.4);
  transform: translateY(-2px) scale(1.02);
}
.hh-btn-alt {
  border: 1px solid #22d3ee;
  color: #67e8f9;
  background: rgba(34, 211, 238, 0.07);
}
.hh-btn-alt:hover {
  background: rgba(34, 211, 238, 0.18);
  border-color: #67e8f9;
  box-shadow: 0 8px 28px rgba(34, 211, 238, 0.22);
  transform: translateY(-2px) scale(1.02);
}

/* ============ 右：液态玻璃 terminal ============ */
.hh-right {
  animation: hh-fade-up 0.7s 0.18s var(--hh-spring) backwards;
}
.hh-term {
  position: relative;
  border-radius: 20px;
  background: rgba(30, 41, 66, 0.42);
  -webkit-backdrop-filter: blur(28px) saturate(170%);
  backdrop-filter: blur(28px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 28px 70px rgba(2, 6, 23, 0.6),
    0 0 60px rgba(34, 211, 238, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 0 60px rgba(103, 232, 249, 0.04);
  overflow: hidden;
}
/* 玻璃噪点纹理，增强材质感 */
.hh-term::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
.hh-term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.hh-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.hh-dot-r { background: #ff5f57; }
.hh-dot-y { background: #febc2e; }
.hh-dot-g { background: #28c840; }
.hh-term-title {
  margin-left: 8px;
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;
  font-size: 12px;
  color: #94a3b8;
}
.hh-term-body {
  padding: 20px 22px 22px;
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.95;
}
.hh-line {
  white-space: nowrap;
  color: #67e8f9;
}
.hh-out {
  color: #cbd5e1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hh-prompt {
  color: #22d3ee;
  font-weight: 700;
}
.hh-accent {
  color: #67e8f9;
}
.hh-warn {
  color: #f59e0b;
}
.hh-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 2px;
  vertical-align: -2px;
  background: #67e8f9;
  animation: hh-blink 1.1s steps(2, start) infinite;
}

/* ============ features 玻璃卡片 ============ */
.hh-features {
  position: relative;
  max-width: 1120px;
  margin: 80px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.hh-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 24px 26px;
  border-radius: 20px;
  text-decoration: none;
  background: rgba(30, 41, 66, 0.38);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 16px 40px rgba(2, 6, 23, 0.4),
    0 0 40px rgba(34, 211, 238, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition:
    transform 0.35s var(--hh-spring),
    border-color 0.35s var(--hh-spring),
    box-shadow 0.35s var(--hh-spring),
    background 0.35s var(--hh-spring);
}
.hh-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
}
/* 滚动进入视口后播放淡入（由 IO 加 .hh-in 触发，不触发也可见） */
.hh-card.hh-in {
  animation: hh-fade-up 0.7s var(--hh-spring) backwards;
}
.hh-card.hh-in:nth-child(2) {
  animation-delay: 0.1s;
}
.hh-card.hh-in:nth-child(3) {
  animation-delay: 0.2s;
}
.hh-card:hover {
  transform: translateY(-5px) scale(1.015);
  border-color: rgba(103, 232, 249, 0.45);
  background: rgba(38, 52, 84, 0.46);
  box-shadow:
    0 24px 56px rgba(2, 6, 23, 0.55),
    0 0 40px rgba(34, 211, 238, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.hh-card-icon {
  font-size: 28px;
  line-height: 1;
}
.hh-card-title {
  font-size: 15.5px;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.45;
}
.hh-card-desc {
  font-size: 13.5px;
  line-height: 1.75;
  color: #94a3b8;
}

/* ============ 动画 ============ */
@keyframes hh-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes hh-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
/* 背景光晕缓慢浮动 */
@keyframes hh-drift {
  from { transform: translate(0, 0); }
  to { transform: translate(24px, 18px); }
}

/* 系统开启「减弱动态效果」时禁用入场动画，保证内容立即可见 */
@media (prefers-reduced-motion: reduce) {
  .hh-left,
  .hh-right,
  .hh-card.hh-in,
  .hh-glow {
    animation: none;
  }
  .hh-cursor {
    animation: none;
    opacity: 1;
  }
}

/* ============ 移动端 ============ */
@media (max-width: 768px) {
  .hh-wrap {
    padding: 44px 20px 36px;
  }
  .hh-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .hh-left {
    text-align: center;
  }
  .hh-avatar {
    width: 88px;
    height: 88px;
    margin: 0 auto 20px;
  }
  .hh-name {
    font-size: clamp(32px, 8vw, 40px);
  }
  .hh-name::after {
    margin-left: auto;
    margin-right: auto;
  }
  .hh-role {
    font-size: 16px;
  }
  .hh-bio {
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
  }
  .hh-actions {
    justify-content: center;
  }
  .hh-term-body {
    font-size: 12px;
    line-height: 1.85;
    padding: 14px 14px 16px;
    overflow-x: auto;
  }
  .hh-features {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 48px;
  }
}
</style>
