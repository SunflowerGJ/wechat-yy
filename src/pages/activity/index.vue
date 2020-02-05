<template>
  <div class="container">
    <div class="info-section">
      <div class="info-section__title">
        <h3>集团资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onSscrolltolowerGroup"
        >
          <view
            class="info-section__item"
            @click="goActivityDetail(item.id,item.house_id,1,item.url,item.title,item.photo)"
            v-for="(item,index) in  groupList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>
    <div class="info-section">
      <div class="info-section__title">
        <h3>城市资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onScrolltolowerCity"
        >
          <view
            class="info-section__item"
            @click="goActivityDetail(item.id,item.house_id,2,item.url,item.title,item.photo)"
            v-for="(item,index) in cityList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>
    <div class="info-section">
      <div class="info-section__title">
        <h3>项目资讯</h3>
      </div>
      <div class="info-section__main">
        <scroll-view
          :scroll-x="true"
          style="white-space: nowrap; display: flex;"
          @scrolltolower="onScrolltolowerProject"
        >
          <view
            class="info-section__item"
            @click="goActivityDetail(item.id,item.house_id,3,item.url,item.title,item.photo)"
            v-for="(item,index) in projectList"
            :key="index"
          >
            <img class="info-section__item-img" :src="item.photo" alt>
            <span class="info-section__item-title">{{item.title}}</span>
          </view>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import {_getUserAddress} from '../../lib/getAddr.js'
import { postArticleList } from '../../http/api.js'
export default {
  // 右上角分享功能
  onShareAppMessage: function (res) {
    return {
      title: '置业远洋欢迎您',
      path: 'pages/activity/main',
      success: function (res) {},
      fail: function (res) {}
    }
  },
  data () {
    return {
      params: {
        group: {
          type: 2,
          page: 1,
          pagesize: 10,
          total_page: 0,
          current_page: 0,
          next_page: 0,
          list: []
        },
        city: {
          type: 3,
          page: 2,
          pagesize: 10,
          total_page: 0,
          current_page: 0,
          next_page: 0,
          list: []
        },
        project: {
          type: 4,
          page: 2,
          pagesize: 10,
          total_page: 0,
          current_page: 0,
          next_page: 0,
          list: []
        }
      },
      groupList: [],
      cityList: [],
      projectList: [],
      address: ''
    }
  },
  async onShow () {
    if (!this.globalData.address) {
      const city = await _getUserAddress()
      this.address = city
      this.globalData.address = city
    } else {
      this.address = this.globalData.address
    }
    const { group, city, project } = this.params
    this.fetchArticleList(group, 'group')
    this.fetchArticleList(city, 'city')
    this.fetchArticleList(project, 'project')
  },
  async mounted () {
    if (!this.globalData.address) {
      const city = await _getUserAddress()
      this.address = city
      this.globalData.address = city
    } else {
      this.address = this.globalData.address
    }
    const { group, city, project } = this.params
    this.fetchArticleList(group, 'group')
    this.fetchArticleList(city, 'city')
    this.fetchArticleList(project, 'project')
  },
  methods: {
    async fetchArticleList (params, typeDesc) {
      const { type, page, pagesize } = params
      var data
      if (type === 3 || type === 4) {
        data = await postArticleList({ type, page, pagesize, city: this.address })
      } else {
        data = await postArticleList({ type, page, pagesize })
      }
      if (params.type === 2) {
        this.groupList = data.list
      }
      if (params.type === 3) {
        this.cityList = data.list
      }
      if (params.type === 4) {
        this.projectList = data.list
      }
      this.params[typeDesc].total_page = data.total_page
      this.params[typeDesc].current_page = data.current_page
      this.params[typeDesc].next_page = data.next_page
    },
    onSscrolltolowerGroup (e) {
      if (this.params.group.next_page) {
        this.params.group.page = this.params.group.next_page
        this.fetchArticleList(this.params.group, 'group')
      }
    },
    onScrolltolowerCity (e) {
      if (this.params.city.next_page) {
        this.params.city.page = this.params.city.next_page
        this.fetchArticleList(this.params.city, 'city')
      }
    },
    onScrolltolowerProject (e) {
      if (this.params.project.next_page) {
        this.params.project.page = this.params.project.next_page
        this.fetchArticleList(this.params.project, 'project')
      }
    },
    goActivityDetail (id, houseId, type, url, title, photo) {
      // POINTArticleClick({
      //   cityId: this.globalData.address,
      //   houseId: houseId,
      //   articleId: id,
      //   type: type
      // })
      if (url) {
        const src = encodeURIComponent(url)
        photo = photo ? encodeURIComponent(photo) : ''
        this.$router.push({ path: '/pages/web-view/main', query: {src, title, photo, id} })
      } else {
        this.$router.push({ path: '/pages/activity-detail/main', query: { id } })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.container {
  background: #f2f2f2;

  .info-section {
    margin-bottom: 10px;
    height: 230px;
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
      height: 160px;
      padding: 0 20px;
      box-sizing: border-box;

      .info-section__item {
        width: 160px;
        overflow: hidden;
        display: inline-block;
        margin-left: 15px;
        vertical-align: text-top;

        &:first-child {
          margin-left: 0;
        }

        .info-section__item-img {
          display: block;
          width: 100%;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;
        }

        .info-section__item-title {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #505757;
          line-height: 1.2;
          margin-top: 5px;
          white-space: pre-line;
          no-wrap-more(2);
        }
      }
    }
  }
}
</style>
