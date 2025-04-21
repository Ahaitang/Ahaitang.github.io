---
title: 'Hbase 环境配置'
date: 2025-03-17T17:08:08+08:00
lastmod: 2025-03-17T17:08:08+08:00
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

## HBase环境配置
### 安装HBase

**解压 Hbase 到指定目录**
```
tar -zxvf hbase-2.5.11-bin.tar.gz -C /opt/module/
```

**配置环境变量**
```shell fold:shell脚本
sudo

#HBASE_HOME
export HBASE_HOME=/opt/module/hbase
export PATH=$PATH:$HBASE_HOME/bin
```

**分发环境变量，并 source**
```
xsync /etc/profile.d/my_env.sh
# 分别在节点上 source 环境变量
source /etc/profile.d/my_env.sh
```

#### 修改 HBase  的环境变量

**修改 hbase-env.sh**
```
export HBASE_MANAGES_ZK=false
```

**修改 hbase-site.xml**
```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
		 <property>
                <name>hbase.cluster.distributed</name>
                <value>true</value>
        </property>

        <property>
                <name>hbase.zookeeper.quorum</name>
                <value>hadoop102,hadoop103,cd ..hadoop104</value>
                <description>The directory shared by RegionServers.</description>
        </property>
<!-- <property>-->
<!-- <name>hbase.zookeeper.property.dataDir</name>-->
<!-- <value>/export/zookeeper</value>-->
<!-- <description> 记得修改 ZK 的配置文件 -->
<!-- ZK 的信息不能保存到临时文件夹-->
<!-- </description>-->
<!-- </property>-->
        <property>
                <name>hbase.rootdir</name>
                <value>hdfs://hadoop102:8020/hbase</value>
                <description>The directory shared by RegionServers.</description>
        </property>
        <!--
        <property>
                <name>hbase.tmp.dir</name>
                <value>./tmp</value>
        </property>
        <property>
                <name>hbase.unsafe.stream.capability.enforce</name>
                <value>false</value>
        </property>
        -->
</configuration>

```

**修改 regionservers**
```bash
hadoop111
hadoop112
hadoop113
```

**修改 log4j 兼容性问题**
```
mv /opt/module/hbase-2.4.11/lib/client-facing-thirdparty/slf4j-reload4j-1.7.33.jar /opt/module/hbase-2.4.11/lib/client-facing-thirdparty/slf4j-reload4j-1.7.33.jar.bak
```

#### hbase 启动

**单点启动/停止**
```
bin/hbase-daemon.sh start/stop master
bin/hbase-daemon.sh start/stop regionerver
```

**集群启动/停止**
```
bin/start-hbase.sh
bin/stop-hbase.sh
```

**网页IP**
`https://hadoop111:16010`


