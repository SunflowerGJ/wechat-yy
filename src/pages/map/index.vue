<template>
  <div class="map" v-bind:style="{ width: mapStyle.width, height: mapStyle.height }">
    <map id="myMap"
      :markers="markers"
      @markertap='handleMarkerTap'
      @callouttap='handleMarkerTap'
      style="width: 100%; height: 100%"
      :longitude="logLat.longitude"
      :latitude="logLat.latitude" scale='15'>
    </map>
  </div>
</template>

<script>
import {postHousesList} from '../../http/api.js'
export default {

  data () {
    return {
      qqmapsdk: null,
      mapStyle: {
        width: '100%',
        height: '400px'
      },
      markers: [],
      logLat: {
        longitude: '116.231281',
        latitude: '40.220771'
      },
      controls: [{
        id: 1,
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
    async getInnerHeight () {
      const res = await this.$wx.getSystemInfo()
      this.mapStyle = { ...this.mapStyle, height: `${res.windowHeight}px` }
    },
    handleMarkerTap (e) {
      this.$router.push({
        path: '/pages/home-page/main',
        query: {id: e.mp.markerId}
      })
    },
    async getMarker () {
      let datas = await postHousesList({
        city: '北京'
      })
      this.markers = datas.map((data, key) => {
        data.callout = {
          content: data.name,
          color: '#fff',
          fontSize: 12,
          borderRadius: 10,
          bgColor: '#FF0000',
          padding: 10,
          display: 'ALWAYS',
          borderWidth: 1,
          borderColor: '#FF0000'
        }
        this.logLat = {
          longitude: data.longitude,
          latitude: data.latitude
        }
        return data
      })
    }
  },
  async mounted () {
    this.getInnerHeight()
    this.getMarker()
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.map {
  width 100%;
}
</style>
