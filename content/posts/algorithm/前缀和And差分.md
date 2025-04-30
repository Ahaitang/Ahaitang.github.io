---
title: "前缀和And差分"
date: 2025-04-27T19:53:39+08:00
lastmod: 2025-04-27T19:53:39+08:00
author: ["AHaiTang"]
categories:
- Algorithm
tags:
- 前缀和
- 差分
- 二维
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

```cpp
#include <bits/stdc++.h>
using namespace std;

using i64 = long long;

void solve() {
    i64 n, m;
    cin >> n >> m;
    vector<i64> nums(n + 1, 0);
    vector<i64> sum(n + 1, 0);
    for(int i = 1; i <= n; i++) {
        cin >> nums[i];
        sum[i] = sum[i - 1] + nums[i];
    }
    while(m--){
        i64 l, r;
        cin >> l >> r;
        cout << sum[r] - sum[l - 1]  << '\n';
    }
}

int main()
{
    solve();
    return 0;
}
```

```cpp

#include <bits/stdc++.h>
using namespace std;

using i64 = long long;

void solve() {
    i64 n, m, q;
    cin >> n >> m >> q;
    vector<vector<i64>> nums(n + 1, vector<i64>(m + 1, 0));
    vector<vector<i64>> sum(n + 1, vector<i64>(m + 1, 0));
    
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            cin >> nums[i][j];
            if(i = 0) sum[0][j] = sum[0][j - 1] + nums[0][j];
            if(j = 0) sum[i][0] = sum[i - 1][0] + nums[i][0];
            sum[i][j] = sum[i][j - 1] + sum[i - 1][j] - sum[i - 1][j - 1] + nums[i][j];
        }
    }
    
    while(q--) {
        i64 x1, x2, y1, y2;
        cin >> x1 >> y1 >> x2 >> y2;
        i64 ans = 0;
        if(!x1 && !y1 ) ans =  sum[x2][y2];  // 这一步与下面两步是在坐标从零开始的状态下
        if(!x1) ans = sum[x2][y2] - sum[x2][y1 - 1];  
        if(!y1) ans = sum[x2][y2] - sum[x1 - 1][y2];
        else ans = sum[x2][y2] - sum[x2][y1 - 1] - sum[x1 - 1][y2] + sum[x1 - 1][y1 - 1];
        cout << ans << endl; 
    }
    
}

int main() 
{
    solve();
    return 0;
}
```


**一维差分**  
推导过程  
1.  首先知道 a[n] 数组  
2.  构建 b[n] 数组  
3.  已知 a[n] = b[1] + b[2] + ... + b[n]  
→→  a[0] = 0;  
    b[1] = a[1] - a[0];  
    .......  
    b[n] = a[n] - a[n - 1]  
→→  在 l - r 的区间内， 给每一个 a[n] 加上 c 的值  
    做法：  
    b[l] += c,  b[r + 1] -= c;   


```cpp
#include <bits/stdc++.h>
using namespace std;

using i64 = long long;

void solve() {
    i64 n, m, q;
    cin >> n >> m >> q;
    vector<vector<i64>> nums(n + 1, vector<i64>(m + 1, 0));
    vector<vector<i64>> sum(n + 1, vector<i64>(m + 1, 0));
    
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            cin >> nums[i][j];
            sum[i][j] = sum[i][j - 1] + sum[i - 1][j] - sum[i - 1][j - 1] + nums[i][j];
        }
    }
    
    while(q--) {
        i64 a, b, c, d;
        cin >> a >> b >> c >> d;
        cout << sum[c][d] - sum[a - 1][d] - sum[c][b - 1] + sum[a - 1][b - 1] << "\n"; 
    }
    
}

int main() 
{
    solve();
    return 0;
}
```

二维差分
b[x1][y1] += c;
b[x1][y2 + 1] -= c;
b[x2 + 1][y1] -= c;
b[x2 + 1][y2 + 1] += c;
→→  求法
    sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + nums[i][j]
→→
    b[i][j] = a[i][j] - a[i - 1][j] - a[i][j - 1] + a[i -1][j -1]
```cpp
#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, m ,q;
    cin >> n >> m >> q;
    
    vector<vector<int>> nums(n + 2, vector<int>(m + 2, 0));
    vector<vector<int>> dif(n + 2, vector<int>(m + 2, 0));
    vector<vector<int>> ans(n + 2, vector<int>(m + 2, 0));

    auto insert = [&](int x1, int y1, int x2, int y2, int val) {
        dif[x1][y1] += val;
        dif[x2+1][y1] -= val;
        dif[x1][y2+1] -= val;
        dif[x2+1][y2+1] += val;
    };
    

    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            cin >> nums[i][j];
            insert(i, j, i, j, nums[i][j]);
        }
    }
    
    // for(int i = 1; i <= n; i++) {
    //     for(int j = 1; j <= m; j++) {
    //         cout << dif[i][j] << " \n"[j == m]; 
    //     }
    // }

    while(q--) {
        int a, b, c, d, val;
        cin >> a >> b >> c >> d >> val;
        insert(a, b, c, d, val);
    }

    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= m; j++) {
            ans[i][j] = ans[i - 1][j] + ans[i][j - 1] - ans[i - 1][j - 1] + dif[i][j];
            // dif[i][j] += dif[i - 1][j] + dif[i][j - 1] - dif[i - 1][j - 1];
            cout << ans[i][j] << " \n"[j == m];
        }
    }

}

int main()
{
    solve();
    return 0;
}
```