<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <img src="/static/images/icon-search.png" alt="">
        <input 
        @confirm="bindconfirm"
         placeholder="搜索"/></div>
    </div>
    <div v-if="houses.length===0" class="no-result">没有符合条件的搜索结果</div>
    <template v-for="(item,index) in houses">
      <house-card
        :key="index"
        :hData='item'></house-card>  
    </template>
  </div>
</template>

<script>
import HouseCard from '../../components/house-card'
import {postHousesList} from '../../http/api.js'
export default {
  components: {
    HouseCard
  },
  data () {
    return {
      houses: []
    }
  },
  async mounted () {
    this.fetchHousesList()
  },
  methods: {
    async bindconfirm (event) {
      const k = event.mp.detail.value
      this.fetchHousesList(k)
    },
    async fetchHousesList (k = '') {
      const data = await postHousesList({k, city: this.globalData.address})
      this.houses = data.map(item => ({...item, tags: item.tags.split('|')}))
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    .header
      padding 12px 20px
      .search
        background-color #fff   
        height 28px
        border-radius 14px
        overflow hidden 
        font-size 12px; 
        display flex  
        align-items center
        img 
          width 24px
          height 24px
          margin 0 5px 0 20px 
        input 
          width 100% 
    .no-result
      display flex
      justify-content center
      align-items center
      font-size:18px
      margin-top 100px
      color #676767

    

</style>
