---
title: "Flink 环境配置"
date: 2025-04-03T15:53:36+08:00
lastmod: 2025-04-03T15:53:36+08:00
author: ["AHaiTang"]
categories:
- BigData
- 环境安装
tags:
- Flink
- 环境搭建
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

## Flink 集群搭建
### Standlone 模式搭建
#### 解压flink
```shell flie:解压flink
[bigdata@hadoop102 software]$ tar -zxvf flink-1.17.0-bin-scala_2.12.tgz -C /opt/module/
```


#### 修改集群配置

**1. 修改 flink-conf.yaml**
```
[atguigu@hadoop102 conf]$ vim flink-conf.yaml

# JobManager 节点地址.
jobmanager.rpc.address: hadoop102 jobmanager.bind-host: 0.0.0.0 rest.address: hadoop102 
rest.bind-address: 0.0.0.0
# TaskManager 节点地址.需要配置为当前机器名
taskmanager.bind-host: 0.0.0.0 anager.host: hadoop102
```

**2.修改workers**
```
[bigdata@hadoop102 conf]$ vim workers

hadoop102
hadoop103
hadoop104
```

**3.修改masters**
```
[bigdata@hadoop102 conf]$ vim masters

hadoop102:8081
```
#### 分发安装目录

**1. 将 Flink 分发至 hadoop102 hadoop103** 
```
[bigdata@hadoop102 module]$ xsync flink-1.17.0/
```

**2. 分别修改 Hadoop102  Hadoop103 的 taskmanager.host**
```
[bigdata@hadoop103 ~]$ cd /opt/module/flink-1.17.0/conf/
[bigdata@hadoop103 conf]$ vim flink-conf.yaml 

# TaskManager节点地址.需要配置为当前机器名 
taskmanager.host: hadoop103


[bigdata@hadoop104 ~]$ cd /opt/module/flink-1.17.0/conf/
[bigdata@hadoop104 conf]$ vim flink-conf.yaml 

# TaskManager节点地址.需要配置为当前机器名 
taskmanager.host: hadoop104
```
#### 启动集群
```
[bigdata@hadoop102 flink-1.17.0]$ bin/start-cluster.sh 
```


### Yarn 模式
#### 添加环境变量;
```
sudo vim /etc/profile.d/my_env.sh
export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop
export HADOOP_CLASSPATH=`hadoop classpath`
```

