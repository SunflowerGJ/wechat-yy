<template>
  <div class="map" v-bind:style="{ width: mapStyle.width, height: mapStyle.height }">
    <map id="myMap"
      :markers="markers"
      @markertap='handleMarkerTap'
      @callouttap='handleMarkerTap'
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
      markers: [],
      controls: [{
        id: 1,
        iconPath: '/resources/location.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  },
  methods: {
    _initMap () {
      // 实例化API核心类
      this.qqmapsdk = new QQMapWX({
        key: 'NBMBZ-7E6C4-ERMUP-XGJTV-WFLDQ-S3FDK'
      })
    },
    handleCoverClick () {
      console.log(1)
    },
    async getInnerHeight () {
      const res = await this.$wx.getSystemInfo()
      this.mapStyle = { ...this.mapStyle, height: `${res.windowHeight}px` }
    },
    handleMarkerTap (e) {
      console.log('e.mp', e.mp)
      console.log(e.mp.markerId)
    },
    getMarker () {
      this.markers = [{
        id: 5,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50,
        callout: {
          content: '深圳市久荣物流有限公司',
          color: '#fff',
          fontSize: 12,
          borderRadius: 10,
          bgColor: '#FF0000',
          padding: 10,
          display: 'ALWAYS',
          borderWidth: 1,
          borderColor: '#FF0000'
        }
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
