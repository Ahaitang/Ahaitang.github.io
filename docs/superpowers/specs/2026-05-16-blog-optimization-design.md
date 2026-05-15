# 博客全面优化设计文档

**日期**：2026-05-16
**项目**：AHaiTang's Blog (Hugo + PaperMod)
**目标**：按优先级逐步修复 SEO、性能、安全和配置问题

---

## 概述

对 Hugo 博客进行 5 个阶段的渐进式优化，每个阶段独立可部署，按紧急程度排序。

## 阶段 1：紧急修复

### 1.1 修复 robots.txt Sitemap URL

- **问题**：`public/robots.txt` 中 Sitemap 指向 `http://localhost:1313/sitemap.xml`，因为本地开发时 `baseURL` 被覆盖。
- **方案**：`public/` 是构建产物，不应纳入 git。将 `public/` 加入 `.gitignore` 并从 git 追踪移除。生产构建使用 `hugo.yaml` 的 `baseURL: "https://ahaitang.github.io/"` 即可自动生成正确的 robots.txt。
- **验证**：生产构建后检查 `public/robots.txt` 中 Sitemap URL 是否正确。

### 1.2 修复分类拼写错误

- **文件**：`content/posts/algorithm/手写快排.md`
- **改动**：frontmatter 中 `categories: "Alogrithm"` → `"Algorithm"`
- **影响**：修复后 Hugo 不再生成 `/categories/alogrithm/` 这个错误的分类页面。

### 1.3 统一作者名

- **规范**：所有文章 `author` 字段统一为 `"AHaiTang"`
- **需修改的文件**（3 个 `"Ahaitang"` + 1 个 `"作者"`）：
  - `content/posts/life/闲暇小记—1.md` → `"Ahaitang"` → `"AHaiTang"`
  - `content/posts/algorithm/手写快排.md` → `"Ahaitang"` → `"AHaiTang"`
  - `content/posts/env/虚拟机安装Base.md` → `"Ahaitang"` → `"AHaiTang"`
  - `content/posts/env/Zookeeper安装.md` → `"Ahaitang"` → `"AHaiTang"`
  - `content/posts/learn/大数据面试题库—1.md` → `"作者"` → `"AHaiTang"`
- **验证**：全局搜索 `author:` 确认无遗漏。

## 阶段 2：SEO 补全

### 2.1 批量生成文章 description

为每篇文章的 frontmatter `description` 字段填入 80-150 字的 SEO 描述。

**生成原则**：
- 技术文章：突出"什么技术 + 做什么 + 关键特性"
- 安装指南：突出"环境 + 步骤概要 + 适用版本"
- 生活类：简述主题和情感基调
- 包含文章核心关键词，有助搜索引擎理解内容

**涉及目录**：
- `content/posts/algorithm/`（约 5 篇）
- `content/posts/env/`（约 10 篇）
- `content/posts/learn/`（约 1 篇）
- `content/posts/life/`（约 4 篇）

### 2.2 添加站点级 keywords

在 `hugo.yaml` 的 `params` 下添加 `keywords` 列表：

```yaml
params:
  keywords:
    - 大数据
    - Hadoop
    - 算法
    - 博客
    - AHaiTang
```

### 2.3 summary 处理

不手动填写 summary。依赖 Hugo 默认行为自动截取前 70 个字作为摘要，无需配置改动。

## 阶段 3：性能优化

### 3.1 启用输出压缩

在 `hugo.yaml` 中取消注释 `minifyOutput: true`，对 HTML/CSS/JS 输出进行压缩。

### 3.2 Google Fonts 本地化

**当前**：`layouts/partials/extend_head.html` 加载外部 Google Fonts（JetBrains Mono），增加 200-500ms 延迟。

**方案**：
1. 下载 JetBrains Mono woff2 字体文件到 `static/fonts/`
2. 在 `assets/css/extended/` 中创建 `fonts.css`，用 `@font-face` 本地引用，添加 `font-display: swap`
3. 删除 `extend_head.html` 中的 Google Fonts `<link>` 标签（3 行）

### 3.3 相册图片懒加载

在 `static/js/minio-client.js` 中创建 `<img>` 元素时添加 `loading="lazy"` 属性。浏览器原生支持，无需额外库。

### 3.4 CryptoJS 本地化

下载 CryptoJS SHA256 模块到 `static/js/crypto-js.min.js`，将 `layouts/shortcodes/gallery-wall.html` 中的 CDN 引用（`https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js`）改为本地路径 `/js/crypto-js.min.js`。

### 3.5 Busuanzi 保持现状

已本地化在 `assets/js/busuanzi.pure.mini.js`，计数接口为功能性外部请求，无法本地化。

## 阶段 4：安全改进

### 4.1 相册密码哈希化

**当前**：密码 `qazwsx123` 明文存储在 `content/gallery/_index.md` frontmatter 中。

**方案**：
1. 将 frontmatter 中的明文密码替换为 SHA256 哈希值
2. 修改 `static/js/minio-client.js` 验证逻辑：用户输入 → 前端 SHA256 → 与存储的哈希比对
3. 源码中只暴露哈希，无法直接逆推密码

**局限性**：仍为客户端验证，技术用户可绕过。但比明文密码安全性显著提升。真正的安全保护需要后端代理，超出本次优化范围。

### 4.2 MinIO 配置

`config/_default/params.toml` 中的占位符通过 CI 注入，不做改动。

## 阶段 5：清理

### 5.1 删除 vue-app/

删除 `vue-app/` 整个目录，已确认为废弃代码，不被任何地方引用。

### 5.2 将 public/ 加入 .gitignore

- 在 `.gitignore` 中添加 `public/`
- 执行 `git rm -r --cached public/` 从 git 追踪移除
- `public/` 由 CI/CD 构建时自动生成

### 5.3 配置结构

暂不拆分 `hugo.yaml`。当前文件虽长但结构清晰、注释详细，拆分收益不大且易引入合并问题。仅补充分节注释提升可读性。

---

## 不做的事

- 不拆分 hugo.yaml 配置文件
- 不改动 dark.yaml（保留作参考）
- 不改动 MinIO 配置占位符
- 不实现后端密码验证
- 不做无关的代码重构
