<template>
  <div class="footer_fixed">
    <div class="fixed_left">
      <button open-type="share" class="item item--button" @click="share">
        <img src="/static/images/forward.png">
        <span>转发</span>
      </button>
      <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="item item--button" @click="getShareImgNew(detail)">
        <img src="/static/images/fileback.png">
        <span>生成海报</span>
      </button>
      <a class="item" @click="onAddCollection(detail,type)">
        <img v-if="detail.is_collect === 0" class="collection" src="/static/images/collection.png">
        <span v-if="detail.is_collect === 0">收藏</span>
        <img v-if="detail.is_collect === 1" class="collection" src="/static/images/is-collection.png">
        <span v-if="detail.is_collect === 1">收藏</span>
      </a>
    </div>
    <!-- // 已经有电话 -->
    <div class="fixed_right" v-if="isPhone">
      <img src="/static/images/phone.png">
      <span @click='makePhoneCall'>VIP热线</span>
    </div>
    <div class="fixed_right" v-if="!isPhone">
      <img src="/static/images/phone.png">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">VIP热线</button>
    </div>
    <!-- https://www.jianshu.com/p/a7c4d394f51a -->
      <van-popup  :show="showModal" position="bottom" >
          <div class="close" @click="showModal = false">
            <img class="close-img" src='/static/images/icon-closed.png' />
          </div>
          <div class="main">
            <div class='main-title'>
              <h4>保存后分享图片</h4>
            </div>
            <!-- <div class="main-content">
            <div class="canvas-box">
              <canvas canvas-id="shareCanvas" style="width:220px;height:320px;"></canvas>
            </div>
              <img :src="imagePath" alt="">
            </div> -->
            <div class="main-content">
            <div class="canvas-box">
              <canvas canvas-id="shareCanvas" style="width:340px;height:500px;"></canvas>
            </div>
              <img v-if='showSharePic' :src="imagePath" alt="">
            </div>
            <div class="main-footer">
              <span @click="modalConfirm">保存到手机</span>
            </div>
          </div>
      </van-popup>

  </div>

</template>

<script>
import {
  postMobileSave,
  postAddCollection,
  postRemoveCollection,
  POINTHouseClick,
  POINTHouseType
} from '../http/api.js'

export default {
  props: ['detail', 'type'],
  data () {
    return {
      showModal: false,
      imagePath: '',
      isPhone: '',
      showSharePic: false
    }
  },
  created () {
    if (this.globalData.userinfo) {
      this.isPhone = this.globalData.userinfo.mobile || ''
    }
  },
  onShow () {
    if (this.globalData.userinfo) {
      this.isPhone = this.globalData.userinfo.mobile || ''
    }
  },
  methods: {
    share () {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.detail.city_id,
          houseId: this.detail.id,
          type: 3
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.detail.city_id,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 3
        })
      }
    },
    async getPhoneNumber (e) {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.detail.city_id,
          houseId: this.detail.id,
          type: 4
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.detail.city_id,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 4
        })
      }
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.makePhoneCall({phoneNumber: this.detail.sales_mobile})
        // 授权成功
        const { encryptedData, iv } = e.mp.detail
        await postMobileSave({ encryptedData, iv })
      }
    },
    makePhoneCall () {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.detail.city_id,
          houseId: this.detail.id,
          type: 4
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.detail.city_id,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 4
        })
      }
      wx.makePhoneCall({phoneNumber: this.detail.sales_mobile})
    },
    getShareImgNew (detail) {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: detail.city_id,
          houseId: detail.id,
          type: 5
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: detail.city_id,
          houseId: detail.house_id,
          housetypeId: detail.id,
          type: 5
        })
      }
    },
    saveShareImg (posterUrl, avatarUrl) {
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
        src: posterUrl,
        success: (res) => {
          _that.posterUrl = res.path
          // 缓存二维码图片
          wx.getImageInfo({
            src: avatarUrl,
            success: (res) => {
              wx.hideLoading()
              _that.avatarUrl = res.path
              _that.drawSharePic(_that.posterUrl, _that.avatarUrl)
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
    drawSharePic (posterUrl, avatarUrl) {
      let _that = this
      const canvasCtx = wx.createCanvasContext('shareCanvas')
      // 在位置 220 创建蓝线  是下面例子中定义的所有文本的锚点
      canvasCtx.setStrokeStyle()
      canvasCtx.moveTo(220, 0)
      canvasCtx.lineTo(220, 0)
      canvasCtx.stroke()
      // 绘制背景
      canvasCtx.setFillStyle('white')
      canvasCtx.fillRect(0, 0, 340, 500)
      // 绘制海报图片
      canvasCtx.drawImage(posterUrl, 0, 0, 340, 500)
      canvasCtx.save() // 对当前区域保存
      canvasCtx.beginPath() // 开始新的区域
      canvasCtx.arc(42, 458, 32, 0, 2 * Math.PI)
      canvasCtx.closePath()
      canvasCtx.clip() // 从画布上裁剪出这个圆形
      canvasCtx.drawImage(avatarUrl, 10, 426, 64, 64)
      canvasCtx.restore() // 恢复
      // 绘制图片 绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      canvasCtx.draw(false, setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 340,
          height: 500,
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
    modalConfirm () {
      const _that = this
      wx.getImageInfo({
        src: this.imagePath,
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
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
      })
    },
    // 收藏/取消收藏
    async onAddCollection (detail, type) {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: detail.city_id,
          houseId: detail.id,
          type: 2
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: detail.city_id,
          houseId: detail.house_id,
          housetypeId: detail.id,
          type: 2
        })
      }
      if (this.detail.is_collect === 0) {
        const data = await postAddCollection({
          obj_id: detail.id,
          type: type
        })
        this.$emit('addCID', data.collection_id)
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1500
        })
        this.$set(this.detail, 'is_collect', 1)
        this.detail.is_collect = 1
      } else {
        await postRemoveCollection({
          collection_id: detail.cid,
          type: type
        })
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 1500
        })
        this.$set(this.detail, 'is_collect', 0)
      }
    },
    // 获取用户头像
    getUserInfo () {
      const _that = this
      const posterUrl = this.type === '2' ? this.detail.housetype_hposter_url : this.detail.poster_url
      this.showModal = true
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          _that.saveShareImg(posterUrl, userInfo.avatarUrl)
        },
        fail: function (e) {
          _that.imagePath = posterUrl
          _that.showSharePic = true
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

    .item--button {
      padding-left:0;
      padding-right:0;
    }

    .item {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      width: 33%;
      line-height: 1;

      &::after {
          border: none;
        } 

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
  span,
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
    bottom 0
    left 0
    // transform translate(-50%, -50%)
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
  width 375px
  height 445px
  overflow hidden
  // border-radius 5px
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
