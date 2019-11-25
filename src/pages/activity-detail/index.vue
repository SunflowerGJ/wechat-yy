<template>
  <div class="container" v-if="detail">
    <tips></tips>
    <h2 class="title">{{detail.title}}</h2>
    <p class="time">{{detail.create_time}}</p>
    <!-- <img class="banner" :src="detail.photo" alt=""> -->
    <div class="rich-text">
      <rich-text :nodes="detail.content"></rich-text>
    </div>
  </div>
</template>

<script>
import {postArticleDetail, getArticleShareData} from '../../http/api.js'
import tips from '../../components/tips'
export default {
  // 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: this.detail.title || '',
      path: 'pages/activity-detail/main?id=' + this.$route.query.id,
      imageUrl: this.detail.photo || ''
    }
  },
  components: {
    tips
  },
  data () {
    return {
      detail: null,
      saveInfo: null
    }
  },
  async mounted () {
    const data = await postArticleDetail({
      article_id: this.$route.query.id
    })
    this.detail = data
    this.detail.content = this.detail.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:4px auto;" ')
    wx.setNavigationBarTitle({
      title: data.title
    })
    const res = await getArticleShareData({
      article_id: this.$route.query.id
    })
    console.log(res)
    this.saveInfo = res
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #fff
    padding 20px
    min-height 100vh
    box-sizing border-box
    .title
      font-family: PingFangSC-Medium
      font-size: 20px
      color: #3F3B3A
      margin-bottom 12px
    .time
      font-family: PingFangSC-Medium
      font-size: 14px
      color: #9FA0A0
      margin-bottom 12px
    .banner
      display block
      width 100%
      height 200px 
      margin-bottom 12px 
    .rich-text
      font-size: 14px !important
      color: #595757 !important
      line-height: 2;
      letter-spacing: 1px;
      image
        display block
        width 100%
        height 200px       
      img 
        display block
        width 100%
        height 200px 
  
</style>
