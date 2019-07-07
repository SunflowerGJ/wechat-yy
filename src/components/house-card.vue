<template>
  <div class="main_item" @click="goHomePage(hData)">
    <div class="item-header">
      <h3>{{hData.name}}</h3>
      <span class="price-wrap">
        <i class="price">{{hData.price}}</i>元/m²
      </span>
    </div>
    <div class="item-addr">
      地址：{{hData.address}}
    </div>
    <div class="item-main">
      <div class='item-main_tag'>
        <i></i>
        <div class='lawyerType-bgImg'></div>
        <span>{{hData.sales_status}}</span>
      </div>
      <img class="item-mian__banner" :src="hData.photo" alt="">
    </div>
    <div class="item-tags">
      <span class="item-tags__item" v-for="(tag,tIndex) in hData.tags" :key="tIndex"> {{tag}}</span>
    </div>
  </div>
</template>

<script>
import {POINTHouseClick} from '../http/api.js'
export default {
  props: ['hData', 'houseClick'],

  methods: {
    goHomePage (data) {
      this.$router.push({
        path: '/pages/home-page/main',
        query: {id: data.id}
      })
      if (!this.houseClick) return
      POINTHouseClick({
        cityId: this.globalData.address,
        houseId: data.id,
        type: this.houseClick.type
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../stylus/mixin.styl"
  .main_item
    background-color #fff
    margin-bottom 5px 
    box-sizing border-box
    padding 15px 20px  
    .item-header
      height 25px
      line-height 25px 
      display flex
      justify-content: space-between
      h3 
        font-family: PingFangSC-Semibold
        font-size: 18px
        color: #3F3B3A
      .price-wrap
        display flex
        align-items center
        justify-content center
      .price
        color #E60113 
        font-weight 500
    .item-addr
      font-family: PingFangSC-Regular
      font-size: 12px
      line-height 16px
      color: #9FA0A0 
      no-wrap()
    .item-main
      margin 3px 0
      width 335px
      height 160px
      border-radius 3px
      overflow hidden
      position relative
      .item-mian__banner
        display block
        width 100%
        height 100%
      .item-main_tag
        height 20px
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
        padding-left 5px;
        span 
          font-size: 12px;
          color: #fff;
          float: left;
          line-height: 20px;
        .lawyerType-bgImg
          width: 100%;  
          height: 100%;  
          position: absolute;
          right: 0;
          top: 0;
          z-index: -1;
          background: #E60113
        i 
          position: absolute;
          right: -39rpx;
          top: 0;
          width: 0; 
          height: 0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent transparent #E60113 ;  
    .item-tags
      display flex
      flex-wrap: wrap
      justify-content: flex-start
      .item-tags__item
        margin-top 5px
        margin-right 4px
        border 1rpx solid #E60113
        border-radius 2px
        font-size 10px
        color #E60113
        display flex
        align-items center
        justify-content center
        min-width 75px
        box-sizing border-box
        padding 2px 6px 2px 17px
        background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAAuZJREFUSA2dVktrFEEQrp7d7MwmEfNYdjdG0fgAPQUEFcxBBUkO8SASDwqC3r0IingSf4Q3LyIYJCDm4kERBS9BA+rJS5CQYDbPkcQkO5tkpu2vku7M7MxuYgp6u+qrr6q7+jUrSMmUaJfoU1D2P39K6WNdm6hU4i+4UmiKIFGywO0I5kmS7GADAMTQYBQWxmim/ThUMiyEWa0tHA6HKIncFPLACIuYsnIvScobYdB2nENmjNTRI+T/Gjd+HsO+0kf5sVEqLE8QCCyYfFD2UAzL6tCw5ILwM3fmssYZBGbGMMm3lMRZVZPCtlVdApyFxXFegPTJE2Eu62bo4voMiVQqRtBAycqxapZ2uqFApXRe+00vV8ukyQBNAIzmR/fQkT87T+71OyTX1omyDmP6RyxkOw9WPG9SAzv0LgeseZUvSRsbCRZi8EAwf9MUHXHWMlRQpAbNw4Eze65B9OoUxQKw9jiIuW+fwlSjm4BU12Fqun+X2r9+YKe1r5lwR+z+XkOGYmrAEa8l0vcJ+wQxI5SHhhP5slIxZBDMCDCKy5MkGrNQjfDuB4GxzQhApOcZh1YaTndrlftIgFCrg+PgDtwmf26zpszFnkhAZEoRT4Kh3w43wZcIZRz7rD58PxSjLZG1d9BV70l3zRdo73m3I7nkHW/BFr/t/Wsqbsxyg74biT3BtYJaBp9R5sJ5EpbFDTqw3Uhsl1vfvqJMzznCCRXqtbCamurmCVZWSJY9ErZN6yOj5PYNRPjpiKUMf/I3iYY04bLtRngCahI45BvjE7GQWAXMEIJa37wgu/cSzywWFQJQaeXdR/pz9Rbek5BnU00eQPmEmlV++qdaosZYUBgIVlZptniKpFqqJIlczTDBudZPFLr08GG2aBFRHOZGwG2j5gCVzyO8PMHiEi0+eEwl9X5NZzu5QV96+ISCpb8kHIfWRr9vZ6zS/vvbWRVf38RHAZ8S/EUgZeDm1Y/Y2cs5VC7kRO5/7iMtye51JCIAAAAASUVORK5CYII=') no-repeat 3px center
        background-size 10px 10px
     
</style>
