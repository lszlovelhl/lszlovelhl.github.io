<template>
  <section class="hh-wrap">
    <!-- 背景光晕 -->
    <div class="hh-glow hh-glow-1" aria-hidden="true"></div>
    <div class="hh-glow hh-glow-2" aria-hidden="true"></div>

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
  padding: 64px 24px 40px;
}

.hh-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(90px);
  opacity: 0.5;
}
.hh-glow-1 {
  width: 480px;
  height: 480px;
  top: -160px;
  left: -120px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.35), transparent 70%);
}
.hh-glow-2 {
  width: 420px;
  height: 420px;
  bottom: -140px;
  right: -100px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.18), transparent 70%);
}

/* ============ 网格背景 ============ */
.hh-grid {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 56px;
  align-items: center;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ============ 左：身份区 ============ */
.hh-left {
  animation: hh-fade-up 0.6s ease both;
}
.hh-avatar {
  width: 96px;
  height: 96px;
  border-radius: 20px;
  padding: 4px;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.55), rgba(103, 232, 249, 0.15));
  box-shadow:
    0 0 0 1px rgba(34, 211, 238, 0.35),
    0 8px 32px rgba(34, 211, 238, 0.18);
  margin-bottom: 22px;
}
.hh-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  display: block;
}
.hh-name {
  margin: 0 0 8px;
  font-size: 40px;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: 0.02em;
  line-height: 1.15;
}
.hh-role {
  margin: 0 0 18px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  background: linear-gradient(120deg, #22d3ee 0%, #67e8f9 45%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hh-bio {
  margin: 0 0 26px;
  font-size: 15px;
  line-height: 1.85;
  color: #a5b4c8;
  max-width: 460px;
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
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}
.hh-btn-brand {
  background: linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%);
  color: #06202a;
  border: 1px solid transparent;
}
.hh-btn-brand:hover {
  background: linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%);
  box-shadow: 0 6px 24px rgba(34, 211, 238, 0.35);
  transform: translateY(-1px);
}
.hh-btn-alt {
  border: 1px solid #22d3ee;
  color: #67e8f9;
  background: rgba(34, 211, 238, 0.07);
}
.hh-btn-alt:hover {
  background: rgba(34, 211, 238, 0.16);
  border-color: #67e8f9;
  box-shadow: 0 6px 24px rgba(34, 211, 238, 0.18);
  transform: translateY(-1px);
}

/* ============ 右：液态玻璃 terminal ============ */
.hh-right {
  animation: hh-fade-up 0.6s 0.15s ease both;
}
.hh-term {
  border-radius: 16px;
  background: rgba(17, 27, 48, 0.55);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid rgba(103, 232, 249, 0.16);
  box-shadow:
    0 24px 60px rgba(2, 6, 23, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  overflow: hidden;
}
.hh-term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(103, 232, 249, 0.12);
}
.hh-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.hh-dot-r { background: #ff5f57; }
.hh-dot-y { background: #febc2e; }
.hh-dot-g { background: #28c840; }
.hh-term-title {
  margin-left: 8px;
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;
  font-size: 12px;
  color: #8b9cb3;
}
.hh-term-body {
  padding: 18px 20px 20px;
  font-family: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace;
  font-size: 13.5px;
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
  max-width: 1080px;
  margin: 72px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.hh-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 22px 24px;
  border-radius: 16px;
  text-decoration: none;
  background: rgba(17, 27, 48, 0.45);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  backdrop-filter: blur(12px) saturate(130%);
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow:
    0 12px 32px rgba(2, 6, 23, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  animation: hh-fade-up 0.6s 0.3s ease both;
}
.hh-card:nth-child(2) { animation-delay: 0.38s; }
.hh-card:nth-child(3) { animation-delay: 0.46s; }
.hh-card:hover {
  transform: translateY(-3px);
  border-color: rgba(34, 211, 238, 0.45);
  box-shadow:
    0 18px 44px rgba(2, 6, 23, 0.5),
    0 0 24px rgba(34, 211, 238, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.hh-card-icon {
  font-size: 26px;
  line-height: 1;
}
.hh-card-title {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.45;
}
.hh-card-desc {
  font-size: 13px;
  line-height: 1.75;
  color: #8b9cb3;
}

/* ============ 动画 ============ */
@keyframes hh-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
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

/* ============ 移动端 ============ */
@media (max-width: 768px) {
  .hh-wrap {
    padding: 36px 20px 32px;
  }
  .hh-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .hh-left {
    text-align: center;
  }
  .hh-avatar {
    width: 84px;
    height: 84px;
    margin: 0 auto 18px;
  }
  .hh-name {
    font-size: 32px;
  }
  .hh-role {
    font-size: 16px;
  }
  .hh-bio {
    margin-left: auto;
    margin-right: auto;
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
    margin-top: 44px;
  }
}
</style>
