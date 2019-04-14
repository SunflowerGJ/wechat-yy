<template>
  <div class="container">
楼盘主页
  </div>
</template>

<script>

export default {

  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$route.query.id)
  },
  methods: {
    scrolltolower (e) {
      console.log(e)
      console.log('加载数据')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    

</style>
