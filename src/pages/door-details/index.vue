<template>
  <div class="container" v-if="detail">
    <div class="panl_swiper">
      <!-- <img :src="detail.photo" @click="handleGoPhoto('样板间')"/> -->
      <swiper
        :circular='true'
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        class="swiper">
        <div v-for="(item,index)  in detail.photo" :key="index" @click="handlePreviewImage(detail.photo)">
          <swiper-item>
            <div class="swiper-item"><image mode="aspectFit" :src="item" class="slide-image"/></div>
          </swiper-item>
        </div>
      </swiper>
      <div class="tranTrian" v-if="detail.id_sale==='1'">
        <img src="/static/images/icon-door-tag.png" alt="">
          <span class="tranTitle">在售</span>
      </div>
    </div>
    <div class="door_panl">
      <div class="dor_box">
        <img src="/static/images/storey.png">
        <label>{{detail.name}}</label>
        <span>建面{{detail.floor_space}}m²</span>
      </div>
    </div>
    <div class="price_panl">
      <div class="price_name">
        <p>约<span>{{detail.total_price}}万元</span>/套</p>
        <p>参考总价</p>
      </div>
      <div class="price_name">
        <p>{{detail.unit_price}}元/m²</p>
        <p>参考均价</p>
      </div>
      <div class="price_name">
        <p>{{detail.orientation}}</p>
        <p>户型朝向</p>
      </div>

    </div>
    <div class="onlookers_panl">
        <div class="looks_panl">
          <span v-for="(item,index) in detail.tags" :key="index">{{item}}</span>
        </div>
        <div class="copent_panl" @click="goCalculator">
            <img src="/static/images/cpument.png">
            <span>房贷计算器</span>
        </div>
    </div>
    <div class="estate_news_panl">
        <div class="estate_title">
          <span>户型优势</span>
        </div>
        <div class="estate_intro">
          <rich-text class="rich-text" :nodes="detail.intro"></rich-text>
        </div>
        <!-- <ul class="advanTage">
          <li>
            <img src="/static/images/icon-tag.png">
            <span>客厅和餐厅贯穿南北</span>
          </li>
           <li>
            <img src="/static/images/icon-tag.png">
            <span>室内视野更加开阔</span>
          </li>
           <li>
            <img src="/static/images/icon-tag.png">
            <span>开窗时可在房屋中间形成穿堂风</span>
          </li>
           <li>
            <img src="/static/images/icon-tag.png">
            <span>冬暖夏凉</span>
          </li>
        </ul> -->
    </div>
    <div class="match_panl">
      <div class="title_marig">
        <div class="titles_panl">
          <span>楼座分布</span>
        </div>
      </div>
      <div class="door_about">
        <p>{{detail.house_branch}}</p>
      </div>
      <div class="map_img">
        <img :src="detail.house_branch_photo">
      </div>
    </div>
      <house-footer :detail='detail'  @addCID='addCID' type='2'/>
  </div>
</template>

<script>
import {postHouseTypeDetail} from '../../http/api.js'
import houseFooter from '../../components/house-footer'
import getQueryString from '../../utils/getQueryString.js'
export default {
  onShareAppMessage: function (res) {
    return {
      title: '远洋置业欢迎您',
      path: 'pages/door-details/main?id=' + this.housetype_id
    }
  },

  components: {
    houseFooter
  },
  data () {
    return {
      detail: null,
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      housetype_id: ''
    }
  },
  onLoad: function (options) {
    if (options.q || options.scene) {
      const parmas = options.q || options.scene
      // 获取二维码的携带的链接信息
      let qrUrl = decodeURIComponent(parmas)
      this.house_id = getQueryString(qrUrl, 'id')
    }
  },
  async mounted () {
    if (this.$route.query.id) {
      this.housetype_id = this.$route.query.id
    }
    const data = await postHouseTypeDetail({
      housetype_id: this.housetype_id,
      token: this.globalData.token
    })
    this.detail = data
    this.detail.tags = data.tags ? data.tags.split('|') : []
    // this.detail.intro = data.intro.split('|')
    this.detail.intro = data.intro
    this.$wx.setNavigationBarTitle({
      title: data.name
    })
  },
  methods: {
    handlePreviewImage (photos) {
      wx.previewImage({
        current: photos[0],
        urls: photos
      })
    },
    handleGoPhoto (name) {
      this.$router.push({path: '/pages/estate-photo/main', query: {...this.detail, tabName: name}})
    },
    // 跳转计算器
    goCalculator () {
      this.$router.push({path: '/pages/calculator/main'})
    },
    addCID (cid) {
      this.detail.cid = cid
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    padding-bottom: 50px;
    height:auto;
  .panl_swiper
    width 100%
    height 220px
    position relative
    box-sizing border-box

    img 
      display block
      width 100%
      height 100%   
    .swiper
      width 100%
      height 100%
      .swiper-item
        width 100%
        height 100%
        padding 10px 50px
        box-sizing border-box
      .slide-image
        width 100%
        height 100%
    .tranTrian
      flex-direction column
      position absolute
      left 20px
      top 0
      z-index 2
      display flex
      width 36px
      height 20px
      img 
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        z-index 1
      .tranTitle
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        z-index 2
        font-size 12px
        text-align center
        color #fff
  .door_panl
    padding 20px
    background-color #ffffff
    img
      width 18px
      height 18px
    label
      font-size 18px
      margin 0 10px 0 6px
    span
      font-size 14px
      color #9FA0A0
  .price_panl
    background-color #ffffff
    border-bottom 1px solid #D8D8D8
    border-top 1px solid #D8D8D8
    padding 10px 0
    display flex
    .price_name
      width 33.3%
      border-right 1px solid #d8d8d8
      p
        text-align center
        font-size 12px
        color: #686564 
        span 
          color #E60113
      p:last-child
        margin-top 6px 
        color: #000  
    .price_name:last-child
      border-right 0 
  .onlookers_panl
    padding 0 20px
    background-color #ffffff
    overflow hidden
    .looks_panl
      span
        display inline-block
        font-size 10px
        color #898989
        text-align center
        border-radius 6px
        background-color #F0F0F0
        margin-right 15px
        margin-top 10px
        padding 4px 15px
        box-sizing border-box
    .copent_panl
      display flex
      justify-content center
      align-items center
      background-color #F0F0F0
      width 100%
      line-height 38px
      border-radius 6px
      margin-bottom 20px
      margin-top 20px
      img 
        width 17px
        height 22px
        margin-right 14px
      span
        font-size 14px
        color #686564
  .estate_news_panl
    background-color #ffffff
    margin 10px 0
    overflow hidden
    padding 10px 0 14px 20px
    .estate_title
      border-left 2px solid #FF2B2B
      padding-left 10px
      span 
        font-size 18px
        color #3F3B3A
    .estate_intro 
      matgin-top:10px;
      .rich-text 
        font-size: 12px !important;
        line-height 1.5 !important;
        font-size 12px !important;
    .advanTage
      width 100%
      display flex
      flex-flow:wrap
      margin-top 20px
      li
        width 50%
        margin-bottom 6px
        display flex
        align-items center
        img
          width 10px
          height 10px
          margin-right 6px
        span
          no-wrap()
          font-size 14px
          color #9A9A9A
          flex 1

  .apartment_panl
    background-color #ffffff
    padding 15px 20px
    .apar_title
      display flex
      justify-content space-between
      color #3F3B3A
      margin-bottom 12px
      span 
        font-size 18px
      a
        font-size 14px
        color #3F3B3A
    .apar_panl
      padding 20px 0 30px 0
      display flex
      justify-content space-between
      .apar_left
        width 168px
        height 127px
        margin-right 15px
        img 
          width 100%
          height 100%
      .apar_right
        flex 1
        .titel
          font-size 16px
          color #595757
          img
            width 17px
            height 17px
            margin-right 8px
        .apar_details
          margin-top 17px
          li
            font-size 12px
            color #999999
            margin-bottom 8px
            label
              font-size 12px
              color #595757
            span 
              color #E60113
  .estateDetails_panl
    margin-top 10px
    padding 14px 20px 0 20px
    background-color #ffffff
    .floor_details
      margin-top 12px
      li
        font-size 14px
        color #000000
        line-height 20px
        label 
          color #9FA0A0
    .getMore
      color #9FA0A0 
      font-size 14px
      text-align center
      margin 10px 0 6px 0
  .titles_panl
    overflow hidden
    span
      border-left 2px solid #FF2B2B
      color #3F3B3A
      font-size 18px
      padding-left 10px
  .designImg_panl
    margin-top 10px
    padding 14px 20px 14px 20px
    background-color #ffffff
    .imgBox
      margin 14px 0 10px 0
      width 100%
      display  flex
      justify-content space-between
      a
        width 160px
        height 120px
        display inline-block
        img
          width 100%
          height 100%
  .brighDot_panl
    background-color #ffffff
    margin-top 10px
    .brigDotBox
      padding 12px 20px 12px 20px
      .about_panl
        margin-top 10px
        p
          font-size 12px
          color #5C5A5A
          line-height 17px
    .flootAbout
      ul
        width 100%
        display flex
        flex-wrap wrap
        li
          display inline-block
          width 50%
          padding-left 20px
          box-sizing border-box
          margin-bottom 15px
          .titel_p
            display flex
            img
              width 18px
              height 18px
              margin-right 12px
            span
              font-size 18px
          .about_p
            font-size 12px
            color #545150
            margin-top 10px
  .match_panl
    background-color #ffffff
    margin-top 10px
    padding 20px
    .door_about
      font-size 12px
      color #9A9A9A
      margin 10px 0
    .map_img
      width 100%
      height 160px
      img
        width 100%
        height 100%
    .matchBox
      display flex
      padding 10px 20px
      .macund
        display flex
        flex-direction column
        width 17%
        text-align center
        align-items center
        justify-content center
        img 
          width 26px
          height 26px
        div
          margin-top 8px
          font-size 12px
          color #5C5A5A
          line-height 18px
    .distancBox
      padding 20px 20px 0 20px
      ul
        li
          display flex
          margin-bottom 7px
          p.addr
            width 270px
            line-height 20px
            font-size 14px
            color #5C5A5A
            no-wrap()
          p.add_but
            display flex
            flex 1
            font-size 14px
            color #5C5A5A
            img
              width 14px
              height 16px 
              margin-right 6px
    .affirm_panl
      padding 14px 20px
      p
        font-size 12px
        color #5C5A5A
        line-height 18px
      p:first-child
        margin-bottom 20px       
 
</style>