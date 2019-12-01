<template>
  <div class="container .test"> 
    <div class="header">
      <div class="adr"  @click='goCityList'>
        <span class="adr-selected">{{address}}</span>
          <img src="/static/images/icon-index-addr.png" alt="">
      </div>
      <div class="search" @click="goHousesSearch">
        <img src="/static/images/icon-search.png" alt="">
        <input disabled placeholder="搜索意向楼盘"/>
      </div>
    </div>
    <div class="swipe-banner">
      <swiper
        :circular='true'
        class="swipe-banner__wrap"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000">
        <block v-for="(item,index) in bannerList" :index="index" :key="index">
            <swiper-item @click="goBanner(item)" >
                <image :src="item.photo" class="swipe-banner__item" mode="aspectFill"/>
            </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nav">
      <div class="nav__item" @click="goNav(item)" v-for="item in navList" :index="item" :key="item">
        <image :src="item.icon" class="nav_img"/>
        <p class="nav_text">{{item.text}}</p>
      </div>
    </div>
    <div class="main">
      <block v-for="(item,index) in houses"  :index="index" :key="index">
        <house-card
          :houseClick="houseClick"
          :key="index"
          :hData='item'></house-card>  
      </block>
    </div>
    <get-user-info></get-user-info>
      <van-popup  :show="showNoticeModal" position="center" >
        <div class="notice-model">
          <div class="notice-model__main">
            <img @click="jumpByNoticeModal" class="notice-model__main-img" mode="widthFix" :src="alertAd.photo" alt=""/>
          </div>
          <div class="notice-model__close" @click="showNoticeModal=false">
            <img class="notice-model__close-img" src='/static/images/icon-closed.png' />
          </div>
        </div>
      </van-popup>
  </div>
</template>

<script>
import GetUserInfo from '../../components/get-userinfo'
import {postIndex, POINTCity, POINTAd, getCityAlertAd} from '../../http/api.js'
import HouseCard from '../../components/house-card'
import {_getUserAddress} from '../../lib/getAddr.js'
// import { getCache, setCache } from '../../utils/cache.js'
export default {

// 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: '置业远洋欢迎您',
      path: 'pages/index/main',
      success: function (res) {},
      fail: function (res) {}
    }
  },
  components: {
    HouseCard,
    GetUserInfo
  },
  data () {
    return {
      cityInfo: {},
      showNoticeModal: false,
      alertAd: {},
      houseClick: {
        type: 1
      },
      serValue: '',
      bannerList: [],
      houses: [],
      navList: [
        {
          icon: '/static/images/index-nav-map.png',
          text: '地图找房',
          path: '/pages/map/main',
          type: 'map'
        },
        {
          icon: '/static/images/index-nav-search.png',
          text: '条件筛选',
          path: '/pages/houses-filter/main',
          type: 'select'
        }
      ],
      address: '定位'
    }
  },
  methods: {
    fetchCityAlertAd (city) {
      getCityAlertAd({city}).then(res => {
        this.alertAd = res
        this.showNoticeModal = res.status === '1'
      })
    },
    // 优惠券弹窗跳转
    jumpByNoticeModal () {
      let alertAd = this.alertAd
      // type =1是外链=2是楼盘=3是资讯=4是优惠券
      switch (alertAd.type) {
        case '1':
          this.$router.push({ path: '/pages/web-view/main', query: {src: alertAd.url, id: alertAd.id} })
          break
        case '2':
          this.$router.push({path: '/pages/home-page/main', query: { id: alertAd.url }})
          break
        case '3':
          this.$router.push({ path: '/pages/activity-detail/main', query: { id: alertAd.url } })
          break
        case '4':
          // this.goCouponList(alertAd)
          alertAd.city_name = this.cityInfo.name
          this.$router.push({ path: '/pages/coupon-list/main', query: alertAd })
          break
        default:
      }
      this.showNoticeModal = false
    },
    // 广告跳转
    goBanner (item) {
      // 广告类型 1外链公众号 2楼盘 3资讯
      if (item.type === '1') {
        const src = item.url ? encodeURIComponent(item.url) : ''
        const title = item.title
        const photo = item.photo ? encodeURIComponent(item.photo) : ''
        this.$router.push({ path: '/pages/web-view/main', query: {src, title, photo, id: item.id} })
      }
      if (item.type === '2') {
        this.$router.push({ path: '/pages/home-page/main', query: {id: item.url} })
      }
      if (item.type === '3') {
        this.$router.push({ path: '/pages/activity-detail/main', query: {id: item.url} })
      }
      if (item.type === '4') {
        this.goCouponList()
      }
      POINTCity({
        cityId: this.address,
        type: 'ad'
      })
      POINTAd({
        cityId: this.address,
        adId: item.id
      })
    },
    // nav栏跳转
    goNav (item) {
      if (this.address !== '定位') {
        this.$router.push({path: item.path, query: {city: this.address}})
      }
      POINTCity({
        cityId: this.address,
        type: item.type
      })
    },
    // 城市列表跳转
    goCityList () {
      this.$router.push({path: '/pages/city-list/main', query: {city: this.address}})
    },
    // 楼盘列表跳转
    goHousesSearch () {
      this.$router.push({path: '/pages/houses-search/main'})
    },
    async  fetchIndexData (params) {
      try {
        const data = await postIndex(params)
        this.bannerList = data.ads
        this.cityInfo = data.cityInfo
        this.houses = data.houses.map(item => {
          if (item.tags) {
            return {...item, tags: item.tags.split('|')}
          } else {
            return item
          }
        })
        this.houseClick.cityId = data.cityInfo.shortname
      } catch (err) {}
    }
  },
  async onShow () {
    console.log('indexShow')
    const adr = this.$route.query.addr
    const obj = this.$route.query.params
    if (obj) {
      // 条件筛选后跳转
      const params = JSON.parse(obj)
      params.city = this.address
      this.fetchIndexData(params)
      return
    }
    if (!adr) {
      const city = await _getUserAddress()
      this.address = city
      this.globalData.address = city
      this.fetchIndexData({city: this.address})
    } else {
      this.address = adr
      this.globalData.address = adr
      this.fetchIndexData({city: this.address})
    }
  },
  async mounted () { // 地址筛选待调整
    console.log('indexOnload')
    const adr = this.$route.query.addr
    if (!adr) {
      const city = await _getUserAddress()
      this.address = city
      this.globalData.address = city
      this.fetchCityAlertAd(city)
    } else {
      this.address = adr
      this.globalData.address = adr
      this.fetchCityAlertAd(adr)
    }

    POINTCity({
      cityId: this.address,
      type: 'index'
    })
  }
}
</script>
<style style lang="stylus" rel="stylesheet/stylus">
.container {
  .van-popup {
    background: transparent!important;
  }
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../../stylus/mixin.styl"
.container
  .header
    padding 16px 24px
    height 60px
    display flex
    justify-content: space-around;
    box-sizing border-box
    .adr
      width 100px
      display flex
      align-items center
      .adr-selected
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000;
      .adr-select
        font-size: 12px;
        color: #636363;  
      img 
        display block
        width 14px
        height 17px 
        margin-left 10px 

  .search
    background-color #fff   
    width 218px
    height 28px
    border-radius 14px
    overflow hidden 
    font-size 12px; 
    display flex  
    img 
      width 24px
      height 24px
      margin 0 10px 0 24px 
    input 
     display block
     height 28px
     line-height 28px    
  .swipe-banner
    height 160px
    .swipe-banner__wrap
      height 160px
      .swipe-banner__item
        width 375px
        height 160px
  .nav
    padding 12px 20px
    display flex
    justify-content: space-between
    .nav__item
      width 160px
      height 90px
      background-color #fff
      text-align: center
      .nav_img 
        width: 60px
        height: 60px
        display: block
        margin: auto
      .nav_text 
        font-size: 14px
        color: #121111
  .main
    background-color #f2f2f2
.notice-model__close {
  width 20px
  height 20px
  margin 30px auto
  .notice-model__close-img {
    display block;
    width 20px
    height 20px
  }
}
.notice-model__main {
  .notice-model__main-img {
    margin 0 auto;
    width 320px;
    display block;
  }
}
</style>
