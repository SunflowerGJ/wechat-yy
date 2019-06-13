<template>
  <div class="container">
    <div class="photo_titel">
      <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
            <div class="swiper-item scroll_item" v-for="item in itemTitle" :key="item" @tap="getIndex(item)">
              <p class="deta_panl" :class="item === active ? 'active': '' " >{{item}}({{imgMap[item].length}})</p>
            </div>
          </scroll-view>
    </div>
    <div class="swiper_box">
      <swiper
        :circular='true'
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :current="current"
        class="swiper"
        @change="switchItem($event)"
        style="height:240px"
      >
        <div v-for="(item,index) in imgUrls" :key="index" @click="handlePreviewImage">
          <swiper-item>
            <image :src="item.photo" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <p class="showNum"><span>{{current + 1}}/{{imgUrls.length}}</span></p>
  </div>
</template>

<script>
import { postAlbums, POINTAlbums } from '../../http/api.js'
export default {

  data () {
    return {
      itemTitle: [],
      autoplay: false,
      indicatorDots: false,
      current: 0, // 默认第n个
      active: '',
      imgMap: {},
      imgUrls: []
    }
  },

  methods: {
    getIndex (e) {
      this.active = e
      const tyepMap = {
        样板间: 1,
        实景图: 2,
        效果图: 3,
        周边配套: 4,
        户型图: 5,
        规划图: 6
      }
      POINTAlbums({
        cityId: this.$route.query.city_name,
        houseId: this.$route.query.id,
        type: tyepMap[e]
      })
    },
    switchItem (e) {
      this.current = e.mp.detail.current
    },
    async _postAlbums () {
      const datas = await postAlbums({
        house_id: this.$route.query.id
      })
      let map = {}
      let itemTitle = []
      Object.values(datas).map(data => {
        map[data.name] = data.photos
        itemTitle.push(data.name)
      })
      this.itemTitle = itemTitle
      this.active = this.$route.query.tabName
      this.imgMap = map
    },
    handlePreviewImage () {
      const photos = this.imgUrls.map(item => item.photo)
      wx.previewImage({
        current: photos[0],
        urls: photos
      })
    }
  },

  watch: {
    'active': {
      handler (value) {
        this.imgUrls = this.imgMap[value]
        this.current = 0
      },
      deep: true
    }
  },

  async mounted () {
    this._postAlbums()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background rgba(0,0,0,0.5)
    position absolute
    top 0px
    left 0
    width 100%
    height 100%
    .photo_titel
      background-color #ffffff
      box-sizing border-box
      .scroll-view_H
        box-sizing border-box
        display flex
        white-space nowrap
        padding 0px 0 0px 20px
        .scroll_item
          display inline-block
          padding 20px 0
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
