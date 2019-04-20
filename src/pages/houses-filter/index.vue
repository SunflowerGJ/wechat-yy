<template>
  <div class="container">
    <div class="cities">
      <div class="cities__key">
        <p>住宅类型</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':housesTypeActive===index}"
          v-for="(item,index) in housesType"
          :index="index"
          :key="index"
          @click="housesTypeActive = index"
        >{{item}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>区域</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':spacesActive===index}"
          v-for="(item,index) in spaces"
          :index="index"
          :key="index"
          @click="spacesActive=index"
        >{{item.shortname}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>户型居室</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':apartmentActive===index}"
          v-for="(item,index) in apartment"
          :index="index"
          :key="index"
          @click="apartmentActive=index"
        >{{item}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>单价</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':unitpriceActive===index}"
          v-for="(item,index) in unitpriceSetting"
          :index="index"
          :key="index"
          @click="unitpriceActive=index"
        >{{item}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>总价</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':totalpriceActive===index}"
          v-for="(item,index) in totalpriceSetting"
          :index="index"
          :key="index"
          @click="totalpriceActive=index"
        >{{item}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>面积</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          :class="{'cities__tag--selected':areasActive===index}"
          v-for="(item,index) in areas"
          :index="index"
          :key="index"
          @click="areasActive=index"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { postIndex } from '../../http/api.js'
export default {
  data () {
    return {
      cityinfo: null,
      totalpriceSetting: null,
      unitpriceSetting: null,
      spaces: null,
      housesType: ['普通住宅', '别墅', '公寓', '商业', '办公', '全部'],
      apartment: ['一室', '二室', '三室', '四室', '五室以上', '不限'],
      areas: [
        '50',
        '50-70',
        '70-90',
        '90-110',
        '110-130',
        '130-150',
        '150-200',
        '200',
        '不限'
      ],
      totalpriceActive: 0,
      unitpriceActive: 0,
      areasActive: 0,
      spacesActive: 0,
      housesTypeActive: 0,
      apartmentActive: 0
    }
  },
  async mounted () {
    this.fetchIndexData(this.globalData.address)
  },
  methods: {
    async fetchIndexData (city) {
      const data = await postIndex({ city })
      console.log(data)
      this.cityInfo = data.cityInfo
      this.totalpriceSetting = data.cityInfo.totalprice_setting
      this.unitpriceSetting = data.cityInfo.unitprice_setting
      this.spaces = data.cityInfo.areas
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.container {
  background: #f2f2f2;

  .cities {
    background: #fff;
    padding: 0 20px;

    .cities__key {
      height: 38px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &.cities__key--line {
        border-bottom: 1px solid #d8d8d8;
      }

      p {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #3F3B3A;
        font-weight: bold;
        display: inline-block;
      }

      img {
        display: inline-block;
        width: 8px;
        height: 11px;
        margin-left: 8px;
      }
    }

    .cities__tags {
      padding-top: 12px;
      display: flex;
      flex-wrap: wrap;

      .cities__tag {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #F0F0F0;
        border-radius: 6px;
        overflow: hidden;
        font-size: 14px;
        color: #9FA0A0;
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 18px;

        &.cities__tag--selected {
          color: #fff;
          background-color: #E60113;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
