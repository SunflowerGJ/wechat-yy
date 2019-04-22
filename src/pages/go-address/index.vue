<template>
  <div class="container" v-bind:style="{ width: mapStyle.width, height: mapStyle.height }">
  </div>
</template>

<script>
var QQMapWX = require('qqmap-wx-jssdk')
export default {

  data () {
    return {
      mapStyle: {
        width: '100%',
        height: '400px'
      },
      detail: {}
    }
  },
  methods: {
    _init () {
      // 实例化API核心类
      this.qqmapsdk = new QQMapWX({
        key: 'NBMBZ-7E6C4-ERMUP-XGJTV-WFLDQ-S3FDK'
      })
      // 获取跳转过来的详情
      this.detail = this.$route.query
    },
    async getInnerHeight () {
      const res = await this.$wx.getSystemInfo()
      this.mapStyle = { ...this.mapStyle, height: `${res.windowHeight}px` }
    },
    goAddress () {
      const { query: { latitude, longitude, name, address } } = this.$route
      wx.openLocation({
        latitude: +latitude,
        longitude: +longitude,
        name,
        address,
        scale: 18
      })
    }
  },
  async mounted () {
    this._init()
    this.getInnerHeight()
    this.goAddress()
  },
  watch: {}

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container {
  width 100%;
}

</style>
