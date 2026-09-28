---
title: 从 SQLite 迁移踩坑到多账号并行：抖音监控工具工程化复盘
date: 2026-09-29
tags: [Python, SQLite, 爬虫, 工程实践]
---

# 从 SQLite 迁移踩坑到多账号并行：抖音监控工具工程化复盘

抖音数据监控工具原来用 JSON 文件存扫描历史，单账号串行扫描。这轮工程化做了四件事，踩了三个坑。

## 1. SQLite 迁移：两个隐蔽的坑

**坑一：非重入锁死锁。** `_get_conn()` 与外层 `_conn_lock` 嵌套，RLock 变成不可重入，首次并发写直接死锁。解法：拆成 `_init_lock`（仅初始化）+ `_conn_lock`（每次读写事务串行）双锁。

**坑二：主键用毫秒时间戳导致数据互相覆盖。** `INSERT OR REPLACE` 用 `int(time.time()*1000)` 当主键，同一毫秒内多条告警互相覆盖——单测测出 205 条只剩 11 条。解法：`SELECT MAX(id)` 单调递增主键。

**坑三：隐藏的重复函数定义。** `get_video_trend` 定义了两次，后者覆盖前者，导致 `limit` 参数失效、趋势图字段恒为空。合并为单函数。

## 2. 多账号并行扫描

`ThreadPoolExecutor` 每账号独立 Crawler 实例，并发上限 3 防风控，进度更新加锁，账号级失败保留浏览器重启重试。

## 3. 飞书表格 upsert

懒加载全表建 `video_id → 行号` 映射：已存在更新原行、新视频追加。用 `^\d{6,}$` 过滤脏数据——真实表格里混着「3.7万」「2193」这类错位历史数据，只让纯数字 ID 参与 upsert。

## 4. 可观测性与交付

- 启动自检：依赖 / cookies / 飞书配置 / webhook / 数据目录 / SQLite 全链路检查
- Docker + GitHub Actions CI，38 项单测

## 收获

数据库设计时主键策略要想清楚；并发改造前先跑单测建立行为基线；真实业务数据里到处都是脏数据，防御性过滤是刚需。

> 完整代码见 [douyin_tool](https://github.com/lszlovelhl/douyin_tool)
