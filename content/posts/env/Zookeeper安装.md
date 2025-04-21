---
title: 'Zookeeper 环境配置'
date: 2025-03-17T17:08:19+08:00
lastmod: 2025-03-17T17:08:19+08:00
weight: 5
author: ["Ahaitang"]
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
## 集群安装

### 解压安装 Zookeeper
**解压 Zookeeper 安装包到/opt/module/目录下并修改 apache-zookeeper-3.5.7-bin 名称为 zookeeper-3.5.7**
```
# 解压
[bigdata@hadoop102 software]$ tar -zxvf apache-zookeeper-3.5.7-bin.tar.gz -C /opt/module/
# 重命名
[bigdata@hadoop102 module]$ mv apache-zookeeper-3.5.7-bin/ zookeeper-3.5.7/
```

### 配置服务器编号
**在/opt/module/zookeeper-3.5.7/这个目录下创建 zkData**
```
[bigdata@hadoop102 module]$ cd zookeeper-3.5.7/
[bigdata@hadoop102 zookeeper-3.5.7]$ mkdir zkData
```

**在/opt/module/zookeeper-3.5.7/zkData 目录下创建一个 myid 的文件**
```
[bigdata@hadoop102 zookeeper-3.5.7]$ cd zkData/
[bigdata@hadoop102 zkData]$ vim myid

# 在文件中添加与 server 对应的编号（注意：上下不要有空行，左右不要有空格）
2

# 注意：添加 myid 文件，一定要在 Linux 里面创建，在 notepad++里面很可能乱码
```

**拷贝配置好的 zookeeper 到其他机器上并分别修改 myid 文件中内容为 3、4**
```
[bigdata@hadoop102 module]$ cd /opt/module/
[bigdata@hadoop102 module]$ xsync ./zookeeper-3.5.7/
```

### 修改配置文件

**重命名 /opt/module/zookeeper-3.5.7/conf 这个目录下的 zoo_sample.cfg 为 zoo.cfg**
```
[bigdata@hadoop102 module]$ cd zookeeper-3.5.7/conf/
[bigdata@hadoop102 conf]$ mv zoo_sample.cfg zoo.cfg 
```

**打卡 zoo.cfg 文件修改数据存储路径配置，并增加如下配置**
```
[bigdata@hadoop102 conf]$ vim zoo.cfg 

#修改数据存储路径配置
dataDir=/opt/module/zookeeper-3.5.7/zkData
#增加如下配置
#######################cluster##########################
server.2=hadoop102:2888:3888
server.3=hadoop103:2888:3888
server.4=hadoop104:2888:3888
```

**参数解读**
`server.A=B:C:D`
A 是一个数字，表示这个是第几号服务器；
集群模式下配置一个文件 myid，这个文件在 dataDir 目录下，这个文件里面有一个数据就是 A 的值，Zookeeper 启动时读取此文件，拿到里面的数据与 zoo.cfg 里面的配置信息比较从而判断到底是哪个 server。
B 是这个服务器的地址；
C 是这个服务器 Follower 与集群中的 Leader 服务器交换信息的端口；
D 是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的Leader，而这个端口就是用来执行选举时服务器相互通信的端口。

**同步 zoo.cfg 配置文件**
```
[bigdata@hadoop102 conf]$ xsync zoo.cfg
```

**集群启动**
```
# 启动/停止/查看状态
bin/zkServer.sh start/stop/status
```

### 配置常用脚本
**在 ~/bin 目录下编写脚本**
```
#!/bin/bash
case $1 in
"start"){
for i in hadoop102 hadoop103 hadoop104
	do
		echo ---------- zookeeper $i 启动 ------------
		ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh start"
	done
};;
"stop"){
for i in hadoop102 hadoop103 hadoop104
	do
		echo ---------- zookeeper $i 停止 ------------ 
		ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh stop"
	done
};;
"status"){
for i in hadoop102 hadoop103 hadoop104
	do
		echo ---------- zookeeper $i 状态 ------------ 
		ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh status"
	done
};;
esac

```

**增加脚本权限**
```
[bigdata@hadoop102 bin]$ chmod u+x zk.sh
```