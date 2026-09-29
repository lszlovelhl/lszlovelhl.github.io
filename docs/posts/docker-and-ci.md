---
title: Docker + CI：让项目从「能跑」到「能交付」
date: 2026-09-29
tags: [Docker, CI, 工程实践]
---

# Docker + CI：让项目从「能跑」到「能交付」

两个项目都补上了 Dockerfile + docker-compose + GitHub Actions CI。这一层没有新业务逻辑，但它是"能跑"和"能交付"的分界线。

## Dockerfile 的三个设计点

**1. 依赖分层缓存。** 先复制 `requirements.txt` 装依赖，再复制代码：

```dockerfile
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
```

依赖层不变时镜像构建走缓存，改代码只重建薄薄一层。

**2. 运行时与构建环境分离。** douyin_tool 需要 Playwright 的 Chromium：官方镜像 `python:3.11-slim` 装 `playwright install chromium` 会拉系统依赖，把它放进 RUN 而不是入口脚本，镜像体积和构建时长都可控。

**3. 数据卷与密钥分离。** 数据（SQLite / cookies / 配置）挂 `data:` 卷持久化，密钥只从 `.env` 注入，绝不 COPY 进镜像：

```yaml
services:
  app:
    volumes:
      - ./data:/app/data
      - ./cookies:/app/cookies
    env_file: .env
```

## GitHub Actions CI：每个 commit 都是证据

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt
      - run: python -m unittest discover tests -v
```

douyin_tool 38 项、promotion_agent 26 项单测全绿，badge 挂在 README 顶部——**仓库主页第一屏就有测试状态**，面试官不用 clone 就知道项目质量。

## 为什么这层对求职重要

- **可复现**：别人 clone 后 `docker compose up -d` 就能跑，不依赖我的电脑环境
- **可信任**：CI badge 是"持续绿"的证明，比简历里写"测试覆盖"可信
- **专业信号**：Docker + CI 是工程团队的标配，面试题项目带上它，等于提前用团队标准要求自己

> 面试可展开：Docker 分层缓存为什么能加速构建？CI 里为什么单独跑 unittest 而不是 pytest？——答：缓存命中率、零配置、标准库无依赖。
