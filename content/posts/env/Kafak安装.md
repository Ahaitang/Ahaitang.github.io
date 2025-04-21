---
title: 'Kafak 环境配置'
date: 2025-03-17T17:08:31+08:00
lastmod: 2025-03-17T17:08:31+08:00
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

## 解压安装

**解压安装包**
```
[bigdata@hadoop102 software]$ tar -zxvf kafka_2.12-3.0.0.tgz -C /opt/module/
```

**进入到 config 目录，修改配置文件**
```
[bigdata@hadoop102 kafka_2.12-3.3.1]$  cd config
[bigdata@hadoop102 config]$ vim server.properties 

### 输入修改以下内容
broker.id=0
log.dirs=/opt/module/kafka_2.12-3.0.0/datas
zookeeper.connect=hadoop102:2181,hadoop103:2181,hadoop104:2181/kafka
```

**分发安装包上,并分别修改配置文件server.properties 中的 broker.id=1、broker.id=2**
```
[bigdata@hadoop102 module]$ xsync kafka_2.12_3.3.1/
broker.id=1
broker.id=2
```

**配置环境变量**
```
sudo vim /etc/profile.d/my_env.sh

#KAFKA_HOME
export KAFKA_HOME=/opt/module/kafka_2.12-3.0.0
export PATH=$PATH:$KAFKA_HOME/bin
```

**分发环境变量并 source**
```
xsync /etc/profile.d/my_env.sh
source /etc/profile
```

### 启动集群

**启动 Zookeeper 集群，然后分别启动 kafka**
```
zk.sh start

bin/kafka-server-start.sh -daemon config/server.properties
```

**kafka  启动脚本**
```
vim kf.sh

#! /bin/bash
case $1 in
"start"){
	for i in hadoop102 hadoop103 hadoop104
	do
		echo " --------启动 $i Kafka-------"
		ssh $i "/opt/module/kafka_2.12-3.0.0/bin/kafka-server-start.sh -daemon /opt/module/kafka_2.12-3.0.0/config/server.properties"
	done
}
;;
"stop")
	for i in hadoop102 hadoop103 hadoop104
	do
		echo " --------停止 $i Kafka-------"
		ssh $i "/opt/module/kafka_2.12-3.0.0/bin/kafka-server-stop.sh"
	done
;;
esac

```

**添加执行权限**
```
chmod +x kf.sh
```

**启动和停止命令**
```
kf.sh start/stop
```