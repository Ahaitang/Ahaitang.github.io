---
title: "🤝友链"
layout: links
summary: links
---

<style>
    .friend-links {
        display: flex;
        flex-direction: column;
        gap: 25px; /* 增加间距 */
        padding: 20px 0;
    }

    .friend-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        color: var(--content);
        background-color: rgba(249, 249, 249, 0.8); /* 半透明背景 */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08); /* 更柔和的阴影 */
        transition: all 0.4s ease; /* 平滑过渡效果 */
        padding: 20px 25px;
        border-radius: 16px;
        width: 100%;
        border-left: 5px solid #6c5ce7; /* 左侧彩色边框 */
    }

    .friend-link:hover {
        transform: translateY(-8px); /* 鼠标悬停时上移 */
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12); /* 鼠标悬停时阴影加深 */
        background-color: rgba(255, 255, 255, 0.95); /* 悬停时背景变亮 */
    }

    .friend-link .info {
        flex: 1;
        text-align: left;
        padding-right: 25px;
    }

    .friend-link .name {
        font-weight: bold;
        font-size: 1.3em;
        margin-bottom: 8px;
        color: rgb(0 0 0);
        transition: color 0.3s;
    }

    .friend-link:hover .name {
        color: #6c5ce7; /* 悬停时名称变色 */
    }

    .friend-link .description {
        color: #666;
        font-size: 0.95em;
        line-height: 1.5;
    }

    .friend-link img {
        width: 90px; /* 稍微增大图片 */
        height: 90px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #fff; /* 图片白色边框 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 图片阴影 */
        transition: transform 0.4s;
    }
    
    .friend-link:hover img {
        transform: rotate(360deg); /* 图片旋转效果 */
    }
    
    /* 为不同的友链设置不同的边框颜色 */
    .friend-link:nth-child(1) {
        border-left-color: #6c5ce7;
    }
    
    .friend-link:nth-child(2) {
        border-left-color: #ff7675;
    }
    
    .friend-link:nth-child(3) {
        border-left-color: #00b894;
    }
    
    .friend-link:nth-child(4) {
        border-left-color: #fdcb6e;
    }

    .friend-link:nth-child(5) {
        border-left-color: #0984e3; 
    }
    
    /* 添加页面标题样式 */
    .links-title {
        text-align: center;
        margin: 30px 0;
        font-size: 2em;
        color: var(--content);  /* 使用主题变量 */
        position: relative;
    }
    
    .links-title:after {
        content: "";
        display: block;
        width: 80px;
        height: 4px;
        background: linear-gradient(to right, #6c5ce7, #00b894);
        margin: 15px auto;
        border-radius: 2px;
    }
</style>

<h2 class="links-title">我的朋友们</h2>

<div class="friend-links">
    <a class="friend-link" href="https://pink-29.github.io/" target="_blank">
        <div class="info">
            <div class="name">Pink-29的博客</div>
            <div class="description">分享一些技术文章(UP 的好伙伴)</div>
        </div>
        <img src="https://cdn.jsdelivr.net/gh/Pink-29/Pink-29.github.io/favicon.ico" alt="友链LOGO" loading="lazy">
    </a>
    <a class="friend-link" href="http://8.153.195.193/" target="_blank">
        <div class="info">
            <div class="name">BFS的博客</div>
            <div class="description">分享一些技术文章(UP 的好伙伴)</div>
        </div>
        <img src="http://8.153.195.193:9000/bfs/202504021704187.png" alt="友链LOGO" loading="lazy">
    </a>
    <a class="friend-link" href="https://chouxiaozilwh.github.io/" target="_blank">
        <div class="info">
            <div class="name">ChouXiaoZilwh的博客</div>
            <div class="description">分享一些技术文章(UP 的好伙伴)</div>
        </div>
        <img src="http://8.153.195.193:9000/bfs/202504021704187.png" alt="友链LOGO" loading="lazy">
    </a>
    <a class="friend-link" href="https://popoversail.github.io/" target="_blank">
        <div class="info">
            <div class="name">ChouXiaoZilwh的博客</div>
            <div class="description">分享一些技术文章(UP 的好伙伴)</div>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnfxGNwUz1HcvwlfbN7sqbeb6eMHh43XCRPA&s" alt="友链LOGO" loading="lazy">
    </a>
    <a class="friend-link" href="https://xfwmhxx.github.io/My-Blog/" target="_blank">
        <div class="info">
            <div class="name">逐梦者's 部落格</div>
            <div class="description">分享一些技术文章(UP 的好伙伴)</div>
        </div>
        <img src="https://xfwmhxx.github.io/Blog-pic-bed/img/ee432f6ef2ee2c500f79c8825d666123.png" alt="友链LOGO" loading="lazy">
    </a>
</div>