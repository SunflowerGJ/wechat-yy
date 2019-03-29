<template>
  <div class="container"> 
    <div class="header">
      <div class="adr">
        <span class="adr-selected">北京</span>
        <span class="adr-select">选择地址></span>
      </div>
      <div class="search"><i></i><input placeholder="搜索意向楼盘"/></div>
    </div>
    <div class="swipe-banner">
      <swiper
        @click="handleUtils()" 
        class="swipe-banner__wrap"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000">
        <block v-for="image in bannerList" :index="image" :key="image">
            <swiper-item>
                <image :src="image" class="swipe-banner__item" mode="aspectFill"/>
            </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="nav">
      <div class="nav__item" @click="bindViewTap(item.path)" v-for="item in navList" :index="item" :key="item">
        <image :src="item.icon" class="nav_img"/>
        <p class="nav_text">{{item.text}}</p>
      </div>
    </div>
    <div class="main">
      <div class="main_item">
        <div class="item-header">
          <h3>远洋五里春秋二期</h3>
          <span class="price-wrap">
            <i class="price">95000</i>元/m²
          </span>
        </div>
        <div class="item-addr">
          地址：北京市石景山八大处公园西南800米超出隐藏吗超出隐藏吗
        </div>
        <div class="item-main">
          <img class="item-mian__banner" src="//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72" alt="">
        </div>
        <div class="item-tags">
          <span class="item-tags__item"> 紧邻八大处公园地铁站</span>
          <span class="item-tags__item">紧邻八大</span>
          <span class="item-tags__item">紧邻八大搜索</span>
          <span class="item-tags__item">紧邻八大</span>
          <span class="item-tags__item">紧邻八大</span>
          <span class="item-tags__item">紧邻八大搜索</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      serValue: '',
      bannerList: [
        '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
        '//m.360buyimg.com/mobilecms/s1125x690_jfs/t1/6096/40/2438/107321/5bd12167E279de2f0/84f8485900f114df.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      ],
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
      ]
    }
  },

  methods: {
    bindViewTap (path) {
      this.$router.push({ path: path, isTab: true })
    },
    handleUtils () {
      const path = '/pages/calculator/main'
      console.log('path', path)
      this.$router.push({ path: path })
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
    }
  },

  async created () {
    // console.log(wx)
    // const res = await this.$wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗'
    // })
    // console.log(res)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(6567)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    background-color #fff
    .main_item
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
        .item-mian__banner
          display block
          width 100%
          height 100%
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
          min-width 80px
          box-sizing border-box
          padding 2px 3px 2px 12px



          
           
        

           


            

  


</style>
