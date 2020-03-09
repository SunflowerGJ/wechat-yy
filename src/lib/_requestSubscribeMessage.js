// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html

export const _requestSubscribeMessage = (tmplIds, sucCallback, failCallback, completeCallBack) => {
  wx.getSetting({
    withSubscriptions: true,
    success: function (res) {
      console.log('获取设置信息')
      console.log(res)
      let mainSwitch = res.subscriptionsSetting ? res.subscriptionsSetting.mainSwitch:true // 是否开启订阅功能 兼容开发者工具
      let isAllow = false // 是否始终允许
      if (!mainSwitch) { // 订阅失败
        wx.showModal({
          title: '提示',
          content: '您的订阅消息功能已关闭，请点击右上角胶囊按钮=>设置=>订阅消息，选择接收订阅消息后重新订阅'
        })
      }
      if (wx.requestSubscribeMessage) {
        wx.requestSubscribeMessage({
          tmplIds,
          success(resp) {
            wx.getSetting({
              withSubscriptions: true,
              success: function (res) {
                let itemSettings = res.subscriptionsSetting ? (res.subscriptionsSetting.itemSettings || []) :[]// 一次性订阅消息状态
                console.log(itemSettings)
                //  当前tmplIds 都在 itemSettings为 true
                isAllow = tmplIds.every(item => {
                  return Object.keys(itemSettings).includes(item) && itemSettings[item] === 'accept'
                }) 
                console.log("订阅成功-是否始终" + isAllow)
                sucCallback && sucCallback(resp, isAllow);
              }
            })
          },
          fail(err) {
            console.log("订阅失败")
            failCallback && failCallback(err, false);
          },
          complete(res) {
            console.log("订阅完成")
            completeCallBack && completeCallBack(res);
          }
        })
      } else {
        let res = {
          title: '提示',
          content: '当前微信版本过低，无法使用订阅功能，请升级到最新微信版本后重试。'
        }
        completeCallBack && completeCallBack(res);
        wx.showModal(res)
      }
    }
  })
}
