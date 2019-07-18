<template>
  <div class="yy-tips">
    <p class="yy-tips__item" @click="goIndex">返回首页</p>
  </div>
</template>

<script>

export default {

  methods: {
    goIndex () {
      const url = '/pages/index/main'
      wx.switchTab({url})
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../stylus/mixin.styl"
  .yy-tips
    position fixed
    top 20px
    right 20px
    z-index 2019
    .yy-tips__item
      border-radius 30px
      padding 8px 12px
      background rgba(0,0,0,.5)
      font-size 14px
      text-align center
      color #fff

</style>
