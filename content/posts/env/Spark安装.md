---
title: 'Spark 环境配置'
date: 2025-03-17T17:07:51+08:00
lastmod: 2025-03-17T17:07:51+08:00
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

## Spark 环境配置
### Yarn 模式
#### 解压安装文件并重命名
```
tar -zxvf spark-3.0.0-bin-hadoop3.2.tgz -C /opt/module/
cd /opt/module
mv spark-3.0.0-bin-hadoop3.2/ spark-3.0.0/
```

#### 修改配置文件
**修改 hadoop 的 yarn-site.xml, 并分发**
```
<!--是否启动一个线程检查每个任务正使用的物理内存量，如果任务超出分配值，则直接将其杀掉，默认是 true -->

<property>
	<name>yarn.nodemanager.pmem-check-enabled</name>
	<value>false</value>
</property>

<!--是否启动一个线程检查每个任务正使用的虚拟内存量，如果任务超出分配值，则直接将其杀掉，默认是 true -->

<property>
	<name>yarn.nodemanager.vmem-check-enabled</name>
	<value>false</value>
</property>
```

**修改 conf/spark-env.sh， 添加 JAVA_HOME 和 YARN_CONF_DIR 配置**
```
mv spark-env.sh.template spark-env.sh

export JAVA_HOME=/opt/module/jdk1.8.0_212
YARN_CONF_DIR=/opt/module/hadoop-3.1.3/etc/hadoop
```

#### 配置历史服务器
**修改 spark-defaults.conf.template 文件名为 spark-defaults.conf**
```
mv spark-defaults.conf.template spark-defaults.conf
```

**修改 spark-default.conf 文件，配置日志存储路径**
```
spark.eventLog.enabled true
spark.eventLog.dir hdfs://Comtition2024master:8020/directory

### 注意：需要启动 hadoop 集群，HDFS 上的目录需要提前存在
hadoop fs -mkdir /directory
```

**修改 spark-env.sh 文件, 添加日志配置**
```
export SPARK_HISTORY_OPTS="
-Dspark.history.ui.port=18080
-Dspark.history.fs.logDirectory=hdfs://Comtition2024master:8020/directory
-Dspark.history.retainedApplications=30"
```

**修改 spark-defaults.conf**
```
spark.yarn.historyServer.address=Comtition2024master:18080
spark.history.ui.port=18080
```

**启动历史服务**
```
sbin/start-history-server.sh
```

### Standalone 模式
#### 解压安装文件并重命名
```
tar -zxvf spark-3.0.0-bin-hadoop3.2.tgz -C /opt/module/
cd /opt/module
mv spark-3.0.0-bin-hadoop3.2/ spark-3.0.0/
```

#### 修改配置文件
**进入 conf 目录，修改 slaves.template 文件名为 slaves， 并添加 salves**
```
mv slaves.template slaves
Comtition2024master
Comtition2024node1
Comtition2024node2
```

**修改 conf/spark-env.sh， 添加 JAVA_HOME 环境变量和集群对应的 master 节点
```
mv spark-env.sh.template spark-env.sh

export JAVA_HOME=/opt/module/jdk1.8.0_212
SPARK_MASTER_HOST=Comtition2024master
SPARK_MASTER_PORT=7077
```

**分发sprak**
```
rsync  -av xxx user@主机:xxxx
```

### 启动集群
```
sbin/start-all.sh
```
#### 配置历史服务器
**修改 spark-defaults.conf.template 文件名为 spark-defaults.conf**
```
mv spark-defaults.conf.template spark-defaults.conf
```

**修改 spark-default.conf 文件，配置日志存储路径**
```
spark.eventLog.enabled true
spark.eventLog.dir hdfs://Comtition2024master:8020/directory

### 注意：需要启动 hadoop 集群，HDFS 上的目录需要提前存在
hadoop fs -mkdir /directory
```

**修改 spark-env.sh 文件, 添加日志配置**
```
export SPARK_HISTORY_OPTS="
-Dspark.history.ui.port=18080
-Dspark.history.fs.logDirectory=hdfs://Comtition2024master:8020/directory
-Dspark.history.retainedApplications=30"
```

**启动历史服务**
```
sbin/start-history-server.sh
```