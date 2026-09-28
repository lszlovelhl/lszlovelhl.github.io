# 项目

## 帧间 · 爆款视频拆解与创作系统（Web / PWA）

独立全栈开发 · 2026.03 - 2026.08

针对 MCN 团队编导 / 运营人力成本高的痛点，设计并开发 AI 视频拆解 + 元素沉淀 + 智能创作系统。

- 技术栈：React 18 + Vite + TypeScript / FastAPI + SQLAlchemy + PostgreSQL / DeepSeek API / Whisper / ffmpeg / Docker
- 五层拆解架构：L1 外围建档 → L2 宏观扫描 → L3 结构拆解 → L4.5 内容精拆 → L5 元素提炼
- 多模态理解：Whisper 转写 + 分段抽帧视觉理解
- 爆款元素库：跨片检索、质控、二次创作带入
- 模型路由：本地 Ollama qwen3.5 与云端模型按质量 / 成本路由

## 抖音数据监控工具

独立开发 · 2026.09

- 技术栈：Playwright + FastAPI + APScheduler + SQLite
- 多账号并行扫描、登录态持久化、阈值告警、新视频检测、评论关键词识别
- 飞书表格 upsert 增量同步、ECharts 趋势图、CSV 导出
- Docker / CI，38 项单元测试

仓库：[github.com/lszlovelhl/douyin_tool](https://github.com/lszlovelhl/douyin_tool)

## 推广申请处理 Agent（Master-Sub Agent 架构）

独立开发 · 2026.09

- 飞书群机器人自动化「提取 → 校验 → 人工确认 → 写表 → 汇报」全链路
- 规则正则优先 + LLM 兜底双层提取；全维度校验（金额 / 笔数 / 日期 / 档位 / 重复申请）
- 消息幂等防重、提取准确率评测双模式 P/R/F1 100%
- Docker / CI，26 项单元测试

仓库：[github.com/lszlovelhl/promotion_agent](https://github.com/lszlovelhl/promotion_agent)
