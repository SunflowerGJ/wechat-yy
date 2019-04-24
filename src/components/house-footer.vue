<template>
  <div class="footer_fixed">
    <div class="fixed_left">
      <a>
        <img src="/static/images/forward.png">
        <button open-type="share">转发分享</button>
      </a>
      <a @click="getShareImg">
        <img src="/static/images/fileback.png">
        <span>生成海报</span>
      </a>
      <a @click="onAddCollection(detail,type)">
        <img v-if="isCollect === 0" class="collection" src="/static/images/collection.png">
        <span v-if="isCollect === 0">收藏</span>
        <img v-if="isCollect === 1" class="collection" src="/static/images/is-collection.png">
        <span v-if="isCollect === 1">已收藏</span>
      </a>
    </div>
    <div class="fixed_right">
      <img src="/static/images/phone.png">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">VIP热线</button>
    </div>
    <!-- https://www.jianshu.com/p/a7c4d394f51a -->
    <div class="modal" v-if="showModal">
      <div class="mark"></div>
      <div class="body">
        <div class="close" @click="showModal = false"></div>
        <div class="main">
          <div class='main-title'>
            <h4>保存后分享图片</h4>
          </div>
          <div class="main-content">
           <div class="canvas-box">
            <canvas canvas-id="shareCanvas" style="width:220px;height:320px;"></canvas>
           </div>
            <img v-if='showSharePic' :src="imagePath" alt="">
          </div>
          <div class="main-footer">
            <span @click="modalConfirm">确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  postMobileSave,
  postAddCollection,
  postRemoveCollection,
  postEWM
} from '../http/api.js'
import base64src from '../lib/base64src.js'
export default {
  props: ['detail', 'type'],
  data () {
    return {
      isCollect: this.detail.is_collect,
      showModal: false,
      modalImg: '',
      imagePath: '',
      showSharePic: false,
      hiddenShareCanvas: true
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.detail.house_id,
      path: 'pages/door-details/main?id=' + this.$route.query.id
    }
  },

  methods: {

    modalConfirm () {
    // do something
      this.saveImg()
    },
    async getPhoneNumber (e) {
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.makePhoneCall({phoneNumber: '400-032-4608'})
        // 授权成功
        const { encryptedData, iv } = e.mp.detail
        let token = await this.$wx.getStorage({key: 'token'})
        await postMobileSave({ encryptedData, iv, token: token.data })
      }
    },
    // 收藏/取消收藏
    async onAddCollection (detail, type) {
      if (this.isCollect === 0) {
        await postAddCollection({
          obj_id: detail.id,
          type: type,
          token: this.globalData.token
        })
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1500
        })
        this.isCollect = 1
      } else {
        await postRemoveCollection({
          collection_id: detail.cid,
          type: type,
          token: this.globalData.token
        })
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 1500
        })
        this.isCollect = 0
      }
    },
    // 点击生产海报按钮
    async getShareImg () {
      console.log(this.$route)
      // 获取小程序码和海报图片
      const data = await postEWM({
        route: 'pages/index/index',
        params: this.$route.query.id,
        token: this.globalData.token
      })
      this.showModal = true
      console.log(data)
      // 发布后替换
      const data1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAuZJREFUSA2dVktrFEEQrp7d7MwmEfNYdjdG0fgAPQUEFcxBBUkO8SASDwqC3r0IingSf4Q3LyIYJCDm4kERBS9BA+rJS5CQYDbPkcQkO5tkpu2vku7M7MxuYgp6u+qrr6q7+jUrSMmUaJfoU1D2P39K6WNdm6hU4i+4UmiKIFGywO0I5kmS7GADAMTQYBQWxmim/ThUMiyEWa0tHA6HKIncFPLACIuYsnIvScobYdB2nENmjNTRI+T/Gjd+HsO+0kf5sVEqLE8QCCyYfFD2UAzL6tCw5ILwM3fmssYZBGbGMMm3lMRZVZPCtlVdApyFxXFegPTJE2Eu62bo4voMiVQqRtBAycqxapZ2uqFApXRe+00vV8ukyQBNAIzmR/fQkT87T+71OyTX1omyDmP6RyxkOw9WPG9SAzv0LgeseZUvSRsbCRZi8EAwf9MUHXHWMlRQpAbNw4Eze65B9OoUxQKw9jiIuW+fwlSjm4BU12Fqun+X2r9+YKe1r5lwR+z+XkOGYmrAEa8l0vcJ+wQxI5SHhhP5slIxZBDMCDCKy5MkGrNQjfDuB4GxzQhApOcZh1YaTndrlftIgFCrg+PgDtwmf26zpszFnkhAZEoRT4Kh3w43wZcIZRz7rD58PxSjLZG1d9BV70l3zRdo73m3I7nkHW/BFr/t/Wsqbsxyg74biT3BtYJaBp9R5sJ5EpbFDTqw3Uhsl1vfvqJMzznCCRXqtbCamurmCVZWSJY9ErZN6yOj5PYNRPjpiKUMf/I3iYY04bLtRngCahI45BvjE7GQWAXMEIJa37wgu/cSzywWFQJQaeXdR/pz9Rbek5BnU00eQPmEmlV++qdaosZYUBgIVlZptniKpFqqJIlczTDBudZPFLr08GG2aBFRHOZGwG2j5gCVzyO8PMHiEi0+eEwl9X5NZzu5QV96+ISCpb8kHIfWRr9vZ6zS/vvbWRVf38RHAZ8S/EUgZeDm1Y/Y2cs5VC7kRO5/7iMtye51JCIAAAAASUVORK5CYII='
      const qrCode = await base64src(data1)
      this.saveShareImg(qrCode)
    },

    saveShareImg (data) {
      const goodsPicPath = 'http://yuanyang.thongfu.com/Public/Upload/image/20190407/1554566884a7c3990d0250c9b2.jpg'
      const qrCodePath = data

      if (this.imagePath) {
        this.showSharePic = false
        return
      }
      wx.showLoading({
        title: '海报生成中…'
      })
      let _that = this
      // 缓存海报图片
      wx.getImageInfo({
        src: goodsPicPath,
        success: (res) => {
          _that.goodsPicPath = res.path

          // 缓存二维码图片
          wx.getImageInfo({
            src: qrCodePath,
            success: (res) => {
              wx.hideLoading()
              _that.qrCodePath = res.path
              _that.drawSharePic(_that.goodsPicPath, _that.qrCodePath)
            },
            fail: (e) => {
              console.log(e)
              wx.hideLoading()
            }
          })
        },
        fail: (e) => {
          console.log(e)
          wx.hideLoading()
        }
      })
    },

    // 2-绘制分享图片
    drawSharePic (goodsPicPath, qrCodePath) {
      let _that = this
      // y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0
      const desc = '远洋置业'
      const codeText = '长按扫码查看详情'
      const canvasCtx = wx.createCanvasContext('shareCanvas')
      // 在位置 220 创建蓝线  是下面例子中定义的所有文本的锚点
      canvasCtx.setStrokeStyle()
      canvasCtx.moveTo(220, 0)
      canvasCtx.lineTo(220, 0)
      canvasCtx.stroke()
      // 绘制背景
      canvasCtx.setFillStyle('white')
      canvasCtx.fillRect(0, 0, 440, 640)
      // 绘制海报图片
      canvasCtx.drawImage(goodsPicPath, 0, 0, 440, 640)
      // 绘制二维码
      yOffset += 210
      canvasCtx.drawImage(qrCodePath, 140, yOffset, 64, 64)
      // 绘制客户产品名称
      yOffset += 85
      canvasCtx.setFontSize(12)
      canvasCtx.setFillStyle('#fff')
      canvasCtx.setTextAlign('center')
      canvasCtx.fillText(desc, 170, yOffset)
      // 绘制分享文字
      yOffset += 15
      canvasCtx.setFontSize(10)
      canvasCtx.setFillStyle('#fff')
      canvasCtx.setTextAlign('center')
      canvasCtx.fillText(codeText, 170, yOffset)
      // 绘制图片 绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      canvasCtx.draw(false, setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 250,
          height: 375,
          canvasId: 'shareCanvas',
          success: function (res) {
            _that.imagePath = res.tempFilePath
            _that.showSharePic = true
          },
          fail: function (res) {
            wx.showToast({title: '生成海报失败', icon: 'success', duration: 1500})
          }
        })
      }, 200)
      )
    },
    // 3. 当用户点击分享到朋友圈时，将图片保存到相册
    saveImg () {
      const _that = this
      wx.saveImageToPhotosAlbum({
        filePath: _that.imagePath,
        success: (res) => {
          _that.showModal = false
          wx.showToast({title: '保存成功', icon: 'success', duration: 1500})
        },
        fail: (e) => {
          _that.showModal = false
          wx.showToast({title: '保存失败', icon: 'success', duration: 1500})
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../stylus/mixin.styl';

.footer_fixed {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  padding: 7px 12px;
  display: flex;
  justify-content: space-between;

  .fixed_left {
    width: 200px;
    display: flex;
    justify-content: space-between;

    a {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      width: 33%;

      img {
        width: 13px;
        height: 15px;
      }

      img.collection {
        width: 17px;
        height: 15px;
      }

      button {
        font-size: 14px;
        color: #9FA0A0;
        margin-top: 2px;
        padding: 0;
        line-height: 1;

        &::after {
          border: none;
        }
      }

      span {
        font-size: 14px;
        color: #9FA0A0;
        margin-top: 2px;
      }
    }
  }
}

.fixed_right {
  flex: 1;
  font-size: 14px;
  line-height: 30px;
  background: #E60113;
  border-radius: 6px;
  text-align: center;
  color: #ffffff;

  img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    margin-bottom: -3px;
  }

  button {
    font-size: 14px;
    line-height: 30px;
    background: #E60113;
    border-radius: 6px;
    text-align: center;
    color: #ffffff;
    display: inline;

    &::after {
      border: none;
    }
  }
}
.modal
  position fixed
  top 0
  left 0
  z-index 1
  width 100%
  height 100%
  overflow hidden
  .mark
    position fixed
    top 0
    left 0
    z-index 2
    width 100%
    height 100%
    background rgba(0,0,0,.3)
  .body
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 3 
    .close
     position absolute
     width 20px
     height 20px
     background-color red
     top 0
     right 0
     z-index 1
    .main
      background-color #fff
      width 334px
      height 445px
      overflow hidden
      border-radius 5px
      padding 20px
      box-sizing border-box
      position relative
      .main-title
        h4
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #3F3B3A;
          padding-left 10px
          border-left 2px solid #FF2B2B 
      .main-footer
        position absolute
        bottom 18px
        left 50%
        transform translateX(-50%)
        span
          width: 252px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #F0F0F0;
          border-radius: 6px;
          overflow: hidden;
          font-size: 18px;
          color: #fff;
          display: inline-block;
          background-color: #E60113;
      .main-content
        width 220px
        height 320px
        margin 20px auto 
        background: #EFEFEF;
        border-radius: 6px;
        overflow hidden 
        img
          display block
          width 170px
          height 250px
          margin 30px 25px






.canvas-box
  width 100%
  position fixed
  left: 0
  top: 999999px
.modal-img {
  display block
  width 100%
  height 300px
}
</style>
