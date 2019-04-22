<template>
  <div class="container" v-if="src">
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
import {postArticleDetail} from '../../http/api.js'
export default {

  data () {
    return {
      src: ''
    }
  },
  async mounted () {
    const data = await postArticleDetail({
      article_id: this.$route.query.id
    })
    console.log(data)
  },

  methods: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
  
</style>
