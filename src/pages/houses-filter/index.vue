<template>
  <div class="container">
    筛选找房
  </div>
</template>

<script>
import {postIndex} from '../../http/api.js'
export default {

  data () {
    return {
      cityinfo: null
    }
  },
  async mounted () {
    console.log(this.globalData.address)
    this.fetchIndexData(this.globalData.address)
  },
  methods: {
    async  fetchIndexData (city) {
      const data = await postIndex({city})
      console.log(data)
      this.cityinfo = data.cityinfo
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    

</style>
