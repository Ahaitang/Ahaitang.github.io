# 博客页面美化设计文档

**日期**：2026-05-16
**项目**：AHaiTang's Blog (Hugo + PaperMod)
**目标**：在保持 PaperMod 基调的基础上，通过 CSS + 轻量 JS 实现清新现代的视觉提升

---

## 概述

对博客进行全面视觉美化，风格定位"清新现代"：保持黑白灰配色不变，通过排版优化、微动效、阴影层次和间距调整提升整体精致度。不改动任何 HTML 模板结构。

## 设计约束

- **配色**：保持现有黑白灰，不添加强调色
- **动效**：适度 — 悬停过渡 + 滚动淡入 + 点击反馈
- **排版**：针对中文优化行高、段间距
- **模板**：不改动 HTML 模板文件（`single.html`、`list.html` 等），仅通过 CSS 覆盖和一个轻量 JS 文件实现

## 1. 中文排版优化

新建 `assets/css/extended/typography.css`。

### 正文排版

| 属性 | 当前值 | 优化值 | 说明 |
|------|--------|--------|------|
| 行高 | 1.6 | 1.8 | 中文字符密度高，需要更大行距 |
| 段间距 | 默认 | 1.2em | 段落间呼吸感 |
| 正文字号 | 16px | 17px | 略大更适合中文 |
| 字间距 | 0 | 0.02em | 微调提升疏朗感 |

### 引用块 (blockquote)

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 左边框 | 3px 灰色 | 3px `var(--secondary)` |
| 背景 | 无 | `rgba(0,0,0,0.02)`，暗色模式 `rgba(255,255,255,0.03)` |
| 内边距 | 默认 | 左 20px，上下 12px |
| 圆角 | 无 | 右侧 4px |

### 代码块

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 圆角 | 默认(小) | 8px |
| 边框 | 无 | 1px `var(--border)` |
| 内边距 | 默认 | 上下 16px，左右 20px |
| 复制按钮 | 默认样式 | 悬停时淡入显示 |

## 2. 文章列表卡片美化

新建 `assets/css/extended/cards.css`。

### 卡片样式

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 边框 | 无 | 1px `var(--border)` |
| 圆角 | 8px | 12px |
| 默认阴影 | 无 | `0 1px 3px rgba(0,0,0,0.04)` |
| 悬停阴影 | 无 | `0 8px 24px rgba(0,0,0,0.08)` |
| 悬停位移 | 无 | `translateY(-4px)` |
| 过渡 | 无 | `all 0.3s ease` |
| 卡片间距 | 默认 | 底部 20px |
| 摘要文字颜色 | 与标题同色 | `var(--secondary)` |

### 首篇文章

`.first-entry` 样式与普通卡片统一，去除突兀差异。

### 暗色模式适配

暗色模式下阴影透明度自动降低（`rgba(0,0,0,0.15)` → `rgba(0,0,0,0.3)`），卡片边框使用 `var(--border)`。

## 3. 首页 Profile 区域美化

修改 `assets/css/common/profile-mode.css`。

### 头像

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 边框 | 无 | 2px 白色 + `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` |
| 悬停 | 无 | `scale(1.05)`，过渡 0.3s |

### 导航按钮

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 背景 | `var(--tertiary)` 纯色块 | 透明背景 + 1px 边框 `var(--tertiary)` |
| 圆角 | 8px | 20px（胶囊形） |
| 间距 | margin 8px | 12px |
| 悬停背景 | 无变化 | 填充 `var(--tertiary)` |
| 悬停位移 | 无 | `translateY(-2px)` |
| 过渡 | 无 | `all 0.25s ease` |
| 点击反馈 | `scale(0.96)` | 保持不变 |

## 4. TOC 目录美化

在 `typography.css` 中添加。

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 左侧装饰 | 无 | 2px 竖线 `var(--border)` |
| 链接行间距 | 紧凑 | 2em |
| 链接悬停 | 默认 | 颜色过渡 0.2s |

## 5. 动效系统

### 5.1 悬停过渡（纯 CSS）

在 `assets/css/extended/animations.css` 中定义全局过渡规范：

| 元素 | 效果 | 时长 |
|------|------|------|
| 文章卡片 | 上浮 + 阴影扩散 | 0.3s ease |
| 首页按钮 | 背景填充 + 上浮 | 0.25s ease |
| 链接 | 颜色渐变 | 0.2s ease |
| 头像 | scale(1.05) | 0.3s ease |

### 5.2 滚动淡入（JS - IntersectionObserver）

新建 `static/js/scroll-reveal.js`（约 20 行）。

**行为**：
- 页面加载后，为 `.post-entry` 和 `.post-content > *` 添加 `.reveal` 类
- 初始状态：`opacity: 0; transform: translateY(20px)`
- 进入视口（10% 可见）时添加 `.revealed`：`opacity: 1; transform: translateY(0)`，过渡 0.5s
- `rootMargin: '-50px'` 避免首屏内容闪烁

**CSS 配合**：在 `animations.css` 中定义 `.reveal` 和 `.revealed` 样式。

**引入方式**：在 `layouts/partials/extend_footer.html` 中添加 `<script src="/js/scroll-reveal.js"></script>`。

## 6. 全局细节

### 页脚

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 分隔线 | 无 | `border-top: 1px solid var(--border)` |
| 上方内边距 | 默认 | 40px |
| 文字大小 | 默认 | 0.85em |
| 文字颜色 | 默认 | `var(--secondary)` |

### 面包屑导航

| 属性 | 当前 | 优化后 |
|------|------|--------|
| 颜色 | 默认 | `var(--secondary)` |
| 字号 | 默认 | 0.9em |
| 与标题间距 | 默认 | 8px |

## 文件变更清单

| 文件 | 操作 | 职责 |
|------|------|------|
| `assets/css/extended/typography.css` | 新建 | 中文排版、引用块、代码块、TOC、页脚、面包屑 |
| `assets/css/extended/cards.css` | 新建 | 文章列表卡片悬停/阴影/间距 |
| `assets/css/extended/animations.css` | 新建 | 滚动淡入 CSS + 全局过渡声明 |
| `assets/css/common/profile-mode.css` | 修改 | 首页头像/按钮美化 |
| `static/js/scroll-reveal.js` | 新建 | IntersectionObserver 滚动淡入 |
| `layouts/partials/extend_footer.html` | 修改 | 引入 scroll-reveal.js |

## 不做的事

- 不改动任何 HTML 模板布局结构
- 不添加强调色/品牌色
- 不添加丰富动效（打字机、呼吸光效等）
- 不引入外部 CSS/JS 库
- 不修改主题核心文件（`themes/PaperMod/` 下的文件）
