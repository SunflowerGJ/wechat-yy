<template>
  <div class="map" v-bind:style="{ width: mapStyle.width, height: mapStyle.height }">
    <map id="myMap"
      :markers="markers"
      style="width: 100%; height: 100%"
      longitude="113.324520"
      latitude="23.099994" scale='15'>
    </map>
  </div>
</template>

<script>
import {postIndex} from '@/http/api.js'
var QQMapWX = require('qqmap-wx-jssdk')
export default {

  data () {
    return {
      qqmapsdk: null,
      mapStyle: {
        width: '100%',
        height: '400px'
      },
      markers: []
    }
  },
  methods: {
    _initMap () {
      // 实例化API核心类
      this.qqmapsdk = new QQMapWX({
        key: 'NBMBZ-7E6C4-ERMUP-XGJTV-WFLDQ-S3FDK'
      })
    },
    async getInnerHeight () {
      const res = await this.$wx.getSystemInfo()
      this.mapStyle = { ...this.mapStyle, height: `${res.windowHeight}px` }
    },
    getMarker () {
      this.markers = [{
        id: 0,
        latitude: 23.099994,
        longitude: 113.354520,
        width: 50,
        height: 50
      }, {
        id: 1,
        latitude: 23.069894,
        longitude: 113.324520,
        width: 50,
        height: 50
      }, {
        id: 2,
        latitude: 23.079794,
        longitude: 113.324520,
        width: 50,
        height: 50
      }, {
        id: 3,
        latitude: 23.089694,
        longitude: 113.324520,
        width: 50,
        height: 50
      }]
    }
  },
  async mounted () {
    this._initMap()
    this.getInnerHeight()
    this.getMarker()
    const res = await postIndex({city: '北京'})
    console.log(111, res)
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.map {
  width 100%;
}
</style>
