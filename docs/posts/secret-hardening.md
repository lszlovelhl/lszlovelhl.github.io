---
title: 密钥泄漏与修复：一次 API Key 安全治理实录
date: 2026-09-29
tags: [安全, 工程实践, .env]
---

# 密钥泄漏与修复：一次 API Key 安全治理实录

给帧间做安全排查时，发现 `pipeline.py` 里硬编码着一个真实的智谱 GLM API Key。这类问题在个人项目里极其常见，处理它值得完整记录一次。

## 问题：密钥写死在代码里

```python
# ❌ 错误示范
GLM_API_KEY = "d2bf********……真实 key 明文在代码里"
```

风险不只是"不美观"：代码会被 commit、push、分享，每多一个副本，密钥就多一个泄露面。

## 排查：先确认泄漏范围

动手改之前，先回答一个问题：**这个 key 已经泄到哪了？**

1. **git 历史**：`git log --all -S "key前缀"` 扫描——结果：128 个 commit 零命中，key 从未被提交过
2. **远程仓库**：检查 GitHub 远程（当时 PRIVATE）代码与数据文件——pipeline.py 无 key，data/ 只跟踪了 .gitkeep
3. **编译缓存**：`grep -r` 扫 .pyc——无残留
4. **全项目文本**：只剩 .env 与数据库（数据库存 provider key 是产品功能，不算泄漏）

结论：泄漏面 = 仅本地工作区文件，从未外流。

## 修复：三层改动

**1. 代码去硬编码。** 统一从配置读：

```python
# app/core/config.py
GLM_API_KEY = os.getenv("GLM_API_KEY", "")
```

```python
# pipeline.py —— 删掉硬编码，import 配置
from app.core.config import GLM_API_KEY
```

**2. 密钥进 .env（已被 gitignore 排除）。**

```bash
# backend/.env（本文件已被 .gitignore 排除，勿提交）
GLM_API_KEY=xxxx
```

**3. 数据目录整体忽略。** 数据库和备份 jsonl 里存着 provider key，加规则防止未来误提交：

```gitignore
# 数据目录整体（仅保留 .gitkeep 占位）
backend/data/*
!backend/data/.gitkeep
```

## 验证：改完必须证明改对了

- `python -m py_compile` 编译通过
- 项目虚拟环境导入：key 从 .env 加载成功、pipeline 读取一致、代码无残留
- `git check-ignore` 逐个验证 frames.db / 备份 / 运行时配置全部被忽略
- 转公开前复查：远程无 key、data/ 未跟踪——转公开安全

## 原则

- **密钥永远不进 git**：环境变量 + .env（gitignore 排除），代码里只有占位
- **改之前先查泄漏范围**：git log -S 是第一步，别凭感觉
- **验证用可复现命令**：check-ignore、加载断言，而不是"我检查过了"

> 面试可展开：GitHub 的 secret scanning 会扫已 push 的 key，但 git 历史里的 key 要自己用 `git log -S` 找——先查范围再决定要不要重置密钥。
