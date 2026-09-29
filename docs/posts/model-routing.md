---
title: 模型路由：业务代码只认"档位"，不认厂商
date: 2026-10-01
tags: [LLM, 架构设计, FastAPI, 工程实践]
---

# 模型路由：业务代码只认"档位"，不认厂商

帧间系统要调 LLM 的地方很多：五层拆解、创作台对话、成稿、扩写、视觉理解。如果每个业务点都硬编码"用 DeepSeek"或"用 qwen3-max"，一旦想换模型、比价、降成本，就得改一堆代码。

## 核心设计：档位（alias）隔离厂商

业务代码不感知服务商，只传一个**逻辑档位**：

```python
ROUTING_CHOICES = [
    {"key": "free_flash", "alias": "flash", "label": "免费档（默认）"},
    {"key": "paid_pro",   "alias": "pro",   "label": "进阶档"},
]
```

- `flash`：免费/低价模型（glm-4-flash、qwen-turbo），质量已按统一契约对齐
- `pro`：更强推理模型（本地 qwen3.5 或云端付费模型），耗时更长
- `vision`：视觉模型（Qwen VL、GLM-4V）

服务商接入用模板预置——DeepSeek、火山方舟、Kimi、通义千问、智谱、OpenAI 都是 OpenAI 兼容协议，填 key 即用：

```python
PROVIDER_TEMPLATES = {
    "deepseek": {
        "base_url": "https://api.deepseek.com",
        "models": [
            {"id": "deepseek-chat",    "kind": "flash", "label": "DeepSeek Chat (V3)"},
            {"id": "deepseek-reasoner","kind": "pro",   "label": "DeepSeek Reasoner (R1)"},
        ],
        "balance_api": {"method": "GET", "path": "/user/balance"},
    },
    # 豆包 / Kimi / 千问 / GLM / OpenAI ...
}
```

`resolve_alias(alias)` 是唯一网关：给定档位 → 按 provider priority 选实际服务商+模型。

## 三个实际收益

1. **成本控制**：默认档位是免费档，创作台、拆解默认都走免费模型；用户想提质量再手动切 pro 档
2. **一键换商**：某家涨价/限流，改 provider priority 就行，业务零改动
3. **统一契约**：所有厂商输出先过同一套 JSON Schema 校验，模型换来换去，下游代码不用动

## 本地模型也是"一个档位"

本地 Ollama（qwen3.5）不是独立体系，而是作为 pro 档的候选之一挂在路由里：`OLLAMA_URL = http://localhost:11434/v1/chat/completions`。业务照样传档位，网关决定这次走本地还是云端。

## 配套：运行时配置免重启生效

档位偏好放 JSON 运行时配置（`runtime_config.json`），不走数据库——"用户偏好"级别的小设置，为一个开关引入 alembic 迁移不值得。改完刷新即生效，适合后台"模型管理"页实时切换。

> 这是面试里值得展开的题：怎么设计一个多厂商、多档位、可热切换的 LLM 网关。

## 相关项目

- [帧间 · 爆款视频拆解与创作系统](/projects/) —— 本文为该项目实战复盘（代码仓库暂未公开，欢迎交流）
