---
title: 飞书表格 upsert 与脏数据防御：当"3.7万"混进 video_id 列
date: 2026-09-30
tags: [Python, 飞书, 数据工程, 踩坑复盘]
---

# 飞书表格 upsert 与脏数据防御：当"3.7万"混进 video_id 列

## 需求

抖音数据监控工具要把扫描到的视频记录同步到飞书电子表格。最朴素的实现是"每次全量写入"，但表格会越写越乱、重复行越来越多。正确做法是 **upsert（存在更新、不存在追加）**。

## 实现：video_id → 行号映射

懒加载全表建映射，新视频追加并更新索引：

```python
def _load_video_rows(self):
    rows = self.sheet.get_values(A2:I5000)   # 全表
    self._video_row_map = {
        row.video_id: row_number
        for row in rows if VIDEO_ID_RE.match(str(row.video_id))
    }

def append_video_record(self, record):
    row_no = self._video_row_map.get(record.video_id)
    if row_no:
        self._update_row(row_no, record)     # 已存在 → 更新原行
    else:
        self._append_row(record)             # 新视频 → 追加
        self._video_row_map[record.video_id] = new_row_no
```

## 坑：真实表格里全是"脏 ID"

上线前对着真实表格一测——**"3.7万"、"2193"、"赞2.5万"** 这类错位历史数据混在 video_id 列里（大概是以前人工复制粘贴错列留下的）。它们会被当成合法 video_id 建索引：

- 新视频的 ID 若和脏数据"撞车"，会更新到错误行
- 索引里塞满垃圾 key，内存和查找效率都受影响

解法：防御性正则过滤，**只让纯数字 ID 参与 upsert**：

```python
VIDEO_ID_RE = re.compile(r'^\d{6,}$')   # 抖音视频 ID 是 19 位纯数字
```

遇到非法 video_id 直接跳过不写入，绝不让脏数据进映射。

## 通用教训

1. **真实业务数据永远比想象的脏**。别人填过的表、历史迁移的数据，字段可能完全错位——上线前先扫一遍真实数据，别拿干净测试数据想当然
2. **防御性校验写在数据入口**，不写在业务逻辑里：非法数据在进系统前被拦掉，而不是让下游每个函数都提防它
3. upsert 类逻辑必须有**索引刷新**机制（强制重载全表），因为外部可能有人手动改表

> 完整代码见 [douyin_tool](https://github.com/lszlovelhl/douyin_tool) · `lark_client.py`
