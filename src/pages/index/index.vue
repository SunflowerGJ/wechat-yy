<template>
  <div class="container .test"> 
    <div class="header">
      <div class="adr">
        <span class="adr-selected">{{address}}</span>
        <span class="adr-select" @click='goCityList'>选择地址></span>
      </div>
      <div class="search" @click="goHousesSearch">
        <img src="/static/images/icon-search.png" alt="">
        <input disabled placeholder="搜索意向楼盘"/>
      </div>
    </div>
    <div class="swipe-banner">
      <swiper
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
      <div class="nav__item" @click="goNav(item.path)" v-for="item in navList" :index="item" :key="item">
        <image :src="item.icon" class="nav_img"/>
        <p class="nav_text">{{item.text}}</p>
      </div>
    </div>
    <div class="main">
      <template v-for="(item,index) in houses">
        <house-card
          :key="index"
          :hData='item'></house-card>  
      </template>
    </div>
  </div>
</template>

<script>
import {postIndex} from '../../http/api.js'
import HouseCard from '../../components/house-card'
var amapFile = require('../../../static/libs/amap-wx.js')
var config = require('../../../static/libs/config.js')
export default {
  components: {
    HouseCard
  },
  data () {
    return {
      serValue: '',
      bannerList: [],
      houses: [],
      navList: [
        {
          icon: '/static/images/index-nav-map.png',
          text: '地图找房',
          path: '/pages/map/main'
        },
        {
          icon: '/static/images/index-nav-search.png',
          text: '条件筛选',
          path: '/pages/houses-filter/main'
        }
      ],
      address: '定位中'
    }
  },
  methods: {
    // 头部定位
    _getUserAddress () {
      var key = config.Config.key
      var myAmapFun = new amapFile.AMapWX({ key: key })
      return new Promise((resolve, reject) => {
        myAmapFun.getRegeo({
          success: function (data) {
            console.log(data)
            // 成功回调
            let addressComponent = data[0].regeocodeData.addressComponent
            let location = addressComponent.city.length === 0
              ? addressComponent.province
              : addressComponent.city[0]
            resolve(location)
          },
          fail: function (info) {
            // 失败回调
            resolve('北京市') // eslint-disable-line
          }
        })
      })
    },
    // 广告跳转
    goBanner (item) {
      // 广告类型 1外链公众号 2楼盘 3资讯
      if (item.type === 2) {
        this.$router.push({ path: '/pages/home-page/main', query: {id: item.url} })
      } else {
        this.$router.push({ path: '/pages/web-view/main', query: {src: item.url} })
      }
    },
    // nav栏跳转
    goNav (path) {
      this.$router.push({ path: path })
    },
    // 城市列表跳转
    goCityList () {
      this.$router.push({path: '/pages/city-list/main', query: {city: this.address}})
    },
    // 楼盘列表跳转
    goHousesSearch () {
      this.$router.push({path: '/pages/houses-search/main'})
    },
    async  fetchIndexData (city) {
      const data = await postIndex({city})
      console.log(data)
      this.bannerList = data.ads
      this.houses = data.houses.map(item => ({...item, tags: item.tags.split('|')}))
    }
  },
  watch: {
    address (val) {
      this.fetchIndexData(this.address)
    }
  },
  async created () {
    const city = await this._getUserAddress()
    this.address = city
    this.globalData.address = city
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(6567)
  }
}
</script>

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
      .adr-selected
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000;
      .adr-select
        font-size: 12px;
        color: #636363;  
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
</style>
