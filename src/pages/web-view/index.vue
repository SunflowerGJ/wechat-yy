<template>
  <div class="container" v-if="src">
    <web-view :src="src"></web-view>
  </div>
</template>

<script>

export default {
  // 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: this.$route.query.title,
      path: 'pages/web-view/main?id=' + decodeURIComponent(this.$route.query.src) + '&title=' + this.$route.query.title
    }
  },
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    this.src = this.$route.query.src ? decodeURIComponent(this.$route.query.src) : ''
    wx.setNavigationBarTitle({
      title: this.$route.query.title || ''
    })
  },

  methods: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
  
</style>
