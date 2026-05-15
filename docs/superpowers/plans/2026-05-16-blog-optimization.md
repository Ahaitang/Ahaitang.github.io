# 博客全面优化 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按 5 个阶段逐步优化 Hugo 博客的 SEO、性能、安全和配置

**Architecture:** 渐进式修改，每个 Task 独立可提交，不改变现有 Hugo 构建流程

**Tech Stack:** Hugo, PaperMod 主题, YAML frontmatter, JavaScript, CSS

---

## Task 1: 修复分类拼写错误

**Files:**
- Modify: `content/posts/algorithm/手写快排.md:6`
- Modify: `content/posts/algorithm/手写归并.md:6`
- Modify: `content/posts/algorithm/二分.md:6`

- [ ] **Step 1: 修复手写快排.md 中的分类拼写**

将 `categories` 从 `"Alogrithm"` 改为 `"Algorithm"`。

- [ ] **Step 2: 修复手写归并.md 中的分类拼写**

同上，`"Alogrithm"` → `"Algorithm"`。

- [ ] **Step 3: 修复二分.md 中的分类拼写**

同上，`"Alogrithm"` → `"Algorithm"`。

- [ ] **Step 4: 验证**

运行 `hugo --config hugo.yaml` 构建，检查 `public/categories/` 目录下不再有 `alogrithm/` 目录，只有 `algorithm/`。

- [ ] **Step 5: 提交**

```powershell
git add content/posts/algorithm/手写快排.md content/posts/algorithm/手写归并.md content/posts/algorithm/二分.md
git commit -m "fix: 修复 Algorithm 分类拼写错误 (Alogrithm → Algorithm)"
```

---

## Task 2: 统一作者名

**Files:**
- Modify: `content/posts/life/闲暇小记—1.md:5`
- Modify: `content/posts/algorithm/手写快排.md:5`
- Modify: `content/posts/env/虚拟机安装Base.md:6`
- Modify: `content/posts/env/Zookeeper安装.md:6`
- Modify: `content/posts/learn/大数据面试题库—1.md:5`

- [ ] **Step 1: 修改 闲暇小记—1.md**

```yaml
# 将
author: ["Ahaitang"]
# 改为
author: ["AHaiTang"]
```

- [ ] **Step 2: 修改 手写快排.md**

```yaml
# 将
author: ["Ahaitang"]
# 改为
author: ["AHaiTang"]
```

- [ ] **Step 3: 修改 虚拟机安装Base.md**

```yaml
# 将
author: ["Ahaitang"]
# 改为
author: ["AHaiTang"]
```

- [ ] **Step 4: 修改 Zookeeper安装.md**

```yaml
# 将
author: ["Ahaitang"]
# 改为
author: ["AHaiTang"]
```

- [ ] **Step 5: 修改 大数据面试题库—1.md**

```yaml
# 将
author: ["作者"]
# 改为
author: ["AHaiTang"]
```

- [ ] **Step 6: 验证**

```powershell
Select-String -Path "content\posts\**\*.md" -Pattern 'author:' -Recurse | Select-String -NotMatch 'AHaiTang'
```

预期：只有 `gallery/_index.md` 出现（它已经是正确的），不应有其他结果。

- [ ] **Step 7: 提交**

```powershell
git add content/posts/life/闲暇小记—1.md content/posts/algorithm/手写快排.md content/posts/env/虚拟机安装Base.md content/posts/env/Zookeeper安装.md content/posts/learn/大数据面试题库—1.md
git commit -m "fix: 统一所有文章作者名为 AHaiTang"
```

---

## Task 3: 修复 env 文件占位符标签

**Files:**
- Modify: `content/posts/env/Hadoop安装.md`
- Modify: `content/posts/env/Zookeeper安装.md`
- Modify: `content/posts/env/Spark安装.md`
- Modify: `content/posts/env/Hive安装.md`
- Modify: `content/posts/env/Hbase安装.md`
- Modify: `content/posts/env/Kafak安装.md`
- Modify: `content/posts/env/Flume安装.md`

- [ ] **Step 1: 批量替换占位符标签**

将上述 7 个文件中 frontmatter 的 `tags` 从 `["标签1","标签2"]` 替换为与文章内容匹配的标签：

| 文件 | 新标签 |
|------|--------|
| Hadoop安装.md | `["Hadoop", "环境搭建"]` |
| Zookeeper安装.md | `["Zookeeper", "环境搭建"]` |
| Spark安装.md | `["Spark", "环境搭建"]` |
| Hive安装.md | `["Hive", "环境搭建"]` |
| Hbase安装.md | `["HBase", "环境搭建"]` |
| Kafak安装.md | `["Kafka", "环境搭建"]` |
| Flume安装.md | `["Flume", "环境搭建"]` |

- [ ] **Step 2: 提交**

```powershell
git add content/posts/env/
git commit -m "fix: 替换 env 文章占位符标签为具体技术名称"
```

---

## Task 4: 批量生成文章 description

**Files:**
- Modify: 所有 `content/posts/` 下 description 为空的文章（约 18 篇）

- [ ] **Step 1: 为 algorithm/ 文章添加 description**

| 文件 | description |
|------|-------------|
| 二分.md | `"详解整数二分与浮点数二分的算法模板，包含边界处理技巧和经典应用场景分析。"` |
| 前缀和And差分.md | `"前缀和与差分数组的核心思想及模板代码，涵盖一维和二维场景的区间查询与修改优化。"` |
| 手写归并.md | `"归并排序的手写实现模板，详解分治思想、合并过程及代码细节。"` |
| 手写快排.md | `"快速排序的手写实现模板，包含分区策略、递归流程和边界处理。"` |
| 双指针.md | `"双指针算法技巧总结，涵盖对撞指针和快慢指针的经典应用与模板写法。"` |

- [ ] **Step 2: 为 env/ 文章添加 description**

| 文件 | description |
|------|-------------|
| Hadoop安装.md | `"Hadoop 集群环境配置完整教程，包括网络配置、JDK 安装、环境变量设置及集群部署步骤。"` |
| Zookeeper安装.md | `"Zookeeper 分布式集群安装教程，涵盖 Server ID 配置、myid 文件创建及集群启动验证。"` |
| Spark安装.md | `"Spark on YARN 模式环境配置指南，包含 Hadoop 集成设置和 YARN 内存参数调优。"` |
| Hive安装.md | `"Hive 数据仓库环境配置教程，从解压安装到环境变量配置的完整步骤。"` |
| Hbase安装.md | `"HBase 分布式数据库集群安装教程，涵盖环境配置和 Shell 命令验证。"` |
| Kafak安装.md | `"Kafka 消息队列集群配置教程，包含 Broker 参数设置和分布式部署步骤。"` |
| Flume安装.md | `"Apache Flume 日志采集工具安装配置教程，包含 Netcat Source 测试验证。"` |
| Flink安装.md | `"Flink Standalone 集群搭建教程，涵盖 JobManager 和 TaskManager 的配置与启动。"` |

注意：`虚拟机安装Base.md` 和 `MinIO配置域名.md` 已有 description，跳过。

- [ ] **Step 3: 为 learn/ 文章添加 description**

| 文件 | description |
|------|-------------|
| 大数据面试题库—1.md | `"大数据面试高频题整理，涵盖 HDFS 读写流程、文件删除机制等核心知识点。"` |

- [ ] **Step 4: 为 life/ 文章添加 description**

| 文件 | description |
|------|-------------|
| 闲暇小记—2.md | `"大学生活随笔，关于学校老师和校园日常的闲聊吐槽。"` |
| 闲暇小记—3.md | `"深夜随想，聊聊游戏、熬夜、博客相册功能，以及那些琐碎的自言自语。"` |
| 闲暇小记—4.md | `"工作将近一年的感悟，关于人生方向、过往选择和对未来的思考。"` |

注意：`闲暇小记—1.md` 已有 description，跳过。

- [ ] **Step 5: 提交**

```powershell
git add content/posts/
git commit -m "seo: 为所有文章补全 description 字段"
```

---

## Task 5: 添加站点级 keywords

**Files:**
- Modify: `hugo.yaml`

- [ ] **Step 1: 在 hugo.yaml 的 params 下添加 keywords**

在 `hugo.yaml` 的 `params:` 部分（`env: production` 之后）添加：

```yaml
  keywords:
    - 大数据
    - Hadoop
    - 算法
    - 环境配置
    - 博客
    - AHaiTang
```

- [ ] **Step 2: 提交**

```powershell
git add hugo.yaml
git commit -m "seo: 添加站点级 keywords 元数据"
```

---

## Task 6: 启用输出压缩

**Files:**
- Modify: `hugo.yaml`

- [ ] **Step 1: 取消注释 minifyOutput**

在 `hugo.yaml` 的 `minify` 部分，将：
```yaml
minify:
    disableXML: true
    # minifyOutput: true
```

改为：
```yaml
minify:
    disableXML: true
    minifyOutput: true
```

- [ ] **Step 2: 验证**

运行 `hugo --config hugo.yaml`，检查 `public/index.html` 是否已压缩（无多余空白和换行）。

- [ ] **Step 3: 提交**

```powershell
git add hugo.yaml
git commit -m "perf: 启用 Hugo 输出压缩 (minifyOutput)"
```

---

## Task 7: Google Fonts 本地化

**Files:**
- Create: `static/fonts/JetBrainsMono-Regular.woff2`
- Create: `static/fonts/JetBrainsMono-Italic.woff2`
- Create: `assets/css/extended/fonts.css`
- Modify: `layouts/partials/extend_head.html`

- [ ] **Step 1: 下载字体文件**

从 Google Fonts 下载 JetBrains Mono 的 woff2 文件到 `static/fonts/`：

```powershell
New-Item -ItemType Directory -Path "static/fonts" -Force
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/jetbrainsmono/v21/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2" -OutFile "static/fonts/JetBrainsMono-Regular.woff2"
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/jetbrainsmono/v21/tDbX2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-Lf1OQk6OThxPA.woff2" -OutFile "static/fonts/JetBrainsMono-Italic.woff2"
```

- [ ] **Step 2: 创建本地字体 CSS**

创建 `assets/css/extended/fonts.css`：

```css
@font-face {
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-weight: 100 800;
    font-display: swap;
    src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
}

@font-face {
    font-family: 'JetBrains Mono';
    font-style: italic;
    font-weight: 100 800;
    font-display: swap;
    src: url('/fonts/JetBrainsMono-Italic.woff2') format('woff2');
}
```

- [ ] **Step 3: 删除 extend_head.html 中的 Google Fonts 链接**

在 `layouts/partials/extend_head.html` 中删除以下 3 行：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
    rel="stylesheet">
```

- [ ] **Step 4: 验证**

运行 `hugo server --config hugo.yaml`，在浏览器中确认字体仍然正确渲染，且 Network 面板中无对 `fonts.googleapis.com` 或 `fonts.gstatic.com` 的请求。

- [ ] **Step 5: 提交**

```powershell
git add static/fonts/ assets/css/extended/fonts.css layouts/partials/extend_head.html
git commit -m "perf: 本地化 Google Fonts (JetBrains Mono)"
```

---

## Task 8: CryptoJS 本地化

**Files:**
- Create: `static/js/crypto-js.min.js`
- Modify: `layouts/shortcodes/gallery-wall.html`

- [ ] **Step 1: 下载 CryptoJS**

```powershell
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" -OutFile "static/js/crypto-js.min.js"
```

- [ ] **Step 2: 修改 gallery-wall.html 引用路径**

在 `layouts/shortcodes/gallery-wall.html` 中，将：

```html
<!-- 引入CryptoJS库用于签名计算 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

改为：

```html
<!-- 引入CryptoJS库用于签名计算 -->
<script src="/js/crypto-js.min.js"></script>
```

- [ ] **Step 3: 提交**

```powershell
git add static/js/crypto-js.min.js layouts/shortcodes/gallery-wall.html
git commit -m "perf: 本地化 CryptoJS 库，移除 CDN 依赖"
```

---

## Task 9: 相册密码哈希化

**Files:**
- Modify: `content/gallery/_index.md`
- Modify: `layouts/shortcodes/gallery-wall.html`

- [ ] **Step 1: 生成密码哈希**

```powershell
$hash = [System.BitConverter]::ToString(
    [System.Security.Cryptography.SHA256]::Create().ComputeHash(
        [System.Text.Encoding]::UTF8.GetBytes("qazwsx123")
    )
).Replace("-","").ToLower()
Write-Output $hash
```

记录输出的哈希值。

- [ ] **Step 2: 修改 gallery/_index.md**

将 frontmatter 中的：

```yaml
password: "qazwsx123" # 设置访问密码
```

改为：

```yaml
passwordHash: "<步骤1生成的SHA256哈希>" # 密码的SHA256哈希值
```

- [ ] **Step 3: 修改 gallery-wall.html 密码验证逻辑**

将 `verifyPassword` 函数从明文比对改为哈希比对：

```javascript
function verifyPassword(event) {
    event.preventDefault();
    const input = document.getElementById('password-input');
    const correctHash = '{{ .Page.Params.passwordHash }}';
    const inputHash = CryptoJS.SHA256(input.value).toString();
    
    if (inputHash === correctHash) {
        localStorage.setItem('gallery_auth_{{ .Page.File.Path }}', '1');
        document.querySelector('.password-protection').style.display = 'none';
        document.getElementById('gallery-content').style.display = 'block';
        initGallery();
    } else {
        alert('密码错误，请重试');
        input.value = '';
    }
    return false;
}
```

同时更新模板顶部的条件判断，将 `.Page.Params.password` 改为 `.Page.Params.passwordHash`：

```go
{{ if not (eq .Page.Params.passwordHash nil) }}
```

- [ ] **Step 4: 验证**

运行 `hugo server --config hugo.yaml`，访问相册页面，输入原密码 `qazwsx123` 应能通过验证。

- [ ] **Step 5: 提交**

```powershell
git add content/gallery/_index.md layouts/shortcodes/gallery-wall.html
git commit -m "security: 相册密码改为 SHA256 哈希存储"
```

---

## Task 10: 删除 vue-app/ 并清理 git 追踪

**Files:**
- Delete: `vue-app/` 目录
- Modify: `.gitignore`

- [ ] **Step 1: 删除 vue-app/ 目录**

```powershell
Remove-Item -Recurse -Force vue-app/
```

- [ ] **Step 2: 从 git 追踪移除 public/ 缓存**

`.gitignore` 已包含 `/public`，但如果 public/ 仍被 git 追踪，需要清除缓存：

```powershell
git rm -r --cached public/ 2>$null
```

- [ ] **Step 3: 提交**

```powershell
git add -A
git commit -m "chore: 删除废弃的 vue-app/ 目录，清理 git 追踪"
```
