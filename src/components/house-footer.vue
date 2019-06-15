<template>
  <div class="footer_fixed">
    <div class="fixed_left">
      <a @click="share">
        <img src="/static/images/forward.png">
        <button open-type="share">转发</button>
      </a>
      <a @click="getShareImgNew(detail)">
        <img src="/static/images/fileback.png">
        <span>生成海报</span>
      </a>
      <a @click="onAddCollection(detail,type)">
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
            <div class="main-content">
            <div class="canvas-box">
              <canvas canvas-id="shareCanvas" style="width:220px;height:320px;"></canvas>
            </div>
              <img :src="imagePath" alt="">
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
      acti: false
    }
  },
  created () {
    this.isPhone = this.globalData.userinfo.mobile || ''
  },
  methods: {
    share () {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.globalData.address,
          houseId: this.detail.id,
          type: 3
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.globalData.address,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 3
        })
      }
    },
    async getPhoneNumber (e) {
      console.log(e)
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.globalData.address,
          houseId: this.detail.id,
          type: 4
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.globalData.address,
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
          cityId: this.globalData.address,
          houseId: this.detail.id,
          type: 4
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.globalData.address,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 4
        })
      }
      wx.makePhoneCall({phoneNumber: this.detail.sales_mobile})
    },
    getShareImgNew (item) {
      if (this.type === '1') {
        POINTHouseClick({
          cityId: this.globalData.address,
          houseId: this.detail.id,
          type: 5
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.globalData.address,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 5
        })
      }
      const posterUrl = this.type === '2' ? item.housetype_hposter_url : item.poster_url
      this.showModal = true
      this.imagePath = posterUrl
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
          cityId: this.globalData.address,
          houseId: this.detail.id,
          type: 2
        })
      }
      if (this.type === '2') {
        POINTHouseType({
          cityId: this.globalData.address,
          houseId: this.detail.house_id,
          housetypeId: this.detail.id,
          type: 2
        })
      }
      if (this.detail.is_collect === 0) {
        const data = await postAddCollection({
          obj_id: detail.id,
          type: type,
          token: this.globalData.token
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
          type: type,
          token: this.globalData.token
        })
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 1500
        })
        this.$set(this.detail, 'is_collect', 0)
      }
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
