---
title: 'Hive 环境配置'
date: 2025-03-17T17:08:02+08:00
lastmod: 2025-03-17T17:08:02+08:00
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


## 安装环境配置

**把apache-hive-3.1.3-bin.tar.gz上传到Linux的/opt/software目录下**

**apache-hive-3.1.3-bin.tar.gz到/opt/module/目录下面**
```
tar -zxvf /opt/software/apache-hive-3.1.3-bin.tar.gz -C /opt/module/
```

**修改apache-hive-3.1.3-bin.tar.gz的名称为hive**
```
mv /opt/module/apache-hive-3.1.3-bin/ /opt/module/hive-3.1.3
```

**修改/etc/profile.d/my_env.sh，添加环境变量**
```
sudo vim /etc/profile.d/my_env.sh

# 添加内容
#HIVE_HOME
export HIVE_HOME=/opt/module/hive-3.1.3
export PATH=$PATH:$HIVE_HOME/bin

source /etc/profile.d/my_env.sh
```

**初始化元数据库（默认是derby数据库）**
```
bin/schematool -dbType derby -initSchema
```

**启动 Hive**
```
bin/hive
```

## 配置数据元到 MySQL

**新建 Hive 元数据库**
```
mysql -uroot -p123456

create database metastore;
quit;
```

**将MySQL的JDBC驱动拷贝到Hive的lib目录下。**
```
cp /opt/software/mysql-connector-java-5.1.37.jar $HIVE_HOME/lib
```

**在$HIVE_HOME/conf目录下新建hive-site.xml文件**
```
vim $HIVE_HOME/conf/hive-site.xml

<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<configuration>
    <!-- jdbc连接的URL -->
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://hadoop102:3306/metastore?useSSL=false</value>
    </property>

    <!-- jdbc连接的Driver-->
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.jdbc.Driver</value>
    </property>

        <!-- jdbc连接的username-->
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>root</value>
    </property>

    <!-- jdbc连接的password -->
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>123456</value>
    </property>

    <!-- Hive默认在HDFS的工作目录 -->
    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/user/hive/warehouse</value>
    </property>
</configuration>

```


**初始化Hive元数据库（修改为采用MySQL存储元数据）**
```
bin/schematool -dbType mysql -initSchema -verbose
```

1)      创建一张外部表Stu，字段名及类型为：id BigInt,name String,age Int，存储格式设为TextFile，字段分隔符设置为”,”。
```
CREATE EXTERNAL TABLE Stu (
    id BIGINT,
    name STRING,
    age INT
)
ROW FORMAT DELIMITED 
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/path/to/your/external/table';  -- 请将此路径替换为你的外部表数据存储位置
```