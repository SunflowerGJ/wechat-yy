<template>
  <div class="container" v-if="list">
    <scroll-view
    scroll-y
    style="height: 100vh;"
    @scrolltolower="scrolltolower">
    <div class="watch_panl" v-for="(item,index) in list" :key="index">
      <div class="letf_panl">
        <img v-if="!item.headimgurl" src="/static/images/default-avatar.png" alt="">
        <img v-else :src="item.headimgurl"/>
        <span>{{item.nickname}}</span>
      </div>
      <div class="rigth_panl">
          <span>{{item.lang}}</span>
      </div>
    </div>
  </scroll-view>
  </div>
</template>

<script>
import {postShowHousesAccess} from '../../http/api.js'
export default {

  data () {
    return {
      list: [],
      page: 1,
      pagesize: 10,
      total_page: 0,
      falg: true

    }
  },
  async mounted () {
    const data = await postShowHousesAccess({
      house_id: this.$route.query.id,
      page: this.page,
      pagesize: this.pagesize
    })
    this.list = data.list
    this.total_page = data.total_page
  },
  onUnload () {
    this.list = []
    this.page = 1
    this.pagesize = 10
    this.total_page = 0
    this.falg = true
  },
  methods: {
    async scrolltolower (e) {
      if (this.falg) {
        this.falg = false
        this.page++
        if (this.total_page >= this.page) {
          const data = await postShowHousesAccess({
            house_id: this.$route.query.id,
            page: this.page,
            pagesize: this.pagesize
          })
          this.list = [...this.list, ...data.list]
          this.total_page = data.total_page
          this.falg = true
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    margin-top 10px
    .watch_panl
      background-color #ffffff
      border-bottom 1px solid #d8d8d8
      padding 10px 20px    
      display flex
      justify-content space-between
      align-items center
      .letf_panl
        display flex
        align-items center
        img
          width 60px
          height 60px
          margin-right 18px
          border-radius 100% 
        span
          font-size 14px
          color #595757
      .rigth_panl
        span 
          font-size 14px
          color #9FA0A0
          text-align right
</style>
