<template>
  <div class="container"> 
    <div class="header">
      <div class="adr">
        <span class="adr-selected">{{address}}</span>
        <span class="adr-select" @click='goCityList'>选择地址></span>
      </div>
      <div class="search" @click="goHousesSearch"><i></i><input disabled placeholder="搜索意向楼盘"/></div>
    </div>
    <div class="swipe-banner">
      <swiper
        class="swipe-banner__wrap"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000">
        <block v-for="(item,index) in bannerList" :index="index" :key="index">
            <swiper-item @click="goBanner(item.url)" >
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
      <div class="main_item" v-for="(item,index) in houses" :key="index">
        <div class="item-header">
          <h3>{{item.name}}</h3>
          <span class="price-wrap">
            <i class="price">{{item.price}}</i>元/m²
          </span>
        </div>
        <div class="item-addr">
          地址：{{item.address}}
        </div>
        <div class="item-main">
          <div class='item-main_tag'>
            <i></i>
            <div class='lawyerType-bgImg'></div>
            <span>{{item.sales_status}}</span>
          </div>
          <img class="item-mian__banner" :src="item.photo" alt="">
        </div>
        <div class="item-tags">
          <span class="item-tags__item" v-for="(tag,tIndex) in item.tags" :key="tIndex"> {{tag}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {postIndex} from '../../http/api.js'
var amapFile = require('../../../static/libs/amap-wx.js')
var config = require('../../../static/libs/config.js')
export default {
  data () {
    return {
      serValue: '',
      bannerList: [],
      houses: [],
      navList: [
        {
          icon: '/static/images/index-nav-map.png',
          text: '地图找房',
          path: 'pages/activity/main'
        },
        {
          icon: '/static/images/index-nav-search.png',
          text: '条件筛选',
          path: '/pages/activity/main'
        }
      ],
      address: '北京'
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
          // 成功回调
            let addressComponent = data[0].regeocodeData.addressComponent
            let location = addressComponent.city.length === 0
              ? addressComponent.province
              : addressComponent.city[0]
            resolve(location)
          },
          fail: function (info) {
          // 失败回调
            reject('北京') // eslint-disable-line
          }
        })
      })
    },
    // 广告跳转
    goBanner (path) {
      this.$router.push({ path: path })
    },
    // nav栏跳转
    goNav (path) {
      this.$router.push({ path: path, isTab: true })
    },
    // 城市列表跳转
    goCityList () {
      this.$router.push({path: '/pages/city-list/main'})
    },
    // 楼盘列表跳转
    goHousesSearch () {
      this.$router.push({path: '/pages/houses-search/main'})
    }
  },
  async created () {
    const city = await this._getUserAddress()
    this.address = city
    const {data: {data, code}} = await postIndex({city})
    if (code === 10000) {
      console.log(data)
      this.bannerList = data.ads
      this.houses = data.houses.map(item => ({...item, tags: item.tags.split('|')}))
    }
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
    i 
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
    .main_item
      background-color #fff
      margin-bottom 5px 
      box-sizing border-box
      padding 15px 20px  
      .item-header
        height 25px
        line-height 25px 
        display flex
        justify-content: space-between
        h3 
          font-family: PingFangSC-Semibold
          font-size: 18px
          color: #3F3B3A
        .price-wrap
          display flex
          align-items center
          justify-content center
        .price
          color #E60113 
      .item-addr
        font-family: PingFangSC-Regular
        font-size: 12px
        line-height 16px
        color: #9FA0A0 
        no-wrap()
      .item-main
        margin 3px 0
        width 335px
        height 160px
        border-radius 3px
        overflow hidden
        position relative
        .item-mian__banner
          display block
          width 100%
          height 100%
        .item-main_tag
          height 20px
          display: inline-block;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 1;
          padding-left 5px;
          span 
            font-size: 12px;
            color: #fff;
            float: left;
            line-height: 20px;
          .lawyerType-bgImg
            width: 100%;  
            height: 100%;  
            position: absolute;
            right: 0;
            top: 0;
            z-index: -1;
            background: #E60113
          i 
            position: absolute;
            right: -20px;
            top: 0;
            width: 0; 
            height: 0;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent transparent #E60113 ;  
      .item-tags
        display flex
        flex-wrap: wrap
        justify-content: flex-start
        .item-tags__item
          margin-top 5px
          margin-right 4px
          border 1rpx solid #E60113
          border-radius 2px
          font-size 10px
          color #E60113
          display flex
          align-items center
          justify-content center
          min-width 75px
          box-sizing border-box
          padding 2px 3px 2px 12px
          background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAuZJREFUSA2dVktrFEEQrp7d7MwmEfNYdjdG0fgAPQUEFcxBBUkO8SASDwqC3r0IingSf4Q3LyIYJCDm4kERBS9BA+rJS5CQYDbPkcQkO5tkpu2vku7M7MxuYgp6u+qrr6q7+jUrSMmUaJfoU1D2P39K6WNdm6hU4i+4UmiKIFGywO0I5kmS7GADAMTQYBQWxmim/ThUMiyEWa0tHA6HKIncFPLACIuYsnIvScobYdB2nENmjNTRI+T/Gjd+HsO+0kf5sVEqLE8QCCyYfFD2UAzL6tCw5ILwM3fmssYZBGbGMMm3lMRZVZPCtlVdApyFxXFegPTJE2Eu62bo4voMiVQqRtBAycqxapZ2uqFApXRe+00vV8ukyQBNAIzmR/fQkT87T+71OyTX1omyDmP6RyxkOw9WPG9SAzv0LgeseZUvSRsbCRZi8EAwf9MUHXHWMlRQpAbNw4Eze65B9OoUxQKw9jiIuW+fwlSjm4BU12Fqun+X2r9+YKe1r5lwR+z+XkOGYmrAEa8l0vcJ+wQxI5SHhhP5slIxZBDMCDCKy5MkGrNQjfDuB4GxzQhApOcZh1YaTndrlftIgFCrg+PgDtwmf26zpszFnkhAZEoRT4Kh3w43wZcIZRz7rD58PxSjLZG1d9BV70l3zRdo73m3I7nkHW/BFr/t/Wsqbsxyg74biT3BtYJaBp9R5sJ5EpbFDTqw3Uhsl1vfvqJMzznCCRXqtbCamurmCVZWSJY9ErZN6yOj5PYNRPjpiKUMf/I3iYY04bLtRngCahI45BvjE7GQWAXMEIJa37wgu/cSzywWFQJQaeXdR/pz9Rbek5BnU00eQPmEmlV++qdaosZYUBgIVlZptniKpFqqJIlczTDBudZPFLr08GG2aBFRHOZGwG2j5gCVzyO8PMHiEi0+eEwl9X5NZzu5QV96+ISCpb8kHIfWRr9vZ6zS/vvbWRVf38RHAZ8S/EUgZeDm1Y/Y2cs5VC7kRO5/7iMtye51JCIAAAAASUVORK5CYII=') no-repeat 3px center
          background-size 10px 10px
     


            

  


</style>
