/*
 *创建缓存
 * @param e 缓存名称
 * @param t 缓存值
 * @param i 缓存时间
 */
function setCache (e, t, i) {
  var n = +new Date() / 1000
  var a = true
  var o = {
    expire: i ? n + parseInt(i) : 0,
    value: t
  }
  try {
    wx.setStorageSync(e, o)
  } catch (e) {
    a = false
  }
  return a
}
/*
  *获取缓存
  * @param e 缓存名称
  * @param t 缓存值
  */
function getCache (e, t) {
  var i = +new Date() / 1000
  var n = ''
  i = parseInt(i)
  try {
    n = wx.getStorageSync(e)
    if (n.expire > i || n.expire === 0) {
      n = n.value
    } else {
      n = ''
      removeCache(e)
    }
  } catch (e) {
    n = void 0 === t ? '' : t
  }
  return n || ''
}
/*
  *清除缓存
  * @param e 缓存名称
  */
function removeCache (e) {
  var t = true
  try {
    wx.removeStorageSync(e)
  } catch (e) {
    t = false
  }
  return t
}

// 导出方法，外部调用
module.exports = {
  removeCache: removeCache,
  getCache: getCache,
  setCache: setCache
}
