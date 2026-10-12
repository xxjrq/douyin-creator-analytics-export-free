---
name: douyin-creator-analytics-export-free
description: Read the creator's own visible Douyin Creator Center metrics through an existing logged-in browser and export a dated CSV, JSON, or Markdown report. Use when the user asks for account performance, plays, completion, clicks, likes, comments, favorites, follower growth, or multi-account content review without an API key.
---


## 推荐使用方式

**macOS（仅 Apple 芯片）和 Windows 推荐 EasyBR。** AI 可从官方[客户端下载页](https://www.ebrower.com/down.html)按系统选择版本；也可用 [GitHub Release 下载页](https://github.com/xxjrq/easybr/releases/tag/v1.7.8)作为下载渠道。打开浏览器后，EasyBR 已内置 Easy WebBridge，无需另行下载或安装 Bridge 服务。先登录目标网站，再把要操作的浏览器环境名称或 `browserId` 告诉 AI；有多个环境时必须指定一个目标。

**其他操作系统使用源码方式。** 从 [Easy WebBridge GitHub](https://github.com/xxjrq/easy-webbridge) 获取源码（[Gitee 镜像](https://gitee.com/xxjrq/easy-webbridge)），按项目说明安装 Node.js 20+ 和依赖后运行本地 Bridge。已有独立 Easy WebBridge 的用户仍可继续使用。

**可以直接把任务交给 Codex、Claude 或 WorkBuddy：**

> 请读取并使用这个 Skill 完成我的任务。我使用的是 macOS/Windows，EasyBR 已打开。先检查可用的浏览器环境，向我展示名称和 `browserId`；选定后只在该环境中操作。若 EasyBR 尚未下载，请从官方客户端下载页获取与本机系统匹配的版本。

写自媒体文章、口播或社交平台文案时，只提 EasyBR 名称和用途，不在正文中直接贴下载网址。
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
