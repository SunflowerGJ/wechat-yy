<template>
  <div class="container">
    <div class="header">
      <img class="header-bg" src="/static/images/personal-bg.png" alt>
      <div class="avatar">
        <open-data type="userAvatarUrl"/>
      </div>
    </div>
    <div class="info-section">
      <div class="info-section__title">
        <h3>我收藏的楼盘</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onSscrolltolowerHouse"
        >
          <view
            class="info-section__item"
            @click="goHomePage(item.id)"
            v-for="(item,index) in houseList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <div class="info-section__item-info">
              <span class="title">{{item.name}}</span>
            </div>
            <div class="info-section__item-info">
              <span class="total-price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="price">{{item.average_price}}元/m²</span>
            </div>
          </view>
        </scroll-view>
      </div>
    </div>

    <div class="info-section">
      <div class="info-section__title">
        <h3>我收藏的户型</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onScrolltolowerDoor"
        >
          <view
            class="info-section__item"
            @click="goHousesDetail(item.id)"
            v-for="(item,index) in doorList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <div class="info-section__item-info">
              <span class="title">{{item.name}}</span>
              <span class="area">建积{{item.inside_space}}m²</span>
            </div>
            <div class="info-section__item-info">
              <span class="total-price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="price">{{item.unit_price}}元/m²</span>
            </div>
          </view>
        </scroll-view>
      </div>
    </div>
    <div class="info-section">
      <div class="info-section__title">
        <h3>过去10天浏览记录</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onScrolltolowerHouseHis"
        >
          <view
            class="info-section__item"
            @click="goHomePage(item.house_id)"
            v-for="(item,index) in houseHisList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <div class="info-section__item-info">
              <span class="title">{{item.name}}</span>
            </div>
            <div class="info-section__item-info">
              <span class="total-price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="price">{{item.average_price}}元/m²</span>
            </div>
          </view>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import { postSearchCollection, postShowMemberAccess } from '../../http/api.js'
export default {
  data () {
    return {
      list: [
        {
          url:
            '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '远洋五里春秋二期'
        },
        {
          url:
            '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '崭新时代'
        },
        {
          url:
            '//m.360buyimg.com/mobilecms/jfs/t1/7311/27/1094/92889/5bcd4d95E4e29d1b8/08a137eddb69130e.jpg!cr_1125x549_0_72',
          title: '远洋201'
        }
      ],
      house: {
        // 楼盘
        type: 1,
        page: 1,
        pagesize: 5,
        total_page: 0,
        current_page: 0,
        next_page: 0
      },
      door: {
        // 户型
        type: 2,
        page: 1,
        pagesize: 5,
        total_page: 0,
        current_page: 0,
        next_page: 0
      },
      houseHis: {
        // 户型
        type: 1,
        page: 1,
        pagesize: 5,
        total_page: 0,
        current_page: 0,
        next_page: 0
      },
      houseList: [],
      houseHisList: [],
      doorList: []
    }
  },
  mounted () {
    this.fetchCollection(this.house)
    this.fetchCollection(this.door)
    this.fetchHousesAccess(this.houseHis)
  },
  methods: {
    // 查询用户收藏
    async fetchCollection (options) {
      const params = Object.assign(options, { token: this.globalData.token })
      const data = await postSearchCollection(params)
      if (options.type === 1) {
        this.houseList = data.list
      } else {
        this.doorList = data.list
      }
    },
    // 获取楼盘访问记录
    async fetchHousesAccess (options) {
      const params = Object.assign(options, { token: this.globalData.token })
      const data = await postShowMemberAccess(params)
      this.houseHisList = data
    },
    onSscrolltolowerHouse (e) {
      if (this.house.next_page) {
        this.house.page = this.house.next_page
        this.fetchCollection(this.house)
      }
    },
    onScrolltolowerDoor (e) {
      if (this.door.next_page) {
        this.door.page = this.door.next_page
        this.fetchCollection(this.door)
      }
    },
    onScrolltolowerHouseHis (e) {
      if (this.houseHis.next_page) {
        this.houseHis.page = this.houseHis.next_page
        this.fetchHousesAccess(this.houseHis)
      }
    },
    goHomePage (id) {
      this.$router.push({
        path: '/pages/home-page/main',
        query: { id }
      })
    },
    goHousesDetail (id) {
      this.$router.push({ path: '/pages/door-details/main', query: { id } })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.container {
  background: #f2f2f2;

  .header {
    width: 100%;
    height: 218px;
    position: relative;
    background: #fff;

    .header-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    }

    .avatar {
      width: 74px;
      height: 74px;
      border-radius: 50%;
      border: 1px solid #ffffff;
      overflow: hidden;
      position: absolute;
      z-index: 2;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .info-section {
    margin-bottom: 10px;
    // height 230px
    background-color: #fff;

    .info-section__title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;

      h3 {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #3F3B3A;
      }
    }

    .info-section__main {
      // height 160px
      padding: 0 20px 30px 20px;

      // box-sizing border-box
      .info-section__item {
        width: 160px;
        overflow: hidden;
        display: inline-block;
        margin-left: 15px;
        vertical-align: top;

        &:first-child {
          margin-left: 0;
        }

        .info-section__item-img {
          display: block;
          width: 100%;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .info-section__item-info {
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #3F3B3A;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          line-height: 1;
          margin-top: 5px;

          .title {
            font-size: 16px;
            color: #3F3B3A;
          }

          .area {
            font-size: 12px;
            color: #3F3B3A;
          }

          .total-price {
            display: flex;
            align-items: center;
            justify-content: center;

            .total-price--red {
              color: #E60113;
            }
          }
        }
      }
    }
  }
}
</style>
