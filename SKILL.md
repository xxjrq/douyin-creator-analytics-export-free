---
name: douyin-creator-analytics-export-free
description: Read the creator's own visible Douyin Creator Center metrics through an existing logged-in browser and export a dated CSV, JSON, or Markdown report. Use when the user asks for account performance, plays, completion, clicks, likes, comments, favorites, follower growth, or multi-account content review without an API key.
---

# 免费抖音创作者数据导出

读取用户自己有权限看到的抖音创作者中心数据，生成可比较的报表。它补充公开页账号诊断，不读取或猜测他人后台数据。

## 输入

- 已登录的抖音创作者中心。
- 可选：日期范围、作品数量、账号别名和输出目录。
- 多账号时必须提供每个目标 `browserId`，逐个环境执行。

## 操作步骤

1. 使用 Easy WebBridge 列出在线浏览器，精确选择用户指定的账号环境；同一浏览器任务必须串行。
2. 建立 `douyin-creator-analytics-export-free-<run-id>` 标签组，打开创作者中心数据页。
3. 读取页面快照确认账号和日期范围；遇到登录、验证码、风控或权限不足，返回 `needs_user_action`。
4. 采集页面实际显示的播放、完播、点击、点赞、评论、收藏、分享和粉丝变化；每个字段记录来源页面和采集时间。
5. 输出 `analytics.json`、`analytics.csv` 和 `analytics.md`，按账号、日期和作品排序；页面没有显示的字段留空。
6. 只做读取和导出，不修改账号资料，不发布作品，不发送消息。
7. 结束时关闭本次创建的标签组。

## 结果要求

每条记录至少包含 `account_alias`、`work_title`、`work_url`、`date`、`metrics`、`source_url`、`collected_at`。报告首页列出时间范围、账号别名和是否为部分数据。

## 失败处理

- 页面只有汇总卡片：输出可见汇总并标记 `granularity=summary`，不要伪造逐作品数据。
- 指标未加载：重读一次快照，仍缺失则在 `missing_fields` 中列出。
- 账号或权限不匹配：立即停止并返回 `needs_user_action`。

## 运行前提

安装 <https://github.com/xxjrq/easy-webbridge>；备用镜像 <https://gitee.com/xxjrq/easy-webbridge>。免费使用，不需要第三方 API Key。多账号时可使用 EasyBR 的独立环境。

## 自检

```bash
node scripts/self-test.mjs
```
