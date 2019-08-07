// 引入 fly
// import { login } from './api'
var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
var loginFly = new Fly()
// 配置请求基地址
// //定义公共headers
const headers = {
  'content-type': 'application/x-www-form-urlencoded'
}
fly.config = {
  headers: headers,
  timeout: 30000,
  withCredentials: true
}
loginFly.config = fly.config

const reLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        var ROOT_API = process.env.ROOT_API
        loginFly.post(`${ROOT_API}/api/member/login`, {code: res.code})
          .then(result => {
            // console.log('4、重新请求得到的token：')
            // console.log(result.data.data.token)
            wx.setStorage({key: 'token', data: result.data.data.token})
            wx.setStorage({key: 'userinfo', data: result.data.data.userinfo})
            resolve(result.data.data)
          })
          .catch(error => {
            reject(error)
          })
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

// 添加拦截器
fly.interceptors.request.use((request, promise) => {
  if (wx.getStorageSync('token')) { // 检查本地缓存是否有token存在没有则重新获取
    // console.log(`1、请求${request.url}携带的token：`)
    // console.log(wx.getStorageSync('token'))
    request.body.token = wx.getStorageSync('token')
    return request
  } else {
    fly.lock()// 锁住请求
    // 发起网络请求
    return reLogin().then(res => {
      fly.unlock()
      request.body.token = wx.getStorageSync('token')
      return request
    }).catch(() => {
      fly.unlock()
      return request
    })
  }
})

fly.interceptors.response.use(
  (response) => {
    if (response.data && ['50001', '50002', '50003'].includes(response.data.code)) {
      // console.log(`2、解析错误：返回码${response.data.code}`)
      wx.removeStorage({key: 'token'})
      wx.setStorage({key: 'reject', data: false})
      fly.lock()// 锁住请求
      // console.log(`3、重新请求token`)
      // 发起网络请求
      return reLogin().then(res => {
        fly.unlock()
        // 重新请求
        // console.log('5、重发请求：' + response.request.url)
        return fly.request(response.request)
      }).catch(() => {
        fly.unlock()
        return response
      })
    } else {
      return response
    }
  }
)

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
