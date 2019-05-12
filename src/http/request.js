// 引入 fly
import { login } from './api'
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
fly.interceptors.request.use((request, promise) => {
  // 给所有请求添加自定义header
  request.headers['content-type'] = 'application/x-www-form-urlencoded'
  if (wx.getStorageSync('token')) { // 检查本地缓存是否有token存在没有则重新获取
    request.body.token = wx.getStorageSync('token')
    return request
  } else {
    fly.lock()// 锁住请求
    wx.login({
      success (res) {
        if (res.code) {
          // 发起网络请求
          login({code: res.code}).then(data => {
            wx.setStorage({key: 'token', data: data.token})
            wx.setStorage({key: 'userinfo', data: data.userinfo})
            request.body.token = wx.getStorageSync('token')
          })
        }
      }
    })
    fly.unlock()// 解锁请求
    return request
  }
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
