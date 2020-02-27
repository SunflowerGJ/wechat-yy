<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <img src="/static/images/icon-search.png" alt="">
        <input 
        @confirm="bindconfirm"
         placeholder="搜索"/></div>
    </div>
    <div v-if="houses.length===0" class="no-result">
     <div class="no-result--img"><img src="/static/images/no-reuslt.png" alt=""></div>
      <p>没有符合条件的搜索结果</p>
    </div>
    <block v-for="(item,index) in houses" :index="index" :key="index">
      <house-card
        :key="index"
        :hData='item'></house-card>  
    </block>
  </div>
</template>

<script>
import HouseCard from '../../../components/house-card'
import {postHousesList} from '../../../http/api.js'
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
      this.houses = data.map(item => {
        if (item.tags) {
          return {...item, tags: item.tags.split('|')}
        } else {
          return item
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../stylus/mixin.styl"
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
      width 100%
      position absolute
      top 10%
      left 0
      .no-result--img
        opacity 0.2
        img 
          display block
          width 280px
          height 80px
          margin 15px auto
          opacity 0.3
      p 
        display block
        text-align center
        font-size:14px
        color #676767
        opacity 0.4

</style>
