<template>
  <div class="footer_fixed">
    <div class="fixed_left">
      <a>
        <img src="/static/images/forward.png">
        <button open-type="share">转发分享</button>
      </a>
      <a @click="handlePlaybill(detail.housetype_hposter_url)">
        <img src="/static/images/fileback.png">
        <span>生成海报</span>
      </a>
      <a @click="onAddCollection(detail,2)">
        <img class="collection" src="/static/images/collection.png">
        <span v-if="isCollect === 0">收藏</span>
        <span v-else>已收藏</span>
      </a>
    </div>
    <div class="fixed_right">
      <img src="/static/images/phone.png">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">VIP热线</button>
    </div>
    <!-- https://www.jianshu.com/p/a7c4d394f51a -->
    <modal title="保存后朋友圈分享" :hidden="modalHidden" @confirm="modalConfirm" @cancel="modalCandel">
      <img class="modal-img" :src="modalImg">
    </modal>
  </div>
</template>

<script>
import {
  postMobileSave,
  postAddCollection,
  postRemoveCollection
} from '../http/api.js'

export default {
  props: ['detail'],
  data () {
    return {
      isCollect: this.detail.is_collect,
      modalHidden: true,
      modalImg: ''
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
    handlePlaybill (posterUrl) {
      // 海报
      this.modalHidden = false
      this.modalImg = posterUrl
    },

    modalCandel () {
      this.modalHidden = true
    },

    modalConfirm () {
    // do something
      let _that = this
      wx.getImageInfo({
        src: this.modalImg,
        success (res) {
          _that.saveImg(res.path)
        }
      })
    },
    // 3. 当用户点击分享到朋友圈时，将图片保存到相册
    saveImg (path) {
      wx.saveImageToPhotosAlbum({
        filePath: this.modalImg,
        success: (res) => {
          console.log(res)
          this.modalHidden = true
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
        },
        fail: (e) => {
          console.log(e)
          this.modalHidden = true
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    getPhoneNumber (e) {
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        // 授权成功
        const { encryptedData, iv } = e.mp.detail
        postMobileSave({ encryptedData, iv, token: this.globalData.token })
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
          aid: detail.id,
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

.modal-img {
  display block
  width 100%
  height 300px
}
</style>
