<template>
  <div class="container"> 
    <div class="header"></div>
    <div class="swipe-banner">
      <swiper 
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
          icon: '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          text: '地图找房',
          path: 'pages/activity/main'
        },
        {
          icon: '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
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
    height 60px
    background-color red
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
    justify-content: space-between;
    .nav__item
      width 160px
      height 90px
      background-color #fff
      text-align: center;
      .nav_img 
        width: 60px;
        height: 60px;
        display: block;
        margin: auto;
      .nav_text 
        font-size: 14px;
        color: #121111;
  .main
    background-color #fff
    .main_item
      margin-bottom 5px  
      height 280px    


            

  


</style>
