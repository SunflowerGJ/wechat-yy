<template>
  <div class="container coupon-list">
    <scroll-view scroll-y style="height: 100vh;" @scrolltolower="scrolltolower">
      <div class="header">
        <img :src="query.photo" alt="">
        <div class="header-title">
          <text class="header-title__address">{{query.city_name}}</text>
          <text>{{query.name}}</text>
        </div>
      </div>
      <div class="desc">
        <div class="desc-item">1.点击【
          <text>抢券</text>】按钮即可完成领取
        </div>
        <div class="desc-item">2.所有领取过的礼券均可在【我的】-【我的礼券】页面中找到</div>
        <div class="desc-item">3.礼券过期后将自动失效</div>
      </div>
      <div class="coupons">
        <div class="coupon-item" v-for="(item,index) in list" :key="index">
          <div class="coupon-item__content">
            <img :src="item.photo">
            <div class="content-main">
              <div class="content-name">{{item.name}}</div>
              <div class="content-remark">{{item.remark}}</div>
            </div>
          </div>
          <div class="coupon-item__foot">
            <div class="date">有效期：{{item.endtime}}</div>
            <div class="button" @click="isAuth?onOpenModel(item.id,item.photo):''">
              抢券            
              <button v-if="!isAuth" open-type="getUserInfo" @getuserinfo="getUserInfo" class="open-type-btn"></button></div>
          </div>
        </div>
        <div v-if="next_page==0" class="no-data">没有其他礼券了，稍后再来看看吧</div>
      </div>
    </scroll-view>
    <van-popup
      :show="show"
      closeable
      close-on-click-overlay
      position="bottom"
      :close="onClose">
        <div class="popup-wrap">
          <div class="close" @click="show = false">
            <img class="close-img" src='/static/images/icon-closed.png' />
          </div>
          <img class="review-img" :src="getCoupons.url" alt="">
          <div class="review-remark">
            <div class="is-fail" v-if="getCoupons.status === 0">
              已经领完了，下次再来试试吧 
            </div>
            <div class="is-suc" v-if="getCoupons.status === 1">
              <div class="is-suc-title">领取成功</div>
              <div>使用时【我的】-【我的礼券】中找到并点开该礼券即可</div>
            </div>
          </div>
        </div>
    </van-popup>
  </div>
</template>
<script>
import { postCouponsList, postGetCoupons, POINTBtnClickNum, postUserInfoSave } from '../../http/api.js'
let app = getApp()
export default {
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    // return {
    //   title: this.detail.share_title || '置业远洋欢迎您',
    //   path: 'pages/home-page/main?id=' + this.house_id
    // }
  },
  components: {},
  data () {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      total_page: 0,
      next_page: 1,
      falg: true,
      show: false,
      getCoupons: {
        url: '',
        status: 1
      },
      query: {},
      isAuth: false
    }
  },
  onLoad: function (options) {
    this.query = this.$route.query
  },

  async mounted () {
    const data = await postCouponsList({
      house_id: this.$route.query.house_id,
      city_id: this.$route.query.city_id,
      page: this.page,
      pagesize: this.pagesize
    })
    this.list = data.list
    this.total_page = data.total_page
    this.next_page = data.next_page
    this.isAuth = wx.getStorageSync('userinfo') || false
  },
  onUnload () {
    this.list = []
    this.page = 1
    this.pagesize = 10
    this.total_page = 0
    this.falg = true
    this.next_page = 1
  },
  methods: {
    // 获取用户头像
    async getUserInfo (e) {
      let resp = e.mp.detail
      if (resp.errMsg === 'getUserInfo:ok') {
        const { userInfo } = resp
        const userinfo = {
          nickname: userInfo.nickName,
          headimgurl: userInfo.avatarUrl,
          sex: userInfo.gender,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city
        }
        await postUserInfoSave({...userinfo})
        wx.setStorageSync('userinfo', userinfo)
        this.isAuth = userinfo
        app.globalData.userinfo = userinfo
      }
    },
    async onOpenModel (couponsid, img) {
      POINTBtnClickNum({couponsid})
      // 外部的都是10000  里面的码 10000  领取成功 10001 已领完   10002已领券  10003 未找到优惠券  10004 优惠券已下架  10005 活动未开始  10006 已过领取时间   10007 已领完  10008  已领完 10009 网络故障 10010 网络故障 10011 网络故障
      const data = await postGetCoupons({couponsid})
      if (Number(data.code) === 10000) {
        this.getCoupons = {
          status: 1,
          url: img
        }
        this.show = true
      } else if (Number(data.code) === 10001) {
        this.getCoupons = {
          status: 0,
          url: img
        }
        this.show = true
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    },
    onClose () {
      this.show = false
    },
    async scrolltolower (e) {
      if (this.falg) {
        this.falg = false
        this.page++
        if (this.total_page >= this.page) {
          const data = await postCouponsList({
            house_id: this.$route.query.house_id,
            city_id: this.$route.query.city_id,
            page: this.page,
            pagesize: this.pagesize
          })
          this.list = [...this.list, ...data.list]
          this.total_page = data.total_page
          this.next_page = data.next_page
          this.falg = true
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.container {
  background: #f2f2f2;
  height: auto;
}

.coupon-list {
  .header {
    height: 220px;
    position: relative;

    img {
      display: block;
      width: 100%;
      height: 100%;
      background: red;
    }

    .header-title {
      width: 314px;
      height: 70px;
      background: rgba(64, 63, 63, 1);
      opacity: 0.68;
      line-height: 140rpx;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      text {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }

      .header-title__address {
        margin-right: 20rpx;
      }
    }
  }

  .desc {
    width: 375px;
    height: 80px;
    background: rgba(254, 254, 254, 1);
    box-sizing: border-box;
    padding: 15px 22px;
    margin-bottom: 16rpx;

    .desc-item {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: rgba(159, 160, 160, 1);
      line-height: 17px;

      text {
        color: #E60113;
      }
    }
  }
}

.coupons {
  .coupon-item {
    width: 375px;
    height: 152px;
    background: rgba(255, 255, 255, 1);
    padding: 12px 32px 0 32px;
    box-sizing: border-box;
    margin-bottom: 10px;

    .coupon-item__content {
      display: flex;
      justify-content: center;
      // align-items: center;

      img {
        display: block;
        width: 140px;
        height: 98px;
        margin-right: 26px;
        border-radius: 8rpx;
      }

      .content-main {
        flex: 1;
        height 100%;

        .content-name {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(63, 59, 58, 1);
          line-height: 17px;
          margin-bottom 4px;
        }

        .content-remark {
          height: 70px;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(137, 137, 137, 1);
          line-height: 14px;
        }
      }
    }

    .coupon-item__foot {
      height: 33px;
      border-top: 1px solid #F1F1F1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;

      .date {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(137, 137, 137, 1);
        line-height: 14px;
      }

      .button {
        width: 89px;
        height: 21px;
        background: rgba(230, 1, 19, 1);
        border-radius: 6px;
        font-size: 12px;
        color: #fff;
        line-height: 21px;
        text-align: center;
        position relative
      }
    }
  }
  .no-data {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(159, 160, 160, 1);
    line-height: 17px;
    padding-top: 15px;
    padding-bottom 30px;
    text-align: center;
  }
}
.popup-wrap {
  padding 27px 20px 14px 20px;
  box-sizing border-box;
  height 300px;
  .review-img {
    display block;
    width:336px;
    height:210px;
    margin 0 auto;
    background:rgba(249,249,249,1);
  }
  .review-remark {
    font-size:10px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(137,137,137,1);
    line-height:14px;
    text-align center;
    .is-suc-title {
      font-size:20px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,76,100,1);
      line-height:28px;
      margin-top 4px;
    }
    .is-fail {
      margin-top 13px
    }
  }
}
.close
  position absolute
  width 20px
  height 20px
  top 5px
  right 5px
  z-index 1
  .close-img
    display block
    width 14px
    height 14px
    margin 3px auto
</style>