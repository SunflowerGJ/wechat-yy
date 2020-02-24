<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <img src="/static/images/icon-search.png" alt>
        <input
          @confirm="bindconfirm"
          @focus="bindfocus"
          @blur="bindblur"
          @input="bindinput"
          placeholder="搜索"
        >
      </div>
    </div>
    <div class="history" v-show="!searchData">
      <div class="history__title">
        <p>曾经浏览过的城市</p>
      </div>
      <div class="history__tags">
        <span
          class="history__tag"
          v-for="(item,index) in hisCity"
          @click="onSelect(item)"
          :index="index"
          :key="index"
        >{{item}}</span>
      </div>
    </div>
    <div class="search-mian" v-show="searchData && (searchData.length > 0)">
      <div class="history__title">
        <p>您要查找的城市</p>
      </div>
      <div class="history__tags">
        <span
          class="history__tag"
          v-for="(item,index) in searchData"
          :index="index"
          :key="index"
          @click="goIndex(item.shortname)"
        >{{item.shortname}}</span>
      </div>
    </div>
    <div class="search-mian" v-show="searchData && (searchData.length === 0)">
      <div class="history__title">
        <p>您要查找的城市</p>
      </div>
      <div class="history__no-tags">该城市目前没有新楼盘，敬请期待！</div>
    </div>
  </div>
</template>

<script>
import { postCitySearch } from '../../../http/api.js'
export default {
  data () {
    return {
      searchData: null,
      hisCity: []
    }
  },
  mounted () {
    this.searchData = null
    this.hisCity = wx.getStorageSync('addr')
  },
  methods: {
    async bindconfirm (event) {
      const k = event.mp.detail.value
      this.fetchCitySearch(k)
    },
    async fetchCitySearch (k = '') {
      const data = await postCitySearch({ k })
      this.searchData = data
    },
    bindinput (event) {
      const k = event.mp.detail.value
      if (!k) {
        this.searchData = null
      }
    },
    onSelect (item) {
      this.fetchCitySearch(item)
    },
    goIndex (addr) {
      this.setLocalstorage(addr)
      this.$wx.reLaunch({url: '/pages/index/main?addr=' + addr})
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
@import '../../../stylus/mixin.styl';

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

    .history__no-tags {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      margin-top: 100px;
      color: #676767;
    }
  }
}
</style>
