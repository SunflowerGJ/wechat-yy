var amapFile = require('../../static/libs/amap-wx.js')
var config = require('../../static/libs/config.js')
export const _getUserAddress = () => {
  var key = config.Config.key
  var myAmapFun = new amapFile.AMapWX({ key: key })
  return new Promise((resolve, reject) => {
    myAmapFun.getRegeo({
      success: function (data) {
        // 成功回调
        let addressComponent = data[0].regeocodeData.addressComponent
        let location = addressComponent.city.length === 0
          ? addressComponent.province
          : addressComponent.city
        const shortName = location.replace(/市$/,'')
        // wx.showModal({
        //   title: '定位城市',
        //   content:JSON.stringify(addressComponent),
        //   success(res) {
        //     if (res.confirm) {
        //       wx.showToast({
        //         title: `${addressComponent.province}+${addressComponent.city[0]}`,
        //         icon: 'success',
        //         duration: 2000
        //       })
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
        resolve(shortName)
      },
      fail: function (info) {
        // 失败回调
        resolve('北京') // eslint-disable-line
      }
    })
  })
}

