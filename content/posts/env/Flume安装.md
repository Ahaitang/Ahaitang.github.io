---
title: 'Flume 环境配置'
date: 2025-03-17T17:08:37+08:00
lastmod: 2025-03-17T17:08:37+08:00
author: ["AHaiTang"]
categories:
- BigData
- 环境安装
tags:
- 标签1
- 标签2
# summary->在列表页展现的摘要内容，自动生成，内容默认前70个字符，可通过此参数自定义，一般无需专门设置
summary: ""
# description->需要自己编写的文章描述，是搜索引擎呈现在搜索结果链接下方的网页简介，建议设置
description: ""
weight: # 输入1可以顶置文章，用来给文章展示排序，不填就默认按时间排序
slug: ""
draft: false # 是否为草稿
comments: true
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true #顶部显示当前路径
cover:
    image: ""
    caption: ""
    alt: ""
    relative: false
---

## Flume 环境配置
### 解压安装
**解压 Flume 并重命名**
```
[bigdata@hadoop102 software]$ tar -zxf /opt/software/apache-flume-1.9.0-bin.tar.gz -C /opt/module/                        

[bigdata@hadoop102 module]$ mv /opt/module/apache-flume-1.9.0-bin /opt/module/flum-1.9.0      
```

**将 lib 文件夹下的 guava-11.0.2.jar 删除以兼容 Hadoop 3.1.3**
```
[bigdata@hadoop102 module]$ rm /opt/module/flume-1.9.0/lib/guava-11.0.2.jar                  
```

### 监听端口
**安装 netcat 工具**
```
sudo yum install -y nc        
```

**判断 44444 端口是否被占用**
```
sudo netstat -nlp | grep 44444                                
```

**在 flume 目录下创建 job 文件夹并进入 job 文件夹**
```
mkdir job  
cd job  
```

**在 job 文件夹下创建 Flume Agent 配置文件 flume-netcat-logger.conf**
```
# Name the components on this agent  
a1.sources = r1  
a1.sinks = k1  
a1.channels = c1  

# Describe/configure the source  
a1.sources.r1.type = netcat  
a1.sources.r1.bind = localhost  
a1.sources.r1.port = 44444  

# Describe the sink  
a1.sinks.k1.type = logger  

# Use a channel which buffers events in memory
a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000            
a1.channels.c1.transactionCapacity = 100  

# Bind the source and sink to the channel  
a1.sources.r1.channels = c1  
a1.sinks.k1.channel = c1  
```

**先开启 flume 监听端口**
```
bin/flume-ng agent --conf conf/ --name a1 --conf-file job/net-flume-logger.conf -Dflume.root.logger=INFO,console  
```

**使用 netcat 工具向本机的 44444 端口发送内容**
```
nc localhost 44444  
```