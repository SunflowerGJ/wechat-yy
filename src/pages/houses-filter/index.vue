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
        >{{item.label}}</span>
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
        >{{item.label}}</span>
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
        >{{item.value}}</span>
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
        >{{item.value}}</span>
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
        >{{item.label}}</span>
      </div>
    </div>
    <div class="footer">
      <span @click="goIndex">确定</span>
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
      housesType: [
        { label: '普通住宅', value: 1 },
        { label: '别墅', value: 2 },
        { label: '公寓', value: 3 },
        { label: '商业', value: 4 },
        { label: '办公', value: 5 },
        { label: '全部', value: 0 }
      ],
      apartment: [
        { label: '一室', value: 1 },
        { label: '二室', value: 2 },
        { label: '三室', value: 3 },
        { label: '四室', value: 4 },
        { label: '五室', value: 5 },
        { label: '不限', value: 0 }
      ],
      areas: [
        { label: '50m²以下', value: '0-50' },
        { label: '50-70m²', value: '50-70' },
        { label: '70-90m²', value: '70-90' },
        { label: '90-110m²', value: '90-110' },
        { label: '110-130m²', value: '110-130' },
        { label: '130-150m²', value: '130-150' },
        { label: '150-200m²', value: '150-200' },
        { label: '200m²以上', value: '200-0' },
        { label: '不限', value: 0 }
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
    goIndex () {
      // 住宅类型
      const buildingType = this.housesType[this.housesTypeActive].value
      // 城市信息
      const areaId = this.spaces[this.spacesActive].id
      // 户型
      const housetype = this.apartment[this.apartmentActive].value
      // 单价
      const unitprice = this.unitpriceSetting[this.unitpriceActive].key
      // 总价
      const totalprice = this.totalpriceSetting[this.totalpriceActive].key
      // 面积
      const space = this.areas[this.areasActive].value
      // console.log(buildingType)
      // console.log(areaId)
      // console.log(housetype)
      // console.log(unitprice)
      // console.log(totalprice)
      // console.log(space)
      const params = {
        building_type: buildingType,
        area_id: areaId,
        housetype: housetype,
        unitprice,
        totalprice,
        space
      }
      this.$wx.reLaunch({url: '/pages/index/main?params=' + JSON.stringify(params)})
    },
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
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #F0F0F0;
        border-radius: 6px;
        overflow: hidden;
        font-size: 14px;
        color: #9FA0A0;
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 16px;

        &.cities__tag--selected {
          color: #fff;
          background-color: #E60113;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }

  .footer {
    background: #fff;
    padding: 0 20px;

    span {
      margin-top: 10px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #F0F0F0;
      border-radius: 6px;
      overflow: hidden;
      font-size: 18px;
      color: #fff;
      display: inline-block;
      margin-bottom: 10px;
      background-color: #E60113;
    }
  }
}
</style>
