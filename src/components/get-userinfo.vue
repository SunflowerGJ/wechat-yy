<template>
<div class="contain">
  <div class="modal" v-if="hidden">
    <div class="mark"></div>
    <div class="body">
      <div class="main">
        <h4>登录并授权</h4>
        <p>申请获取以下权限</p>
        <p>获得你的公开信息（昵称，头像）</p>
        <div class="main-footer">
            <button open-type="getUserInfo" @getuserinfo="getUserInfo"> 允许 </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  postUserInfoSave,
  postMobileSave
} from '../http/api.js'
export default {

  data () {
    return {
      hidden: false
    }
  },
  async mounted () {
    let reject = false
    try {
      reject = await this.$wx.getStorage({key: 'reject'})
      var token = await this.$wx.getStorage({key: 'token'})
      var userinfo = await this.$wx.getStorage({key: 'userinfo'})
    } catch (e) {}
    if (token.data && (!userinfo.data.nickname) && !reject.data) {
      this.hidden = true
    }
  },
  methods: {
    getUserInfo () { // 同意授权，获取用户信息，encryptedData是加密字符串，里面包含unionid和openid信息
      const _that = this
      wx.getUserInfo({
        withCredentials: true, // 此处设为true，才会返回encryptedData等敏感信息
        success: async (res) => {
        // 可以将 res 发送给后台解码出 unionId
          _that.hidden = false
          const { encryptedData, iv, userInfo } = res
          const userinfo = {
            nickname: userInfo.nickName,
            headimgurl: userInfo.avatarUrl,
            sex: userInfo.gender,
            country: userInfo.country,
            province: userInfo.province,
            city: userInfo.city
          }
          postMobileSave({ encryptedData, iv })
          postUserInfoSave({...userinfo}).then(res => {
            wx.setStorage({key: 'userinfo', data: userinfo})
            this.globalData.userinfo = userinfo
          })
        },
        fail: (e) => {
          wx.setStorage({key: 'reject', data: true})
          _that.hidden = false
        }
      })
    }
  }

}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../stylus/mixin.styl"

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
      height 180px
      overflow hidden
      border-radius 5px
      padding 20px
      box-sizing border-box
      position relative
      h4
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333;
        text-align center
        font-weight 400
        margin-bottom 20px
      p 
        font-size: 14px;
        color: #999;
        text-align center 
        margin-bottom 15px  
      .main-footer
        position absolute
        bottom 10px
        left 50%
        transform translateX(-50%)
        button
          width: 260px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 6px;
          overflow: hidden;
          font-size: 16px;
          color: #fff;
          display: inline-block;
          background-color #1aad16
          &::after {
            border: none;
          }





 
</style>
