---
title: 幂等防重：让 Agent 不再重复处理同一条消息
date: 2026-09-28
tags: [Agent, Python, 工程实践]
---

# 幂等防重：让 Agent 不再重复处理同一条消息

## 问题

推广申请处理 Agent 跑在飞书群里，运营同事会 @ 机器人发申请。一个真实场景：

> 用户把消息复制粘贴发了两遍，或机器人网络重试导致同一条消息被投递两次。

如果每次收到都调用 LLM 提取 → 发确认卡片 → 写表格，就会出现**重复卡片、重复记录**，还白烧两倍的 LLM 费用。

## 方案：消息指纹 + 状态机

对文本做 MD5 指纹，状态机三态流转：

- `pending`：已进入处理流程，等待人工确认 —— 重复提交直接拦截
- `confirmed`：已写入表格 —— 重复提交直接拦截并提示
- `rejected`：已驳回 —— 移除指纹，允许修改后重新提交

```python
def check_duplicate(self, text):
    h = self._text_hash(text)
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

## 关键细节

1. **指纹持久化**：写入 `data/processed_messages.json`，重启不丢。确认卡片回调时通过 `request_hash` 精确定位，避免并发消息互相覆盖。
2. **过期机制**：`pending` 超过 30 分钟自动释放——管理员忘记处理时，用户可以重新提交。
3. **短路省成本**：`process_text` 开头先查重，命中直接返回，**不调用 LLM**。

## 效果

- 重复提交 0 成本拦截（省 LLM 调用）
- 7 个单测覆盖三态流转、过期、持久化
- 确认/驳回与卡片回调闭环联动

> 完整代码见 [promotion_agent](https://github.com/lszlovelhl/promotion_agent)
