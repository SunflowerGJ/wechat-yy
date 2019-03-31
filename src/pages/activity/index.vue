<template>
  <div class="container">

    <div class="info-section">
      <div class="info-section__title">
        <h3>集团资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x='true'
          style="white-space: nowrap; display: flex;"
          @scrolltolower="scrolltolower">
          <view class="info-section__item" v-for="(item,index) in list" :key="index">
            <img class="info-section__item-img" :src="item.url" alt="">
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>

    <div class="info-section">
      <div class="info-section__title">
        <h3>城市资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x='true'
          style="white-space: nowrap; display: flex;"
          @scrolltolower="scrolltolower">
          <view class="info-section__item" v-for="(item,index) in list" :key="index">
            <img class="info-section__item-img" :src="item.url" alt="">
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>

     <div class="info-section">
      <div class="info-section__title">
        <h3>项目资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x='true'
          style="white-space: nowrap; display: flex;"
          @scrolltolower="scrolltolower">
          <view class="info-section__item" v-for="(item,index) in list" :key="index">
            <img class="info-section__item-img" :src="item.url" alt="">
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>   
  </div>
</template>

<script>

export default {

  data () {
    return {
      list: [
        {
          url: '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '远洋2019公益跑北京站迎春而来'
        },
        {
          url: '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '崭新时代 迎春而来|远洋地产杨帆定新区，之梦未来'
        },
        {
          url: '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '远洋2019公益跑北京站'
        }
      ]
    }
  },

  methods: {
    scrolltolower (e) {
      console.log(e)
      console.log('加载数据')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    .info-section
      margin-bottom 10px
      height 230px
      background-color #fff
      .info-section__title
        height 50px
        line-height 50px
        padding-left 20px
        h3
          font-family: PingFangSC-Medium
          font-size: 18px
          color: #3F3B3A
      .info-section__main
        height 160px
        padding 0 20px
        box-sizing border-box
        .info-section__item
          width 160px
          overflow hidden
          display: inline-block
          margin-left 15px
          vertical-align text-top
          &:first-child
            margin-left 0
          .info-section__item-img
            display block
            width 100%
            height 120px
            border-radius 4px
            overflow hidden
          .info-section__item-title
            font-family: PingFangSC-Medium
            font-size: 14px
            color: #505757
            line-height 1.2
            margin-top 5px
            white-space: pre-line;
            no-wrap-more(2)

</style>
