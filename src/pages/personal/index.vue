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
        <h3>我的礼券</h3>
      </div>
      <div class="info-section__main memberCouponsList">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onSscrolltolowerCoupons"
        >
          <view
            class="info-section__item "
            @click="onMemberCouponsDetail(item.id)"
            v-for="(item,index) in memberCouponsList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <div class="info-section__item-info">
              <span class="title overflow-ellipsis">{{item.name}}</span>
            </div>
            <div class="info-section__item-info">
              <span class="overflow-ellipsis">{{item.remark}}</span> 
            </div>
          </view>
        </scroll-view>
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
              <span class="total-price" v-if="item.total_price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="total-price" v-else>暂空/套起</span> 
              <span class="price" v-if="item.average_price">{{item.average_price}}元/m²</span>
              <span class="price" v-else>暂空/m²</span>
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
            @click="goHousesDetail(item)"
            v-for="(item,index) in doorList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo[0]" alt>
            <div class="info-section__item-info">
              <span class="title">{{item.name}}</span>
              <span class="area">建积{{item.inside_space}}m²</span>
            </div>
            <div class="info-section__item-info">
              <span class="total-price" v-if="item.total_price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="total-price" v-else>暂空/套起</span> 
              <span class="price" v-if="item.average_price">{{item.average_price}}元/m²</span>
              <span class="price" v-else>暂空/m²</span>
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
              <span class="total-price" v-if="item.total_price">
                <i class="total-price--red">{{item.total_price}}万元</i>/套起
              </span>
              <span class="total-price" v-else>暂空/套起</span> 
              <span class="price" v-if="item.average_price">{{item.average_price}}元/m²</span>
              <span class="price" v-else>暂空/m²</span>
            </div>
          </view>
        </scroll-view>
      </div>
    </div>
    <van-popup
      :show="show"
      closeable
      close-on-click-overlay
      position="bottom"
      :close="onClose">
      <div class="popup-wrap">
        <div class="close" @click="show = false">
          <img class="close-img" src='/static/images/icon-closed.png' />
        </div>
        <img class="review-img" :src="getCouponsDetail.photo" alt="">
        <div class="review-remark">
          <div class="is-suc">
            <div class="is-suc-title">{{getCouponsDetail.name}}</div>
            <div>{{getCouponsDetail.remark}}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { postSearchCollection, postShowMemberAccess, POINTHouseClick, POINTHouseType, postMemberCouponsList, postMemberCouponsDetail } from '../../http/api.js'
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
      memberCouponsCon: {
        // 礼券
        page: 1,
        pagesize: 5,
        total_page: 0,
        current_page: 0,
        next_page: 0
      },
      houseList: [],
      houseHisList: [],
      doorList: [],
      memberCouponsList: [],
      show: false,
      getCouponsDetail: {

      }

    }
  },
  onShow () {
    this.fetchCollection(this.house)
    this.fetchCollection(this.door)
    this.fetchHousesAccess(this.houseHis)
    this.fetchMemberCouponsList(this.memberCouponsCon)
  },
  methods: {
    onClose () {
      this.show = false
    },
    // 查看礼券详情
    async onMemberCouponsDetail (id) {
      const data = await postMemberCouponsDetail({id})
      this.show = true
      this.getCouponsDetail = data
    },
    // 我的礼券
    async fetchMemberCouponsList (options) {
      const data = await postMemberCouponsList(options)
      this.memberCouponsList = [...this.memberCouponsList, ...data.list]
      this.memberCouponsCon.next_page = data.next_page
    },
    // 查询用户收藏
    async fetchCollection (options) {
      const data = await postSearchCollection(options)
      if (options.type === 1) {
        this.houseList = [...this.houseList, ...data.list]
        this.house = data.next_page
      } else {
        this.doorList = [...this.doorList, ...data.list]
        this.door = data.next_page
      }
    },
    // 获取楼盘访问记录
    async fetchHousesAccess (options) {
      const data = await postShowMemberAccess(options)
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
    onSscrolltolowerCoupons () {
      if (this.memberCouponsCon.next_page) {
        this.memberCouponsCon.page = this.memberCouponsCon.next_page
        this.fetchMemberCouponsList(this.memberCouponsCon)
      }
    },
    goHomePage (id) {
      POINTHouseClick({
        cityId: this.globalData.address,
        houseId: id,
        type: 9
      })
      this.$router.push({
        path: '/pages/home-page/main',
        query: { id }
      })
    },
    goHousesDetail (item) {
      POINTHouseType({
        cityId: this.globalData.address,
        houseId: item.house_id,
        housetypeId: item.id,
        type: 7
      })
      this.$router.push({ path: '/pages/door-details/main', query: { id: item.id } })
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
      padding: 0 20px 30px 20px;
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

    .memberCouponsList {
      padding: 0 20px 10px 20px;
      .info-section__item{
        width 100px;
        margin-left 10px;
        .info-section__item-img {
          width 100px;
          height:70px;
          margin-bottom 6px;
        }
        .info-section__item-info {
          margin-top 0;
          height:14px;
          font-size:10px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(137,137,137,1);
          line-height:14px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis
          .title {
            height:17px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(63,59,58,1);
            line-height:17px;
            width 100%;
          }
          .overflow-ellipsis {
            width 100%
          }
        }
      }
    }
  }
}
.overflow-ellipsis {
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis
}
.popup-wrap {
  padding 27px 20px 14px 20px;
  box-sizing border-box;
  height 300px;
  .review-img {
    display block;
    width:336px;
    height:210px;
    margin 0 auto;
    background:rgba(249,249,249,1);
  }
  .review-remark {
    font-size:10px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(137,137,137,1);
    line-height:14px;
    text-align center;
    .is-suc-title {
      font-size:20px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,76,100,1);
      line-height:28px;
      margin-top 4px;
    }
    .is-fail {
      margin-top 13px
    }
  }
}
.close {
  position absolute
  width 20px
  height 20px
  top 5px
  right 5px
  z-index 1
  .close-img {
    display block;
    width 14px;
    height 14px;
    margin 3px auto;
  }
}
</style>
