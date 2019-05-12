<template>
  <div class="container" v-bind:style="{ width: mapStyle.width, height: mapStyle.height }">
    <div style="width: 100%; height: 50%">
      <map
        :markers="markers"
        @markertap='handleMarkerTap'
        @callouttap='handleMarkerTap'
        style="width: 100%; height: 100%"
        :longitude="detail.longitude"
        :latitude="detail.latitude" scale='15'>
        <cover-view class="goPath" @tap="handleGoAddress">
            去这里
        </cover-view>
      </map>
    </div>
    <div class="banner" id="banner">
      <div class="title">{{detail.name}}</div>
      <div class="des">{{detail.address}}</div>
      <div class="tabs">
        <div class="tab"><span :class="[{'checked': tabCheck === '交通'}]" @click="handleChangeTab('交通')">交通({{searchMap['交通']}})</span></div>
        <div class="tab"><span :class="[{'checked': tabCheck === '教育'}]" @click="handleChangeTab('教育')">教育({{searchMap['教育']}})</span></div>
        <div class="tab"><span :class="[{'checked': tabCheck === '医疗'}]" @click="handleChangeTab('医疗')">医疗({{searchMap['医疗']}})</span></div>
        <div class="tab"><span :class="[{'checked': tabCheck === '银行网点'}]" @click="handleChangeTab('银行')">银行({{searchMap['银行']}})</span></div>
        <div class="tab"><span :class="[{'checked': tabCheck === '餐饮'}]" @click="handleChangeTab('餐饮')">餐饮({{searchMap['餐饮']}})</span></div>
      </div>
    </div>
    <div class="content" v-bind:style="{ height: scrollH }">
      <div class="scroll">
        <div @click="checkMarkerId = marker.id" :class="['items', {'checkedMarker': checkMarkerId === marker.id}]" :key="marker.id" v-for="(marker, key) in markers">
          <div class="item">
            <div class="icon">{{key + 1}}</div>
            <div class="text">{{marker.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var QQMapWX = require('qqmap-wx-jssdk')
export default {

  data () {
    return {
      tabCheck: '交通',
      qqmapsdk: null,
      mapStyle: {
        width: '100%',
        height: '400px'
      },
      markers: [],
      scrollH: 0,
      checkMarkerId: 0,
      detail: {},
      local: {},
      searchMap: {
        '交通': 0,
        '教育': 0,
        '医疗': 0,
        '银行': 0,
        '餐饮': 0
        // '公交': 0
      }
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
      this.local = this.$route.query
      this.searchMap = {
        '交通': this.detail.交通,
        '教育': this.detail.教育,
        '医疗': this.detail.医疗,
        '银行': this.detail.银行,
        '餐饮': this.detail.餐饮
      }
    },
    handleSearch () {
      const _that = this
      this.qqmapsdk.search({
        keyword: this.tabCheck, // 搜索关键词
        location: `${this.detail.latitude},${this.detail.longitude}`, // 设置周边搜索中心点
        auto_extend: '0',
        success: (res) => { // 搜索成功后的回调
          _that.searchMap[_that.tabCheck] = res.count
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: '/static/images/icon-c.png', // 图标路径
              width: 20,
              height: 20
            })
          }
          this.getMarker(mks)
        }
      })
    },
    handleChangeTab (type) {
      this.tabCheck = type
      this.handleSearch()
    },
    async getInnerHeight () {
      const res = await this.$wx.getSystemInfo()
      this.mapStyle = { ...this.mapStyle, height: `${res.windowHeight}px` }
    },
    handleMarkerTap (e) {
      this.checkMarkerId = e.mp.markerId
    },
    handleGoAddress () {
      this.$router.push({
        path: '/pages/go-address/main',
        query: this.local
      })
    },
    getMarker (markers) {
      this.markers = markers
    },
    async getScrollContainer () {
      wx.createSelectorQuery().select('#banner').boundingClientRect((rect) => {
        const containerH = parseInt(this.mapStyle.height) / 2
        const bannerH = rect.height
        this.scrollH = `${containerH - bannerH - 10}px`
      }).exec()
    }
  },
  async mounted () {
    this._init()
    this.getInnerHeight()
    this.getScrollContainer()
    this.handleSearch()
  },
  watch: {
    'checkMarkerId': {
      handler (value) {
        let cloneMarkers = JSON.parse(JSON.stringify(this.markers))
        this.markers = cloneMarkers.map((item) => {
          if (item.id === value) {
            this.local = item
            item.iconPath = '/static/images/icon.png'
          } else {
            item.iconPath = '/static/images/icon-c.png'
          }
          return item
        })
      }
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container {
  width 100%;
}
.banner {
  padding 20px
  background-color #fff
  position relative
}
.title {
  font-size 20px
}
.des {
  font-size 12px
  color #959595
  padding 10px 0
}
.tabs {
  display flex
  font-size 14px
}
.tab {
  flex 1
}
.items {
  padding 0 10px
  color #959595
}
.item {
  display flex
  padding 20px 0
  font-size 13px
  border-bottom 1px solid #D8D8D8
}
.checkedMarker {
  background-color red
  color #fff
}
.content {
  margin-top 10px
  background-color #fff
  overflow-y auto
}
.text {
  padding-left 10px
}
.checked {
  color red
  padding-bottom 5px
  border-bottom 2px solid red
}
.goPath {
  width 50px
  height 50px
  border-radius 50%
  line-height 50px
  color #fff
  font-size 12px
  text-align center
  position absolute
  right 20px
  bottom 20px
  background-color rgb(233, 104, 107)
  box-shadow: 0 0 10px rgb(233, 104, 107)
}

</style>
