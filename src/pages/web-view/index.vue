<template>
  <div class="container" v-if="src">
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
import {postArticleDetail, POINTArticleClick} from '../../http/api.js'
export default {
  // 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: this.$route.query.title,
      path: `pages/web-view/main?src=${this.$route.query.src}&title=${this.$route.query.title}&photo=${this.$route.query.photo}&id=${this.$route.query.id}`,
      imageUrl: decodeURIComponent(this.$route.query.photo) || ''
    }
  },
  data () {
    return {
      src: ''
    }
  },
  methods: {
    typeMap (cateId) {
      if (Number(cateId) === 1) { return 4 }
      if (Number(cateId) === 1) { return 1 }
      if (Number(cateId) === 1) { return 2 }
      if (Number(cateId) === 1) { return 3 }
    }
  },
  async mounted () {
    this.src = this.$route.query.src ? decodeURIComponent(this.$route.query.src) : ''
    wx.setNavigationBarTitle({
      title: this.$route.query.title || ''
    })
    if (this.$route.query.id) {
      const data = await postArticleDetail({ article_id: this.$route.query.id })
      let type = this.typeMap(data.cate_id)
      POINTArticleClick({
        cityId: data.city_id,
        houseId: data.house_id,
        articleId: data.id,
        type: type
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
  
</style>
