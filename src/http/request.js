// 引入 fly
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

// 配置请求基地址
// //定义公共headers
// fly.config.headers = {}
// //设置超时
// fly.config.timeout=10000;
// //设置请求基地址
// fly.config.baseURL="https://wendux.github.io/"

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['content-type'] = 'application/x-www-form-urlencoded'
  return config
})

var request = (options, showLoading = true, loadingConfig = {title: '加载中...'}) => {
  var ROOT_API = process.env.ROOT_API
  var method = options.method || 'get'
  var timeout = options.timeout || '5000'
  var url = `${ROOT_API}${options.url}`
  var params = options.params
  showLoading && wx.showLoading(loadingConfig)

  return new Promise((resolve, reject) => {
    fly.request(url, params, {
      method: method,
      timeout: timeout // 超时设置为5s
    }).then(res => {
      showLoading && wx.hideLoading()
      if (res.status === 200) {
        const data = res.data
        if (data.code === 10000) {
          resolve(data.data)
        } else {
          // todo 根据状态码统一业务处理
          // icon只支持success. loading
          wx.showToast({
            title: data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: res.statusText,
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(e => {
      wx.showToast({
        title: e,
        icon: 'success',
        duration: 2000
      })
      showLoading && wx.hideLoading()
      reject(e)
    })
  })
}

export default request
