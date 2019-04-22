<template>
  <div class="container" v-if="src">
    <web-view :src="src"></web-view>
  </div>
</template>

<script>

export default {

  data () {
    return {
      src: ''
    }
  },
  mounted () {
    this.src = this.$route.query.src
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
