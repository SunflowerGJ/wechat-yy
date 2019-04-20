<template>
  <div class="container">
    <div class="watch_panl">
      <div class="letf_panl">
        <img :src="itemimg">
        <span>掠视</span>
      </div>
      <div class="rigth_panl">
          <span>刚刚</span>
      </div>
    </div>
     <div class="watch_panl">
      <div class="letf_panl">
        <img :src="itemimg">
        <span>掠视</span>
      </div>
      <div class="rigth_panl">
          <span>45分钟前</span>
      </div>
    </div>
     <div class="watch_panl">
      <div class="letf_panl">
        <img :src="itemimg">
        <span>掠视</span>
      </div>
      <div class="rigth_panl">
          <span>今日 13:17</span>
      </div>
    </div>
     <div class="watch_panl">
      <div class="letf_panl">
        <img :src="itemimg">
        <span>掠视</span>
      </div>
      <div class="rigth_panl">
          <span>今日 11:17</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      itemimg: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
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
    margin-top 10px
    .watch_panl
      background-color #ffffff
      border-bottom 1px solid #d8d8d8
      padding 10px 20px    
      display flex
      justify-content space-between
      align-items center
      .letf_panl
        display flex
        align-items center
        img
          width 60px
          height 60px
          margin-right 18px
          border-radius 100% 
        span
          font-size 14px
          color #595757
      .rigth_panl
        span 
          font-size 14px
          color #9FA0A0
          text-align right
</style>
