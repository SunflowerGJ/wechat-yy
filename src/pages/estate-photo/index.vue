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
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <!-- <txv-video
            v-if="videoVid && current === index && active === '视频'"
            :usePoster="true" 
            :poster="videoPhoto" 
            class="slide-image"  
            id="video" 
            playerid="txv1" 
            :vid="videoVid" 
            objectFit="cover" 
            :show-fullscreen-btn="true" 
            :autoplay="false" 
            :width="'100%'" 
            :height="'100%'"
            @play="onVideoPlay"
            @ended="onVideoEnd"></txv-video> -->
                           <!-- src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" -->
            <video object-fit="cover" class="slide-image" v-if="current === index  && active == '视频'" :controls="true" :poster="item.video_photo" @play="switchS(false)" @pause="switchS(true)" @ended="switchS(true)" :src="item.video_url"></video>
            <!-- <image v-if="item.video_photo && active == '视频'" :src="item.video_photo" class="slide-image"/> -->
            <image v-else @click="handlePreviewImage()" :src="item.photo" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <p class="showNum"><span>{{current + 1}}/{{imgUrls.length}}</span></p>
  </div>
</template>

<script>
/* eslint-disable */
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
      imgUrls: [],
      videoVid: '',
      videoPhoto: ''

    }
  },

  methods: {
    switchS (e = true) {
      this.$data.isSwDOtr = e
      if(e == false) {
        POINTAlbums({
          cityId: this.$route.query.city_name,
          houseId: this.$route.query.id,
          type: 7
        })
      }
    },
    getIndex (e) {
      this.active = e
      this.current = 0
      const tyepMap = {
        样板间: 1,
        实景图: 2,
        效果图: 3,
        周边配套: 4,
        户型图: 5,
        规划图: 6,
        视频: 7
      }
      POINTAlbums({
        cityId: this.$route.query.city_name,
        houseId: this.$route.query.id,
        type: tyepMap[e]
      })
    },
    switchItem (e) {
      this.current = e.mp.detail.current
      if (this.active === '视频') {
        this.videoVid = this.imgUrls[this.current].video_url
        this.videoPhoto = this.imgUrls[this.current].video_photo
      }
      if (this.videoContext) {
        this.videoContext.pause()
      }
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
      this.imgUrls = this.imgMap[this.active]
      if (this.active === '视频') {
        this.videoVid = this.imgUrls[this.current].video_url
        this.videoPhoto = this.imgUrls[this.current].video_photo
      }
    },
    handlePreviewImage (item) {
      const photos = this.imgUrls.map(item => item.photo)
      wx.previewImage({
        current: photos[0],
        urls: photos
      })
    },
    initData () {
      this.current = Number(this.$route.query.current)
      this.imgUrls = []
      this.itemTitle = []
    },
  },

  watch: {
    'active': {
      handler (value) {
        this.imgUrls = this.imgMap[value]
      // this.current =  Number(this.$route.query.current) || 0
        this.current =  0
        console.log(this.current)
      },
      deep: true
    }
  },

  async onLoad () {
    this.initData()
    this._postAlbums()
  },
  onShow () {
    this.initData()
    this._postAlbums()

      this.$data.isSwDOtr = true
  },
  onHide: function () {

      this.$data.isSwDOtr = true
  }, 
  onUnload: function () {
      this.$data.isSwDOtr = true
  },
}
</script>
<style>
  .swDots{
  position:absolute;
  right:0;
  bottom:15px;
  width:80%;
  z-index:100;
}
.swCurr{
   position:absolute;
  bottom:15px;
  z-index:100;
  right:10px;
}
.swCurr span{
  font-size: 12px;
  color: #2E2E2E;
  display: inline-block;
  border-radius:10px;
  padding:5px 10px;
  background:rgba(255,255,255,0.7);
}
.swDots ul{
    display:inline-block;
    margin :0 23%;
    border-radius:10px; 
    background:rgba(255,255,255,0.7);
    border-radius:9px;
    }
.swDots ul li{
  display: inline-block;
  padding:5px 10px;
  border-radius:10px; 
  font-size: 12px;
  color: #2E2E2E;
}
.swDots ul li.activeSW{
  color: #fff;
  background-color: #E60113;
}
#myVideo{
  width:100% !important;
  height:200px !important;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .slide-image {
    width 100%;
  }
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
