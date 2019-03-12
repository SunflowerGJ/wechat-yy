// 首个路由为首页
module.exports = [{
  path: 'pages/index',
  name: 'Index',
  config: {
    navigationBarTitleText: '文章详情',
    // 引入UI组件，后面会讲到
    usingComponents: {

    }
  }
}, {
  path: 'pages/logs',
  name: 'List',
  config: {
    navigationBarTitleText: 'list详情'
  }
}, {
  path: 'pages/counter',
  name: 'List',
  config: {
    navigationBarTitleText: 'list详情'
  }
}]
