<template>
  <div class="container" v-if="detail">
    <h2 class="title">{{detail.title}}</h2>
    <p class="time">{{detail.create_time}}</p>
    <!-- <img class="banner" :src="detail.photo" alt=""> -->
    <div class="rich-text">
      <rich-text :nodes="detail.content"></rich-text>
    </div>
  </div>
</template>

<script>
import {postArticleDetail} from '../../http/api.js'
export default {

  data () {
    return {
      detail: null
    }
  },
  async mounted () {
    const data = await postArticleDetail({
      article_id: this.$route.query.id
    })
    this.detail = data
    const regex = new RegExp('<img', 'gi')
    this.detail.content = this.detail.content.replace(regex, `<img style="max-width: 100%;"`)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #fff
    padding 20px
    height 100vh
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
      img 
        display block
        width 100%
        height 200px 
  
</style>
