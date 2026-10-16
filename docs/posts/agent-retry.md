---
title: 让 Agent 学会"重试"：幂等、退避与故障恢复实践
date: 2026-10-16
tags: [Agent, 可靠性, 工程实践]
---

# 让 Agent 学会"重试"：幂等、退避与故障恢复实践

Agent 挂在群里值班，最怕的不是被骂，是**同一件事干两遍**，或者**干到一半死了没下文**。这篇讲我给 Agent 装的三层防护：幂等（重复无害）、退避（失败可控）、故障恢复（死而复生）。

## 第一层：幂等——重复无害

Agent 收到消息，首先要回答："这条消息我是不是处理过了？"

真实场景：用户把申请复制粘贴发了两遍；或机器人网络重试导致同一条消息被投递两次。不防的话，每次收到都调 LLM 提取 → 发确认卡片 → 写表格——重复卡片、重复记录，还白烧两倍 LLM 费用。

解法：**消息指纹 + 状态机**。

```python
def check_duplicate(self, text):
    h = self._text_hash(text)          # MD5 指纹
    rec = self._processed.get(h)
    if not rec:
        return None
    if rec.get("status") == "confirmed":
        return {"duplicate": True, "message": "该申请已处理并写入表格"}
    if rec.get("status") == "pending":
        # 超过 30 分钟视为过期，允许重新提交
        if time.time() - rec.get("time", 0) > PENDING_EXPIRE_SECONDS:
            del self._processed[h]
            return None
        return {"duplicate": True, "message": "该申请正在等待确认"}
    return None
```

状态机三态：`pending`（处理中，重复拦截）、`confirmed`（已入表，重复拦截）、`rejected`（已驳回，移除指纹，允许改后重提）。

幂等的本质：**同一个输入，无论执行几次，效果都等于执行一次**。做产品、做 Agent 都要有这个意识——尤其在会重试的系统里。

## 第二层：退避——失败要可控

重试不是"失败就再来一次"。盲目的重试有两个死法：把系统打死（风暴）、烧钱烧到成功为止（大模型 API 场景尤其致命）。

标准做法是**指数退避 + 抖动**：

```python
import random, time

def retry_with_backoff(func, max_attempts=3, base=1.0, cap=8.0):
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            sleep = min(cap, base * (2 ** attempt)) * (1 + random.uniform(0, 0.5))
            time.sleep(sleep)
```

要点：

- **上限必须设**：重试 3 次封顶，不是无限重试。LLM 返回异常格式时，"重试到成功"等于"烧钱到账单爆炸"。
- **抖动必须有**：多个 Agent 同时失败，如果没有随机抖动，重试会同步撞击，把服务再打死一遍。
- **调用前校验，调用后校验**：参数不对的调用，第一遍就注定失败，重试没有意义——在重试之前先检查输入，把"注定失败的调用"挡在门外。

## 第三层：故障恢复——死了要能活

Agent 是常驻进程，crash 是常态。我用的三件套：

1. **状态持久化**：指纹表、处理进度写进 SQLite / PostgreSQL，不是内存字典。进程重启，状态还在——重启前处理到一半的消息，重启后能接着走。
2. **幂等键落库**：消息指纹作为主键，写入时 `ON CONFLICT DO NOTHING`。重启后重复投递的消息会被数据库挡回来，而不是再处理一遍。
3. **健康检查 + 自动拉起**：CI 之外，运行环境要有监控——Agent 挂了要能重启（supervisor / systemd / 云平台容器编排都行）。没有监控的单人服务，等于"挂了就是挂了，直到用户发现"。

## 一个真实的故障时间线

推广申请处理 Agent 上线后遇到过的典型故障：

```
10:02  用户发申请，Agent 调 LLM 提取
10:02  网络抖动，LLM 超时 → 触发重试（指数退避 1.2s）
10:03  重试成功，发确认卡片
10:04  用户点确认，写入表格（幂等键已存在？→ 无，正常写入）
10:05  用户又补发一遍原文 → 指纹命中 pending/confirmed → 拦截并提示
```

整个过程用户感知是"没重复、没丢单"。这就是三层防护合力的效果。

## 总结

Agent 的可靠性不是写出来的，是**测出来的 + 兜出来的**：

- 幂等挡"重复"（指纹 + 状态机 + 数据库唯一键）
- 退避挡"风暴"（指数退避 + 抖动 + 重试上限）
- 持久化挡"死亡"（状态落库 + 自动拉起）

给 Agent 装上这三层，它才配叫"值班的同事"，而不是"偶尔能用的玩具"。
