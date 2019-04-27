<template>
  <div class="container">
    <div class="header">
      <div class="search" @click="goCitySearch">
        <img src="/static/images/icon-search.png" alt>
        <input disabled placeholder="搜索">
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>您在</p>
        <!-- <img src="/static/images/icon-addr.png" alt> -->
      </div>
      <div class="cities__tags cities__tags--current">
        <span class="cities__tag cities__tag--selected">{{curAddr}}</span>
      </div>
    </div>
    <div class="cities">
      <div class="cities__key">
        <p>推荐城市</p>
      </div>
      <div class="cities__tags">
        <span
          class="cities__tag"
          @click="onSelect(item)"
          v-for="(item,index) in recommend"
          :index="index"
          :key="index"
        >{{item.shortname}}</span>
      </div>
    </div>
    <div class="cities">
      <block v-for="(item,index) in cities" :index="index" :key="index">
        <div class="cities__key cities__key--line">
          <p>{{item[0]}}</p>
        </div>
        <div class="cities__tags">
          <span
            class="cities__tag"
            @click="onSelect(tItem)"
            v-for="(tItem,tIndex) in item[1]"
            :index="tIndex"
            :key="tIndex"
          >{{tItem.shortname}}</span>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import { postCities } from '../../http/api.js'
export default {
  data () {
    return {
      cities: [],
      recommend: [],
      curAddr: '',
      select: null
    }
  },
  async mounted () {
    this.curAddr = this.$route.query.city
    const data = await postCities()
    this.cities = Object.entries(data.citys)
    this.recommend = data.recommend
    this.setLocalstorage(this.$route.query.city)
  },
  methods: {
    goCitySearch () {
      this.$router.push({ path: '/pages/city-search/main' })
    },
    onSelect (item) {
      this.setLocalstorage(item.shortname)
      this.$wx.reLaunch({url: '/pages/index/main?addr=' + item.shortname})
    },
    async setLocalstorage (addr) {
      var arr = []
      if (wx.getStorageSync('addr')) {
        arr = wx.getStorageSync('addr')
      }
      arr.unshift(addr)
      arr = arr.reduce((pre, cur) => pre.includes(cur) ? pre : pre.concat(cur), [])
      wx.setStorageSync('addr', arr)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.container {
  background: #f2f2f2;

  .header {
    padding: 12px 20px;
    background: #fff;

    .search {
      background-color: #f2f2f2;
      height: 28px;
      border-radius: 14px;
      overflow: hidden;
      font-size: 12px;
      display: flex;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
        margin: 0 5px 0 20px;
      }

      input {
        width: 100%;
      }
    }
  }

  .search-mian, .history {
    padding: 0 20px;
    margin-top: 10px;

    .history__title {
      height: 38px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      p {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #999;
      }
    }

    .history__tags {
      display: flex;
      flex-wrap: wrap;

      .history__tag {
        width: 96px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #F0F0F0;
        border-radius: 6px;
        border: 1px solid #d8d8d8;
        overflow: hidden;
        font-size: 14px;
        color: #9FA0A0;
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 18px;

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }

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
      &.cities__tags--current {
          padding 0
      }

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
