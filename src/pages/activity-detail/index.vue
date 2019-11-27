<template>
  <div class="container" v-if="detail">
    <!-- <tips></tips> -->
    <h2 class="title">{{detail.title}}</h2>
    <p class="time">{{detail.create_time}}</p>
    <!-- <img class="banner" :src="detail.photo" alt=""> -->
    <div class="rich-text">
      <rich-text :nodes="detail.content"></rich-text>
    </div>
      <div class="yy-share">
        <p class="yy-share__item" @click="getShareImg">生成海报</p>
      </div>
        <div class="modal" v-if="showModal">
          <div class="mark"></div>
          <div class="body">
            <div class="close" @click="showModal = false">
              <img class="close-img" src='/static/images/icon-closed.png' />
            </div>
            <div class="main">
              <div class='main-title'>
                <img src="" alt="">
              </div>
              <div class="main-content">
              <div class="canvas-box">
                <canvas canvas-id="shareCanvas" style="width:260px;height:400px;"></canvas>
              </div>
                <img v-if='showSharePic' :src="imagePath" alt="">
              </div>
              <div class="main-footer">
                <span @click="saveImg">保存海报</span>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import {postArticleDetail, getArticleShareData, postEWM} from '../../http/api.js'
import base64src from '../../lib/base64src.js'
import tips from '../../components/tips'
export default {
  // 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: this.detail.title || '',
      path: 'pages/activity-detail/main?id=' + this.$route.query.id,
      imageUrl: this.detail.photo || ''
    }
  },
  components: {
    tips
  },
  data () {
    return {
      detail: null,
      saveInfo: null,
      showModal: false,
      modalImg: '',
      imagePath: '',
      showSharePic: false,
      hiddenShareCanvas: true
    }
  },
  async mounted () {
    const data = await postArticleDetail({
      article_id: this.$route.query.id
    })
    this.detail = data
    this.detail.content = this.detail.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:4px auto;" ')
    wx.setNavigationBarTitle({
      title: data.title
    })
    const res = await getArticleShareData({
      article_id: this.$route.query.id
    })
    this.saveInfo = res
  },
  methods: {
    // 点击生产海报按钮
    async getShareImg () {
      // 获取小程序码和海报图片
      const data = await postEWM({
        route: 'pages/activity-detail/main',
        params: this.$route.query.id,
        token: this.globalData.token
      })
      this.showModal = true
      // 发布后替换
      // const data1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAuZJREFUSA2dVktrFEEQrp7d7MwmEfNYdjdG0fgAPQUEFcxBBUkO8SASDwqC3r0IingSf4Q3LyIYJCDm4kERBS9BA+rJS5CQYDbPkcQkO5tkpu2vku7M7MxuYgp6u+qrr6q7+jUrSMmUaJfoU1D2P39K6WNdm6hU4i+4UmiKIFGywO0I5kmS7GADAMTQYBQWxmim/ThUMiyEWa0tHA6HKIncFPLACIuYsnIvScobYdB2nENmjNTRI+T/Gjd+HsO+0kf5sVEqLE8QCCyYfFD2UAzL6tCw5ILwM3fmssYZBGbGMMm3lMRZVZPCtlVdApyFxXFegPTJE2Eu62bo4voMiVQqRtBAycqxapZ2uqFApXRe+00vV8ukyQBNAIzmR/fQkT87T+71OyTX1omyDmP6RyxkOw9WPG9SAzv0LgeseZUvSRsbCRZi8EAwf9MUHXHWMlRQpAbNw4Eze65B9OoUxQKw9jiIuW+fwlSjm4BU12Fqun+X2r9+YKe1r5lwR+z+XkOGYmrAEa8l0vcJ+wQxI5SHhhP5slIxZBDMCDCKy5MkGrNQjfDuB4GxzQhApOcZh1YaTndrlftIgFCrg+PgDtwmf26zpszFnkhAZEoRT4Kh3w43wZcIZRz7rD58PxSjLZG1d9BV70l3zRdo73m3I7nkHW/BFr/t/Wsqbsxyg74biT3BtYJaBp9R5sJ5EpbFDTqw3Uhsl1vfvqJMzznCCRXqtbCamurmCVZWSJY9ErZN6yOj5PYNRPjpiKUMf/I3iYY04bLtRngCahI45BvjE7GQWAXMEIJa37wgu/cSzywWFQJQaeXdR/pz9Rbek5BnU00eQPmEmlV++qdaosZYUBgIVlZptniKpFqqJIlczTDBudZPFLr08GG2aBFRHOZGwG2j5gCVzyO8PMHiEi0+eEwl9X5NZzu5QV96+ISCpb8kHIfWRr9vZ6zS/vvbWRVf38RHAZ8S/EUgZeDm1Y/Y2cs5VC7kRO5/7iMtye51JCIAAAAASUVORK5CYII='
      const qrCode = await base64src(data)
      this.saveShareImg(qrCode)
    },
    saveShareImg (data) {
      // const goodsPicPath = 'http://yuanyang.thongfu.com/Public/Upload/image/20190407/1554566884a7c3990d0250c9b2.jpg'
      const goodsPicPath = this.saveInfo.photo
      const qrCodePath = data
      if (this.imagePath) {
        this.showSharePic = true
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
              wx.hideLoading()
            }
          })
        },
        fail: (e) => {
          wx.hideLoading()
        }
      })
    },
    // 2-绘制分享图片
    drawSharePic (goodsPicPath, qrCodePath) {
      let _that = this
      // y方向的偏移量，因为是从上往下绘制的，所以y一直向下偏移，不断增大。
      let yOffset = 0
      const title = this.saveInfo.title || '置业远洋'
      const time = this.saveInfo.datetext || ''
      const content = this.saveInfo.content || '置业远洋'
      const desc = '长按图片识别小程序码进入置业远洋阅读全文'
      const canvasCtx = wx.createCanvasContext('shareCanvas')
      // 在位置 220 创建蓝线  是下面例子中定义的所有文本的锚点
      canvasCtx.setStrokeStyle()
      canvasCtx.moveTo(260, 0)
      canvasCtx.lineTo(260, 0)
      canvasCtx.stroke()
      // 绘制背景
      canvasCtx.setFillStyle('#FAFAFA')
      canvasCtx.fillRect(0, 0, 520, 800)
      // 标题
      yOffset += 20
      canvasCtx.setFontSize(18)
      canvasCtx.setFillStyle('#000')
      canvasCtx.setTextAlign('center')
      canvasCtx.fillText(title, 130, yOffset)
      // 时间
      yOffset += 20
      canvasCtx.setFontSize(12)
      canvasCtx.setFillStyle('#9FA0A0')
      canvasCtx.setTextAlign('left')
      canvasCtx.fillText(time, 20, yOffset)
      // 绘制海报图片
      yOffset += 10
      canvasCtx.drawImage(goodsPicPath, 20, yOffset, 220, 100)
      // 内容
      yOffset += 20 + 100
      this.drawTxt({
        fillStyle: '#898989',
        fontSize: 12,
        context: canvasCtx,
        scale: 1,
        text: content,
        x: 20,
        y: yOffset
      })
      // 绘制二维码
      yOffset += 20 + 120
      canvasCtx.drawImage(qrCodePath, 20, yOffset, 64, 64)
      yOffset += 12
      // 绘制项目介绍
      this.drawTxt({
        fillStyle: '#818181',
        fontSize: 12,
        context: canvasCtx,
        scale: 1,
        text: desc,
        x: 100,
        y: yOffset,
        maxWidth: 120
      })

      // 绘制图片 绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      canvasCtx.draw(false, setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 260,
          height: 400,
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
    },
    /**
 *【drawTxt】canvas 绘制多行文本
 *【TODO: 中英混排且考虑单词截断...】
 *
 * @param {*} context 绘制上下文环境 【必传】
 * @param {*} scale 缩放比  windowWidth / 750
 * @param {*} text 文本内容
 * @param {*} broken 单词是否截断显示  【true  如果不考虑英文单词的完整性 适用于所有情况】 【false  考虑英文单词的完整性 仅适用于纯英文】
 * @param {*} fillStyle 文本颜色
 * @param {*} fontSize 文本大小
 * @param {*} x 文本左上角x坐标
 * @param {*} y 文本左上角y坐标
 * @param {*} lineHeight 行高
 * @param {*} maxWidth 最大宽度
 * @returns  此次绘制文本的高度 单位: px
 */

    drawTxt ({context, scale = 0.5, text = 'test text', fillStyle = '#000', broken = true, ...rest}) {
      if (!context) throw Error('请传入绘制上下文环境context')
      // 默认设置
      let origin = {x: 0, y: 0, lineHeight: 18, maxWidth: 220, fontSize: 12}

      // 比例计算正确的尺寸
      for (let item in rest) {
        rest[item] *= scale
      }

      // 获取计算后的值
      let {x, y, lineHeight, maxWidth, fontSize} = {...origin, ...rest}

      // 设置字体样式
      context.setTextAlign('left')
      context.setTextBaseline('top')
      context.setFillStyle(fillStyle)
      context.setFontSize(fontSize)

      // broken: true  如果不考虑英文单词的完整性 适用于所有情况
      // broken: false  考虑英文单词的完整性 仅适用于纯英文
      // 【TODO: 中英混排且考虑单词截断...】

      let splitChar = broken ? '' : ' '

      let arrText = text.split(splitChar)
      let line = ''
      let linesCount = 0

      for (var n = 0; n < arrText.length; n++) {
        let testLine = line + arrText[n] + splitChar
        let testWidth = context.measureText(testLine).width
        if (testWidth > maxWidth && n > 0) {
          // 一行已经绘制完成
          linesCount++
          context.fillText(line, x, y)
          line = arrText[n] + splitChar
          y += lineHeight
        } else {
          // 一行还未绘制完成
          line = testLine
        }
      }

      linesCount++
      context.fillText(line, x, y)
      return linesCount * lineHeight
    }

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #fff
    padding 20px
    min-height 100vh
    box-sizing border-box
    .title
      font-family: PingFangSC-Medium
      font-size: 20px
      color: #3F3B3A
      margin-bottom 12px
    .time
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #9FA0A0
      margin-bottom 12px
    .banner
      display block
      width 100%
      height 200px 
      margin-bottom 12px 
    .rich-text
      font-size: 14px !important
      color: #595757 !important
      line-height: 2;
      letter-spacing: 1px;
      image
        display block
        width 100%
        height 200px       
      img 
        display block
        width 100%
        height 200px 
  .yy-share
    position fixed
    top 20px
    right 20px
    z-index 1
    .yy-share__item
      border-radius 30px
      padding 8px 12px
      background rgba(0,0,0,.5)
      font-size 14px
      text-align center
      color #fff 


.modal
  position fixed
  top 0
  left 0
  z-index 1
  width 100%
  height 100%
  overflow hidden
.main-title{
  width 100%;
  height 63px;
  margin-bottom 10px
  img {
    display block;
    width 102px;
    height:63px;
    background #000;
    margin-left 23px;
    margin-top 3px
  }
}
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
  top 0
  right 0
  z-index 1
  .close-img
    display block
    width 14px
    height 14px
    margin 3px auto
.main
  background-color #fff
  width 300px
  height 550px
  overflow hidden
  border-radius 5px
  // padding 20px
  box-sizing border-box
  position relative

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
  width 260px
  height 400px
  margin 0px auto ;
  background: #EFEFEF;
  border-radius: 6px;
  overflow hidden 
  img
    display block
    width 260px
    height 400px
    // margin 30px 25px
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
