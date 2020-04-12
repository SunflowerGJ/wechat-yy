# wechat-yy

> 置业远洋小程序

###### 前端：
* Mpvue框架
* Vant-webapp UI框架
* Flyio 请求api封装

###### 工具和语言
* Webpack
* ES6
* Stylus

## Directory

```
.
├── config/                         // 环境配置 dev 开发环境 prod 生产环境
├── dist/                          // 构建产生的内容
├── node_modules/                  // 三方包
└── src/                           // 源码目录
    ├── components/                // 公共组件目录
    ├── controller/                // 网易云信音视频通话目录 （官网copy）      
        ├── im.js                  // 网易云信SDK NIM.封装             
        ├── netcall.js             // 网易云信音视频通话接口封装  
    ├── lib/                       // 全局工具函数目录
        ├── _requestSubscribeMessage.js  //  订阅消息公共方法封装
        ├── base64src.js           // base64转Url工具函数
        ├── getAddr.js             // 地理定位通用方法 （高德地图）
        ├── wxcharts.js             // 小程序图表工具
    ├── http/                       // 接口请求目录
        ├── request.js              // 请求封装
        └── api.js                  // 接口列表
    ├── pages/                      // 页面目录 
        ├── pA                      // 分包-顾问咨询
        ├── packSearch              // 分包-条件筛选
        ├── packMap                 // 分包-地图找房
        ├── index                   // 首页
        ├── activity                // 资讯
        ├── personal                // 我的
        ├── activity-detail         // 资讯详情-富文本
        ├── calculator              // 房贷计算器
        ├── calculator-result       // 房贷计算器结果       
        ├── web-view                // 资讯详情-webview
        ├── home-page               // 楼盘主页 
        ├── door-details            // 户型详情 
        ├── watch-list              // 围观人列表
        ├── door-list               // 户型图列表
        ├── estate-photo            // 楼盘相册
        ├── go-address              // 位置定位 
        ├── coupon-list             // 优惠券列表
        └── videoCall               // 视频通话               
    ├── store/                      // 网易云信音视频通话目录 （官网copy） 
    ├── stylus/                    // 公共css 样式目录
    ├── utils/                     // 全局工具函数目录
    ├── app.json                   // 小程序app.json配置文件
    ├── App.vue                    // 页面程序入口vue
    ├── main.js                    // 页面程序入口js
    ├── static/                        // 静态资源目录
├── .editorconfig                  // 编辑器缩进配置
├── .gitignore                     // git 文件排除
├── README.md
└── package.json
```

## Build Setup

``` bash
# 初始化项目
git clone https://github.com/wechatyy/wechat-yy.git
cd wechat-yy

# 安装依赖
npm install

# 开发时构建
npm run dev

# 打包构建
npm run build

```


## 参考文档
小程序文档
- https://developers.weixin.qq.com/miniprogram/dev/api/?q=minified

mpvue 文档
- http://mpvue.com/mpvue/#_2

项目地址
- https://github.com/wechatyy/wechat-yy

参考文档：
- https://www.jianshu.com/p/635714eabcbc
- https://www.cnblogs.com/weichen913/p/9439203.html

请求
-  npm install flyio --save

UI框架
- https://gitee.com/mirrors/Vant-Weapp

