---
title: 'MinIO 配置域名与 Nginx 反向代理'
date: 2026-04-29T00:35:00+08:00
lastmod: 2026-04-29T00:35:00+08:00
author: ["AHaiTang"]
categories:
- 环境安装
tags:
- MinIO
- Nginx
- SSL
- HTTPS
summary: "本文介绍如何为 MinIO 配置域名并通过 Nginx 反向代理实现 HTTPS 访问"
description: "MinIO 域名配置、Nginx 反向代理、SSL 证书申请完整教程"
draft: false
comments: true
showToc: true
TocOpen: true
hidemeta: false
disableShare: true
showbreadcrumbs: true
cover:
    image: ""
    caption: ""
    alt: ""
    relative: false
---

# MinIO 配置域名与 Nginx 反向代理

当网站使用 HTTPS 时，直接访问 HTTP 的 MinIO 服务会被浏览器阻止（Mixed Content 错误）。本文介绍如何通过 Nginx 反向代理和 SSL 证书为 MinIO 配置 HTTPS 访问。

## 环境说明

- MinIO 运行在 Docker 容器中
- API 端口：9100（映射容器内 9000）
- Console 端口：9101（映射容器内 9001）
- 域名：minio.ahaitang.top

## 步骤一：配置 DNS 解析

在域名服务商添加子域名解析记录：

| 主机记录 | 记录类型 | 记录值 |
|---------|---------|--------|
| minio | A | 你的服务器 IP |

例如阿里云 DNS 配置：
- 主机记录：`minio`
- 记录类型：`A`
- 记录值：`101.201.30.29`

## 步骤二：安装 Nginx 和 Certbot

```bash
# 安装 Nginx
sudo apt update
sudo apt install nginx -y

# 安装 Certbot（用于免费 SSL 证书）
sudo apt install certbot python3-certbot-nginx -y
```

## 步骤三：创建 Nginx 反向代理配置

创建配置文件：

```bash
sudo nano /etc/nginx/sites-available/minio.conf
```

写入以下内容：

```nginx
server {
    listen 80;
    server_name minio.ahaitang.top;

    location / {
        proxy_pass http://127.0.0.1:9100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 支持大文件上传
        client_max_body_size 1000m;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/minio.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 步骤四：申请 SSL 证书

使用 Certbot 自动申请并配置 Let's Encrypt 免费 SSL 证书：

```bash
sudo certbot --nginx -d minio.ahaitang.top
```

按提示输入邮箱并同意条款。Certbot 会自动修改 Nginx 配置添加 SSL。

## 步骤五：配置 MinIO 服务器地址

MinIO 要知道它的外部访问地址。编辑 Docker Compose 配置文件：

```bash
cd /root/docker
nano minio.yml
```

添加 `MINIO_SERVER_URL` 环境变量：

```yaml
services:
  minio:
    image: minio/minio
    container_name: minio
    restart: always
    ports:
      - "9100:9000"
      - "9101:9001"
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: your_password
      MINIO_SERVER_URL: https://minio.ahaitang.top
    volumes:
      - ./MinioData:/data 
    command: server /data --console-address ":9001"
```

重启 MinIO 容器：

```bash
docker-compose -f minio.yml down
docker-compose -f minio.yml up -d
```

## 步骤六：验证配置

测试 HTTPS 访问：

```bash
curl -I https://minio.ahaitang.top/your-bucket-name
```

预期返回：

```
HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Strict-Transport-Security: max-age=31536000; includeSubDomains
...
```

## Nginx 配置完整版（SSL 自动生成后）

Certbot 会自动将配置修改为：

```nginx
server {
    listen 80;
    server_name minio.ahaitang.top;
    
    # 自动跳转 HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name minio.ahaitang.top;

    ssl_certificate /etc/letsencrypt/live/minio.ahaitang.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/minio.ahaitang.top/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:9100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 1000m;
    }
}
```

## 常见问题

### 1. 400 Bad Request 错误

原因：MinIO 未配置 `MINIO_SERVER_URL`

解决：在 Docker Compose 中添加环境变量 `MINIO_SERVER_URL=https://minio.ahaitang.top`

### 2. SSL 证书续期

Let's Encrypt 证书有效期 90 天，Certbot 会自动设置续期任务：

```bash
# 测试续期
sudo certbot renew --dry-run
```

### 3. 混合内容错误

网站使用 HTTPS 时，前端必须通过 HTTPS 访问 MinIO，否则浏览器会阻止请求。配置完本文步骤后即可解决。

## 总结

通过 Nginx 反向代理和 SSL 证书，可以为 MinIO 配置安全的 HTTPS 访问，解决混合内容问题，同时保护数据传输安全。