<template>
  <div class="container">
    <div class="photo_titel">
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
            <div class="swiper-item scroll_item" v-for="(item,index) in itemTitle" :key="index" @click="getIndex(index)">
              <p class="deta_panl" :class="index === active ? 'active': '' " >{{item}}</p>
            </div>
          </scroll-view>
    </div>
    <div class="swiper_box">
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :current="current"
        class="swiper"
        @change="switchItem($event)"
        style="height:240px"
      >
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image  :src="item" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <p class="showNum"><span>{{current+1}}/{{imgUrls.length}}</span></p>
  </div>
</template>

<script>

export default {

  data () {
    return {
      itemTitle: [
        '效果图（4）',
        '样板间（5）',
        '周边配套（6）',
        '户型图（1）',
        '效果图（4）'
      ],
      autoplay: false,
      indicatorDots: false,
      current: 1, // 默认第n个
      active: 0,
      Total: null, // 总数
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    }
  },

  methods: {
    scrolltolower (e) {
      console.log(e)
      console.log('加载数据')
    },
    getIndex (e) {
      console.log(e)
      this.active = e
    },
    switchItem (e) {
      console.log(e)
      this.current = e.mp.detail.current
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    .photo_titel
      background-color #ffffff
      box-sizing border-box
      .scroll-view_H
        box-sizing border-box
        display flex
        white-space nowrap
        padding 10px 0 10px 20px
        .scroll_item
          display inline-block
          .deta_panl
            font-size 14px
            color #9FA0A0
            margin-right 10px
          p.active
            color #E60114
    .showNum
      text-align center
      margin-top 15px
      span 
        background #D8D8D8
        border-radius 3px
        font-size 14px
        color #3F3B3A
        padding 4px 6px
    .swiper 
      width 100%
       height 240px !important
    .swiper_box
      margin-top 100px
      image
        width 100%
        height 100%
</style>
