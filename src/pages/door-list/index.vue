<template>
  <div class="container">
    <div class="apartment_panl">
      <div class="apar_panl" @click="goHousesDetail(item.id)" v-for="(item,index) in list" :key="index">
        <div class="apar_left">
          <div class="item-main_tag" v-if="item.is_hot === '1'">
            <i></i>
            <div class="lawyerType-bgImg"></div>
            <span>热销</span>
          </div>
          <img mode="aspectFit" :src="item.photo[0]"/>
        </div>
        <div class="apar_right">
            <p class="titel">
              <img src="/static/images/storey.png" />
              <span>{{item.name}}</span>
            </p>
            <ul class="apar_details">
              <li><label>【 建    面 】</label>{{item.floor_space}}m²</li>
              <li><label>【 朝    向 】</label>{{item.orientation}}</li>
              <li><label>【 总    价 】</label>约<span>{{item.total_price}}万元</span>/套</li>
              <li><label>【 单    价 】</label>{{item.unit_price}}元/m²</li>
            </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {postHouseType} from '../../http/api.js'
export default {

  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const data = await postHouseType({
      house_id: this.$route.query.id,
      token: this.globalData.token
    })
    this.list = data
  },
  methods: {
    goHousesDetail (id) {
      this.$router.push({path: '/pages/door-details/main', query: {id}})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
.container
  background #f2f2f2
  margin-bottom 50px
  .apartment_panl
    .apar_title
      display flex
      justify-content space-between
      color #3F3B3A
      margin-bottom 12px
      span 
        font-size 18px
      a
        font-size 14px
        color #3F3B3A
    .apar_panl
      padding 20px 20px 30px 20px
      display flex
      justify-content space-between
      margin-bottom 2px
      background-color #ffffff
      .apar_left
        width 168px
        height 127px
        margin-right 15px
        border 1px solid #eee
        position relative
        img 
          width 100%
          height 100%
      .apar_right
        flex 1
        .titel
          font-size 16px
          color #595757
          img
            width 17px
            height 17px
            margin-right 8px
        .apar_details
          margin-top 17px
          li
            font-size 12px
            color #999999
            margin-bottom 8px
            label
              font-size 12px
              color #595757
            span 
              color #E60113
.item-main_tag {
  height: 20px;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
  padding-left: 5px;

  span {
    font-size: 12px;
    color: #fff;
    float: left;
    line-height: 20px;
    padding: 0 10px;
  }

  .lawyerType-bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
    background: #E60113;
  }

  i {
    position: absolute;
    right: -20px;
    top: 0;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #E60113;
  }
}
</style>