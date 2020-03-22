<template>
  <div class="container" v-if="detail">
    <div class="panl_swiper">
      <!-- <img :src="detail.photo"  @click="onBanner"/> -->
      <swiper :indicator-dots="swipers.indicatorDots"  :current="swipers.current" @change="changeSwiper" style="height:200px">
        <block v-for="(item, inx) in bannerlist" :key="inx">
          <swiper-item style="height:200px">
            <view v-if="item.istype == 'isVideo' && inx == swipers.current" >
               <!-- src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" -->
               <video object-fit="cover" :controls="true" :poster="item.video_photo" id="myVideo" @play="switchS(false)" @pause="switchS(true)" @ended="switchS(true)" :src="item.video_url"></video>
            </view>
            <view v-if="item.istype == 'isImg'">
               <img style="height:200px;width:100%" :src="item.src" @click="onBanner" />
            </view>
          </swiper-item>
        </block>
      </swiper>
      <div v-if="isSwDOtr" class="swDots">
        <ul v-if="showSwitchBtn">
            <li  :class="istype == 'isVideo' ? 'activeSW' : ''" @click="handlSwTpye('isVideo')">视频</li>
            <li :class="istype == 'isImg' ? 'activeSW' : ''" @click="handlSwTpye('isImg')">图片</li>
        </ul> 
      </div>
      <div v-if="isSwDOtr" class="swCurr"><span>{{swipers.current+1}}/{{bannerlist.length}}</span></div>
    </div>
    <div class="sroll_container" id="sroll_container">
      <div class="delta_panl">
        <div class="label_panl">
          <div class="label_name" v-for="(tag,index) in detail.tags" :key="index">
            <img src="/static/images/icon-tag.png">
            <span>{{tag}}</span>
          </div>
        </div>
        <div class="adder_panl">
          <img src="/static/images/icon-lou.png">
          <span>项目地址：{{detail.address}}</span>
        </div>
        <div class="sales_panl" @click="handleGoAddress">
          <span class="adder_panl_add">售楼处地址：{{detail.office_address}}</span>
          <img src="/static/images/icon-addr.png">
        </div>
      </div>
      <div class="price_panl">
        <div class="price_name">
          <p v-if="detail.total_price">
            约<span>{{detail.total_price}}万元</span>/套
          </p>
          <p v-else>
            暂空
          </p>
          <p>参考总价</p>
        </div>
        <div class="price_name">
          <p v-if='detail.average_price'>{{detail.average_price}}元/m²</p>
          <p v-else>暂空</p>
          <p>参考均价</p>
        </div>
        <div class="price_name">
          <p>{{detail.property_type}}</p>
          <p>物业类型</p>
        </div>
      </div>
      <div class="onlookers_panl">
        <div class="looks_panl" @click="goWatchList(detail.id)" v-if="detail.is_publish === '1'">
          <div class="left_panl">
            <p class="num">{{detail.browse_users.count}}</p>
            <p class="title">围观人数</p>
          </div>
          <div class="right_panl">
            <div
              class="imgall"
              v-for="(item,index)  in detail.browse_users.list"
              :key="index"
              :style="{zIndex:index,left:(index*30)+'px'}"
            >
              <img v-if="!item.headimgurl" src="/static/images/default-avatar.png" alt="">
              <img v-else :src="item.headimgurl"/>
            </div>
          </div>
        </div>
        <div class="copent_panl" @click="handleGo">
          <img src="/static/images/cpument.png">
          <span>房贷计算器</span>
        </div>
      </div>
      <div class="coupon_photo" v-if="detail.coupon_flag==1" @click="goCouponList">
        <img :src="detail.coupon_photo" alt="">
      </div>
      <div class="estate_news_panl">
        <div class="estate_title">
          <span>楼盘动态</span>
        </div>
        <div class="estate_panl">
          <scroll-view class="scroll-view_H" scroll-x="true" style="white-space: nowrap; display: flex;">
            <div class="swiper-item scroll_item" @click="goActivityDetail(item)" v-for="(item,index) in detail.article" :key="index">
              <div class="item-main_tag" v-if="item.is_top === '1'">
                <i></i>
                <div class="lawyerType-bgImg"></div>
                <span>置顶</span>
              </div>
              <p class="text_panl">{{item.title}}</p>
              <p class="deta_panl">{{item.create_time}}</p>
            </div>
          </scroll-view>
        </div>
        <div class="estate_foot" v-if="subscribeMsg">
          <button :disabled="isSubscribe" @click="onSubscribe" :class="!isSubscribe?'subscribe-btn':'subscribe-btn disable-btn'">{{isSubscribe?"已订阅消息": subscribeMsg.btnText}}</button>
        </div>
      </div>
      <div class="chat_panl" v-if="concatList.length>0">
        <div class="title_marig">
          <div class="titles_panl">
            <span>置业顾问</span>
          </div>
        </div>
        <div class="chat_main">
          <div class="chat_main_item" v-for="(item,index) in concatList" :key="index">
            <div class="chat_left">
              <img :src="item.headPhoto" alt="">
              <div class="chat_name">{{item.employeeName}}</div>
              <div class="chat_tag" :key="iindex" v-for="(iitem,iindex) in item.tags">{{iitem}}</div>
            </div>
            <div class="chat_right">
              <div style="position:relative;"> 
                <button v-if="!userInfo.mobile" class="btn-cover" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber($event,item)"></button>
                <img src="/static/images/icon-call.png" @click="onCall(item)" alt="">
              </div>
              <div style="position:relative;"> 
                <button v-if="!userInfo.mobile" class="btn-cover" open-type="getPhoneNumber" @getphonenumber="getPhoneNumberToChat($event,item)"></button>
                <img src="/static/images/icon-chat.png" @click="goChat(item)" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="apartment_panl">
        <div class="apar_title">
          <span>户型介绍</span>
          <a @click="goDoorList(detail.id)">更多户型 ></a>
        </div>
        <div class="apar_panl"  @click="goHousesDetail(item)" v-for="(item,index) in detail.housetypes" :key="index">
          <div class="apar_left">
              <div class="item-main_tag" v-if="item.is_hot === '1'">
                <i></i>
                <div class="lawyerType-bgImg"></div>
                <span>热销</span>
              </div>
            <img mode="aspectFit" :src="item.photo[0]">
          </div>
          <div class="apar_right">
            <p class="titel">
              <img src="/static/images/storey.png">
              <span>{{item.name}}</span>
            </p>
            <ul class="apar_details">
              <li>
                <label>【 建 面 】</label>
                {{item.floor_space}}m²
              </li>
              <li>
                <label>【 朝 向 】</label>
                {{item.orientation}}
              </li>
              <li v-if="item.total_price">
                <label>【 总 价 】</label>
                约<span>{{item.total_price}}万元</span>/套
              </li>
              <li v-else>
                <label>【 总 价 】</label>
                暂空
              </li>
              <li v-if="item.unit_price">
                <label>【 单 价 】</label>
                {{item.unit_price}}元/m²
              </li>
              <li v-else>
                <label>【 单 价 】</label>
                暂空
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="estateDetails_panl">
        <div class="titles_panl">
          <span>楼盘详情</span>
        </div>
        <ul class="floor_details">
          <li v-if="detail.presale_code">
            <label>预售证：</label>
            <span>{{detail.presale_code}}</span>
          </li>
          <li v-if="detail.office_address">
            <label>售楼地址：</label>
            <span>{{detail.office_address}}</span>
          </li>
          <li v-if="detail.alias">
            <label>楼盘别名：</label>
            <span>{{detail.alias}}</span>
          </li>
          <li v-if="detail.average_price">
            <label>参考均价：</label>
            <span>{{detail.average_price}}元/m²</span>
          </li>
          <li v-if="detail.total_price">
            <label>参考总价：</label>
            <span>{{detail.total_price}}万/套起</span>
          </li>
          <li v-if="detail.price_extime">
            <label>价格有效期：</label>
            <span>{{detail.price_extime}}</span>
          </li>
          <li v-if="detail.property_type">
            <label>物业类型：</label>
            <span>{{detail.property_type}}</span>
          </li>
          <!-- <li>
            <label>建筑类型：</label>
            <span>{{detail.building_type}}</span>
          </li> -->
          <li v-if="detail.decoration_standard">
            <label>装修标准：</label>
            <span>{{detail.decoration_standard}}</span>
          </li>
          <li v-if="detail.property_limit">
            <label>产权年限：</label>
            <span>{{detail.property_limit}}年</span>
          </li>
          <li v-if="detail.opening_time">
            <label>最新开盘：</label>
            <span>{{detail.opening_time}}</span>
          </li>
          <block v-if="getMore">
            <li v-if="detail.land_acreage">
              <label>占地面积：</label>
              <span>{{detail.land_acreage}}</span>
            </li>
            <li v-if="detail.floor_space">
              <label>建筑面积：</label>
              <span>{{detail.floor_space}}</span>
            </li>
            <li v-if="detail.plot_ratio">
              <label>容<i class="space-1"></i>积<i class="space-1"></i>率： </label>
              <span>{{detail.plot_ratio}}</span>
            </li>
            <li v-if="detail.greening_rate">
              <label>绿<i class="space-1"></i>化<i class="space-1"></i>率：</label>
              <span>{{detail.greening_rate}}</span>
            </li>
            <li v-if="detail.parking_spaces">
              <label>规划车位：</label>
              <span>{{detail.parking_spaces}}</span>
            </li>
            <li v-if="detail.building">
              <label>规划楼栋：</label>
              <span>{{detail.building}}</span>
            </li>
            <li v-if="detail.households">
              <label>规划户数：</label>
              <span>{{detail.households}}</span>
            </li>
            <li v-if="detail.property_company">
              <label>物业公司：</label>
              <span>{{detail.property_company}}</span>
            </li>
            <li v-if="detail.property_costs">
              <label>物业费用：</label>
              <span>{{detail.property_costs}}</span>
            </li>
            <li v-if="detail.heating_type">
              <label>供暖方式：</label>
              <span>{{detail.heating_type}}</span>
            </li>
            <li v-if="detail.water_supply">
              <label>供<i class="space-2"></i>水：</label>
              <span>{{detail.water_supply}}</span>
            </li>
            <li v-if="detail.power_supply">
              <label>供<i class="space-2"></i>电：</label>
              <span>{{detail.power_supply}}</span>
            </li>
          </block>
        </ul>
        <p class="getMore" @click="getMore = !getMore">{{getMore?"上拉收起":'下拉展开更多'}}</p>
      </div>
      <div class="designImg_panl">
        <div class="itemImg_panl" v-for="(item,index) in detail.albums" :key="index">
          <div class="titles_panl">
            <span>{{item.name}}({{item.photos.length}})</span>
          </div>
          <div class="imgBox">
            <scroll-view :scroll-x="true" style="white-space: nowrap; display: flex;" >
              <a style="margin-right:13px" v-for="(tItem,tIndex) in item.photos" :key="tIndex" @click="handleGoPhoto(item.name,tIndex)">
                <img v-if="item.name=='视频'" :src="tItem.video_photo">
                <img v-else :src="tItem.photo">
              </a>
          </scroll-view>
          </div>
        </div>
      </div>
      <div class="brighDot_panl">
        <div class="brigDotBox">
          <div class="titles_panl">
            <span>楼盘亮点</span>
          </div>
          <div class="about_panl">
            <rich-text class="rich-text" :nodes="detail.intro"></rich-text>
          </div>
        </div>
        <div class="flootAbout">
          <ul>
            <li v-for="(item,index) in detail.strong_point" :key="index">
              <p class="titel_p">
                <img src="/static/images/icon-tag.png">
                <span>{{item.key}}</span>
              </p>
              <p class="about_p">{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="match_panl" id="test">
        <div class="title_marig">
          <div class="titles_panl">
            <span>周边配套</span>
          </div>
        </div>
        <div class="map_img" @click="goAroundMap(detail)">
          <img src="/static/images/mapImg.jpeg">
          <div class="dialog">
            {{detail.name}}
            <div class="triangle_border_down"></div>
          </div>
        </div>
        <div class="matchBox">
          <div class="macund" @click='tabMatchBox(1)'>
            <img src="/static/images/route.png">
            <div class="cen_text">
              <p>交通</p>
              <p>约{{searchMap['交通']}}处</p>
            </div>
          </div>
          <div class="macund" @click='tabMatchBox(2)'>
            <img src="/static/images/education.png">
            <div class="cen_text">
              <p>教育</p>
              <p>约{{searchMap['教育']}}处</p>
            </div>
          </div>
          <div class="macund" @click='tabMatchBox(3)'>
            <img src="/static/images/hospital.png">
            <div class="cen_text">
              <p>医疗</p>
              <p>约{{searchMap['医疗']}}处</p>
            </div>
          </div>
          <div class="macund" @click='tabMatchBox(4)'>
            <img src="/static/images/bank.png">
            <div class="cen_text">
              <p>银行</p>
              <p>约{{searchMap['银行']}}处</p>
            </div>
          </div>
          <div class="macund" @click='tabMatchBox(5)'>
            <img src="/static/images/foot.png">
            <div class="cen_text">
              <p>餐饮</p>
              <p>约{{searchMap['餐饮']}}处</p>
            </div>
          </div>
          <!-- <div class="macund">
            <img src="/static/images/bus.png">
            <div class="cen_text">
              <p>公交</p>
              <p>约{{searchMap['公交']}}处</p>
            </div>
          </div> -->
        </div>
        <div class="distancBox">
          <ul>
            <li :key="key" v-for="(mk, key) in mkitem">
              <p class="addr">{{mk.title}}</p>
              <p class="add_but">
                <img src="/static/images/icon-addr.png">
                <span>{{mk._distance}}m</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="affirm_panl">
          <p>免责声明：以上价格仅供参考，具体一房一价的信息以售楼处展示为准。本网显示房屋位置、交通、医疗、教育、商业等配套信息，均来源于第三方网络数据，不作为要约，仅供参考。双方具体权利义务应以法律规定及买卖合同约定为准。</p>
          <p>本平台对项目周边文化教育的介绍旨在提供相关信息，并不意味信息发布方对就学安排作出承诺。相关教育资源就学信息存在调整的可能，应以政府教育主管部门及办学方颁布的政策规定为准。</p>
        </div>
      </div>
    </div>
      <house-footer :detail='detail' @addCID='addCID' type='1'/>
      <van-popup  :show="showNoticeModal"  position="center" >
        <div class="notice-model">
          <div class="notice-model__main">
            <img @click="jumpByNoticeModal" class="notice-model__main-img" mode="widthFix" v-if="detail.alert_ad" :src="detail.alert_ad.photo" alt=""/>
          </div>
          <div class="notice-model__close" @click="showNoticeModal=false">
            <img class="notice-model__close-img" src='/static/images/icon-closed.png' />
          </div>
        </div>
      </van-popup>
      <getUserinfo v-if="showGetUserInfoModel"></getUserinfo>
  </div>
</template>
<script>

import { selectSubscribe, addSubscribe, postHousesDetail, POINTAlbums, POINTHouseClick, getContactList, getCustomerCall, getSubscribeTemplateId } from '../../http/api.js'
import houseFooter from '../../components/house-footer'
import tips from '../../components/tips'
import getUserinfo from '../../components/get-userinfo'
import { reLogin } from '../../http/request.js'
import {_requestSubscribeMessage} from '../../lib/_requestSubscribeMessage.js'
var QQMapWX = require('qqmap-wx-jssdk')
export default {
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.detail.share_title || '置业远洋欢迎您',
      path: 'pages/home-page/main?id=' + this.house_id
    }
  },
  components: {
    houseFooter,
    tips,
    getUserinfo
  },
  data () {
    return {
      subscribeMsg: null,
      isSubscribe: false,
      userInfo: wx.getStorageSync('userinfo'),
      showSwitchBtn: false,
      istype: 'isVideo',
      isSwDOtr: true,
      concatList: [],
      showGetUserInfoModel: false,
      showNoticeModal: false,
      house_id: '',
      show: false,
      detail: null,
      getMore: false,
      mks: {},
      overScrollFlag: false,
      scaleStyle: `scale(${1.78})`,
      timer: null,
      searchMAP: {
        '交通': '1',
        '教育': '2',
        '医疗': '3',
        '银行': '4',
        '餐饮': '5'
      },
      searchMap: {
        '交通': 0,
        '教育': 0,
        '医疗': 0,
        '银行': 0,
        '餐饮': 0
        // '公交': 0
      },
      mkitem: [],
      swipers: {
        indicatorDots: false,
        current: 0
        // swiper
      },
      banner_video: [],
      bannerlist: []
    }
  },
  onLoad: function (options) {
    if (options.q || options.scene) {
      const parmas = options.q || options.scene
      // 获取二维码的携带的链接信息
      this.house_id = decodeURIComponent(parmas)
    }
    this.swipers = {
      indicatorDots: false,
      current: 0
    }
    this.detail = null
    this.isSubscribe = false
  },
  onShow: function () {
    this.$data.isSwDOtr = true
  },
  onHide: function () {
    this.$data.isSwDOtr = true
  },
  onUnload: function () {
    this.$data.isSwDOtr = true
  },
  async mounted () {
    if (this.$route.query.id) {
      this.house_id = this.$route.query.id
    }
    const data = await postHousesDetail({
      house_id: this.house_id
    })
    wx.setNavigationBarTitle({title: data.name})
    try {
      if (data.project_id) {
        const concatList = await getContactList({projectID: data.project_id})
        this.concatList = concatList || []
      }
    } catch (error) {
      console.log(error)
    }
    this.showGetUserInfoModel = true
    this.detail = data
    this.detail.albums = Object.keys(data.albums).map(key => data.albums[key])
    this.detail.strong_point = JSON.parse(data.strong_point)
    this.detail.tags = data.tags ? data.tags.split('|') : []
    this.detail.browse_users.list = this.detail.browse_users.list.filter((e, i) => i < 6)
    this.detail.browse_users.list.push({
      'aid': '0',
      'mid': '0',
      'nickname': '0',
      'headimgurl': '/static/images/burs-avatar.png',
      'create_time': '0',
      'update_time': '0'
    })
    let alertAdCache = wx.getStorageSync(`alert_ad${this.house_id}`)
    let hasAlertAd = this.detail.alert_ad && this.detail.alert_ad.status === '1'
    // 合并头图轮播列表
    if (data.banner_video) {
      data.banner_video = data.banner_video.map((item, index) => ({ ...item, istype: 'isVideo' }))
    } else {
      data.banner_video = []
      this.istype = 'isImg'
    }
    this.banner_imges = [{
      'src': data.photo,
      'istype': 'isImg',
      'url': '/' // 跳转地址
    }]
    this.bannerlist = [...data.banner_video, ...this.banner_imges]
    console.log(this.bannerlist)
    // 是否显示头图选项按钮
    this.showSwitchBtn = (data.banner_video.length > 0) && (this.banner_imges.length > 0)
    this.videoContext = wx.createVideoContext('txv1')
    if (hasAlertAd) {
      if (this.detail.alert_ad.photo === alertAdCache) {
        this.showNoticeModal = false
      } else {
        this.showNoticeModal = true
      }
    } else {
      this.showNoticeModal = false
    }
    this.onSelectSubscribe()
    this.handleSearch()
    POINTHouseClick({
      cityId: this.detail.city_id,
      houseId: this.detail.id,
      type: 1
    })
    wx.checkSession({
      success () {},
      fail () {
        reLogin()
      }
    })
  },
  methods: {
    // 查询是否订阅
    async onSelectSubscribe () {
      const res = await getSubscribeTemplateId({house_id: this.house_id})
      console.log(res)
      this.subscribeMsg = res
      let tmplIds = this.subscribeMsg && this.subscribeMsg.template
      const data = await selectSubscribe({
        template_id: tmplIds,
        house_id: this.house_id
      })
      this.isSubscribe = true
      console.log(data)
    },
    onSubscribe () {
      let tmplIds = this.subscribeMsg && this.subscribeMsg.template
      let self = this
      _requestSubscribeMessage(tmplIds,
        async (res, isAllow) => {
          console.log(res);
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            let isSubscribe = Object.values(res).includes('accept') // 是否订阅
            if (isSubscribe) {
              await addSubscribe({
                template_id: tmplIds,
                house_id: self.house_id
              })
              self.isSubscribe = true
              wx.showToast({title: '订阅成功', icon: 'success', duration: 2000})
            } else {

            }
          }
        }, (err) => {
          console.log(err)
        }, (com) => {
          console.log(com)
        })
    },
    async getPhoneNumber (e, item) {
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        let { encryptedData, iv } = e.mp.detail
        getCustomerCall({
          userID: item.id,
          houseId: this.detail.id,
          project_id: this.detail.project_id,
          encryptedData,
          iv
        })
        wx.makePhoneCall({phoneNumber: item.mobile})
        // 授权成功
        // let { encryptedData, iv } = e.mp.detail
        // await postMobileSave({encryptedData, iv})/
      }
    },
    async getPhoneNumberToChat (e, item) {
      if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
        let { encryptedData, iv } = e.mp.detail
        getCustomerCall({
          userID: item.id,
          houseId: this.detail.id,
          project_id: this.detail.project_id,
          encryptedData,
          iv
        })
        let id = item.id
        let headPhoto = item.headPhoto ? encodeURIComponent(item.headPhoto) : ''
        let employeeName = item.employeeName || '客服'
        this.$router.push({ path: '/pages/pA/chat/main', query: {id, headPhoto, employeeName} })
      }
    },
    // 切换swiper
    handlSwTpye (e = 'isVideo') {
      this.$data.istype = e
      for (let i = 0; i < this.$data.bannerlist.length; i++) {
        if (this.$data.bannerlist[i].istype === e) {
          this.$data.swipers.current = i
          break
        }
      }
    },
    switchS (e = true) {
      this.$data.isSwDOtr = e
      if (e === false) {
        POINTAlbums({
          cityId: this.detail.city_id,
          houseId: this.detail.id,
          type: 7
        })
      }
    },
    changeSwiper (event) {
      let index = event.mp.detail.current || 0
      this.$data.swipers.current = index
      this.$data.istype = this.$data.bannerlist[index].istype
      // let videoContext = TxvContext.getTxvContext('txv1')
      console.log(this.videoContext)
      this.videoContext && this.videoContext.pause()
      this.$data.isSwDOtr = true
    },
    onCall (item) {
      getCustomerCall({
        userID: item.id,
        houseId: this.detail.id,
        project_id: this.detail.project_id
      })
      wx.makePhoneCall({phoneNumber: item.mobile})
    },
    goChat (item) {
      console.log(item)
      getCustomerCall({
        userID: item.id,
        houseId: this.detail.id,
        project_id: this.detail.project_id
      })
      let id = item.id
      let headPhoto = item.headPhoto ? encodeURIComponent(item.headPhoto) : ''
      let employeeName = item.employeeName || '客服'
      this.$router.push({ path: '/pages/pA/chat/main', query: {id, headPhoto, employeeName} })
    },
    onBanner () {
      // 楼盘详情加了 type 和url字段  type 1链接 4优惠券 5相册  , 跳优惠券和相册的时候 url是空的 用楼盘id
      if (this.detail.type === '4') {
        this.goCouponList()
      }
      if (this.detail.type === '5') {
        this.handleGoPhoto('样板间')
      }
      if (this.detail.type === '1') {
        this.$router.push({ path: '/pages/web-view/main', query: {src: this.detail.url, title: this.detail.url_title, photo: this.detail.url_photo} })
      }
    },
    // 优惠券弹窗跳转
    jumpByNoticeModal () {
      let alertAd = this.detail.alert_ad
      wx.setStorageSync(`alert_ad${this.house_id}`, alertAd.photo)
      // type =1是外链=2是楼盘=3是资讯=4是优惠券
      switch (alertAd.type) {
        case '1':
          const src = alertAd.url ? encodeURIComponent(alertAd.url) : ''
          const title = alertAd.name
          const photo = alertAd.photo ? encodeURIComponent(alertAd.photo) : ''
          this.$router.push({ path: '/pages/web-view/main', query: {src, title, photo, id: alertAd.id} })
          break
        case '2':
          this.$router.push({path: '/pages/home-page/main', query: { id: alertAd.url }})
          break
        case '3':
          this.$router.push({ path: '/pages/activity-detail/main', query: { id: alertAd.url } })
          break
        case '4':
          alertAd.city_name = this.detail.city_name
          this.$router.push({ path: '/pages/coupon-list/main', query: alertAd })
          break
        default:
      }
      this.showNoticeModal = false
    },
    goCouponList () {
      let query = {
        city_id: this.detail.city_id,
        house_id: this.detail.id,
        city_name: this.detail.city_name,
        house_name: this.detail.name,
        house_photo: this.detail.photo
      }
      this.$router.push({ path: '/pages/coupon-list/main', query: query })
    },
    handleGoAddress () {
      POINTHouseClick({
        cityId: this.detail.city_id,
        houseId: this.detail.id,
        type: 7
      })
      wx.openLocation({
        latitude: +this.detail.office_latitude,
        longitude: +this.detail.office_longitude,
        name: this.detail.office_address,
        // address: this.detail.office_address,
        scale: 18
      })
    },
    handleSearch () {
      // 实例化API核心类
      const qqmapsdk = new QQMapWX({
        key: 'NBMBZ-7E6C4-ERMUP-XGJTV-WFLDQ-S3FDK'
      })
      let copyMap = JSON.parse(JSON.stringify(this.searchMap))
      var mks = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
      }
      Object.keys(this.searchMAP).forEach((keyword, index) => {
        qqmapsdk.search({
          keyword, // 搜索关键词
          auto_extend: '1',
          page_size: 10,
          location: `${this.detail.latitude},${this.detail.longitude}`, // 设置周边搜索中心点
          success: (res) => { // 搜索成功后的回调
            copyMap[keyword] = res.count >= 25 ? 25 : res.count
            let key = this.searchMAP[keyword]
            if (!key) return
            for (var i = 0; i < res.data.length; i++) {
              mks[key].push({ // 获取返回结果，放到mks数组中
                title: res.data[i].title,
                id: res.data[i].id,
                latitude: res.data[i].location.lat,
                longitude: res.data[i].location.lng,
                iconPath: '/static/images/icon-c.png', // 图标路径
                width: 20,
                height: 20,
                _distance: res.data[i]._distance
              })
            }
          }
        })
      })
      this.searchMap = copyMap
      this.mks = mks
      this.mkitem = mks[1]
    },
    tabMatchBox (active) {
      this.mkitem = this.mks[active]
    },
    handleGo () {
      POINTHouseClick({
        cityId: this.detail.city_id,
        houseId: this.detail.id,
        type: 6
      })
      this.$router.push({path: '/pages/calculator/main'})
    },
    goDoorList (id) {
      POINTHouseClick({
        cityId: this.detail.city_id,
        houseId: this.detail.id,
        type: 8
      })
      this.$router.push({path: '/pages/door-list/main', query: {id}})
    },
    goHousesDetail (item) {
      this.$router.push({path: '/pages/door-details/main', query: {id: item.id}})
    },
    goAroundMap (detail) {
      const query = { ...detail, ...this.searchMap }
      this.$router.push({path: '/pages/packMap/around-map/main', query: query})
    },
    handleGoPhoto (name, current = 0) {
      const tyepMap = {
        样板间: 1,
        实景图: 2,
        效果图: 3,
        周边配套: 4,
        户型图: 5,
        规划图: 6,
        视频: 7
      }
      POINTAlbums({
        cityId: this.detail.city_id,
        houseId: this.detail.id,
        type: tyepMap[name]
      })
      const id = this.detail.id
      const cityName = this.detail.city_name
      this.$router.push({path: '/pages/estate-photo/main', query: {id, city_name: cityName, tabName: name, current}})
    },
    goActivityDetail (item) {
      if (item.url) {
        const src = encodeURIComponent(item.url)
        const photo = item.photo ? encodeURIComponent(item.photo) : ''
        this.$router.push({ path: '/pages/web-view/main', query: {src, title: item.title, photo, id: item.id} })
      } else {
        this.$router.push({ path: '/pages/activity-detail/main', query: { id: item.id } })
      }
    },
    goWatchList (id) {
      this.$router.push({ path: '/pages/watch-list/main', query: { id } })
    },
    addCID (cid) {
      this.detail.cid = cid
    }
  }
}
</script>
<style>
  .swDots{
  position:absolute;
  right:0;
  bottom:15px;
  width:80%;
  z-index:100;
}
.swCurr{
   position:absolute;
  bottom:15px;
  z-index:100;
  right:10px;
}
.swCurr span{
  font-size: 12px;
  color: #2E2E2E;
  display: inline-block;
  border-radius:10px;
  padding:5px 10px;
  background:rgba(255,255,255,0.7);
}
.swDots ul{
    display:inline-block;
    margin :0 23%;
    border-radius:10px; 
    background:rgba(255,255,255,0.7);
    border-radius:9px;
    }
.swDots ul li{
  display: inline-block;
  padding:5px 10px;
  border-radius:10px; 
  font-size: 12px;
  color: #2E2E2E;
}
.swDots ul li.activeSW{
  color: #fff;
  background-color: #E60113;
}
#myVideo{
  width:100% !important;
  height:200px !important;
}
</style>
<style style lang="stylus" rel="stylesheet/stylus">
.container {
  .van-popup {
    background: transparent!important;
  }
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';
// .swDots{
//   position:absolute;
//   left:0;
//   bottom:0;
//   width :100%;
//   background-color #d8d8d8;
//   z-index:100;
//   ul{
//     display:flex;
//     margin :auto 0;
//   }
// }
button::after {
  border none ;

}
.btn-cover {
  position absolute;
  top 0;
  left 0;
  right 0;
  bottom 0;
  opacity 0;
}
.coupon_photo {
  width: 100%;
  height: 120px;
  border-bottom: 4px solid #fefefe;
}

.coupon_photo img {
  display: block;
  width: 100%;
  height: 100%;
}

.container {
  background: #f2f2f2;
  padding-bottom: 50px;
  height:auto;
}

.panl_swiper {
  width: 100%;
  height: 200px;
  position: fixed;
  top:0;
  left: 0;
  overflow hidden

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.sroll_container {
  margin-top: 200px;
  position: relative;
  z-index: 1;
  background-color: #f0f0f0;
}

.delta_panl {
  background-color: #ffffff;
  overflow: hidden;

  .label_panl {
    padding: 10px 20px 6px 20px;
    display: flex;
    flex-wrap: wrap;

    .label_name {
      display: flex;
      padding: 3px;
      border: 0.5px solid #E60113;
      border-radius: 3px;
      margin-right: 6px;
      margin-bottom: 6px;
      padding: 4px;
      color: #373737
      align-items center

      img {
        width: 10px;
        height: 10px;
        margin-right: 3px;
      }

      span {
        font-size: 10px;
      }
    }
  }

  .adder_panl {
    display flex;
    align-items center;
    padding: 0 20px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #9FA0A0;

    img {
      width: 13px;
      height: 13px;
      margin-right: 5px;
    }
  }

  .sales_panl {
    padding: 0 20px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height 1.5;
    color: #3F3B3A;
    position: relative

    img {
      width: 11px;
      height: 14px;
      position absolute
      top:2px
      right:20px
    }

    .adder_panl_add {
      overflow: hidden
      text-overflow:ellipsis
      white-space: nowrap
      width: 98%
      display:block
    }
  }
}

.price_panl {
  background-color: #ffffff;
  border-bottom: 1px solid #D8D8D8;
  border-top: 1px solid #D8D8D8;
  padding: 10px 0;
  display: flex;

  .price_name {
    width: 33.3%;
    border-right: 1px solid #d8d8d8;

    p {
      text-align: center;
      font-size: 12px;
      color: #686564 ;

      span {
        color: #E60113;
      }
    }

    p:last-child {
      margin-top: 6px;
      color:#000
    }
  }

  .price_name:last-child {
    border-right: 0;
  }
}

.onlookers_panl {
  padding: 0 20px;
  background-color: #ffffff;
  overflow: hidden;

  .looks_panl {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0 0;

    .left_panl {
      p.num {
        font-size: 20px;
        color: #3F3B3A;
        margin-bottom: 6px;
      }

      p.title {
        font-size: 14px;
        color: #9FA0A0;
      }
    }

    .right_panl {
      display: flex;
      flex: 1;
      margin-left: 38px;
      position: relative;

      .imgall {
        width: 44px;
        height: 44px;
        border-radius: 100%;
        overflow: hidden;
        position: absolute;
        // background:#d8d8d8;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .copent_panl {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F0F0F0;
    width: 100%;
    line-height: 38px;
    border-radius: 6px;
    margin-bottom: 10px;
    margin-top: 20px

    img {
      width: 17px;
      height: 22px;
      margin-right: 14px;
    }

    span {
      font-size: 14px;
      color: #686564;
    }
  }
}

.estate_news_panl {
  background-color: #ffffff;
  margin: 10px 0;
  overflow: hidden;
  padding: 15px 0 15px 20px;

  .estate_title {
    border-left: 2px solid #FF2B2B;
    padding-left: 10px;

    span {
      font-size: 18px;
      color: #3F3B3A;
    }
  }

  .estate_panl {
    margin-top: 14px;

    .scroll-view_H {
      // display: flex;
      // white-space: nowrap;

      .scroll_item {
        display: inline-block;
        width: 144px;
        height: 90px;
        border: 1px solid #979797;
        border-radius: 6px;
        position: relative;
        margin-right: 10px;
        overflow: hidden;
        padding: 7px;
        vertical-align:middle;

        .text_panl {
          no-wrap-more(3);
          font-size: 12px;
          color: #3F3B3A;
          margin-top: 18px;
          line-height: 18px;
          white-space: normal;
        }

        .deta_panl {
          text-align: right;
          font-size: 14px;
          color: #9A9A9A;
          margin-top: 6px;
          position: absolute
          bottom :7px
          right:7px
        }
      }
    }
  }

  .estate_foot{
    margin-top 13px;
    text-align left 
    width: 668rpx;
    box-sizing border-box

    .subscribe-btn{
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:38px;
      text-align:center;
      width:334px;
      height:38px;
      background:rgba(230,1,19,1);
      border-radius:6px;
      border none;
      outline none;
      display block;
      

      .subscribe-btn button::after{
        border none
      }
    }
    .disable-btn {
      background-color: #f0f0f0;
      color :#333
    }
  }
}
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
    right: -39rpx;
    top: 0;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #E60113;
  }
}
.apartment_panl {
  background-color: #ffffff;
  // padding: 15px 20px;
  padding: 14px 20px 0 20px;
  margin-top 20rpx;

  .apar_title {
    display: flex;
    justify-content: space-between;
    color: #3F3B3A;
    margin-bottom: 12px;

    span {
      font-size: 18px;
    }

    a {
      font-size: 14px;
      color: #3F3B3A;
    }
  }

  .apar_panl {
    padding: 20px 0 30px 0;
    display: flex;
    justify-content: space-between;

    .apar_left {
      width: 168px;
      height: 127px;
      margin-right: 15px;
      border: 1px solid #eee;
      position:relative;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .apar_right {
      flex: 1;

      .titel {
        font-size: 16px;
        color: #595757;

        img {
          width: 17px;
          height: 17px;
          margin-right: 8px;
        }
      }

      .apar_details {
        margin-top: 17px;

        li {
          font-size: 12px;
          color: #999999;
          margin-bottom: 8px;

          label {
            font-size: 12px;
            color: #595757;
          }

          span {
            color: #E60113;
          }
        }
      }
    }
  }
}

.estateDetails_panl {
  margin-top: 10px;
  padding: 14px 20px 0 20px;
  background-color: #ffffff;

  .floor_details {
    margin-top: 12px;

    li {
      font-size: 14px;
      color: #000000;
      line-height: 20px;

      label {
        color: #9FA0A0;
      }
    }
  }

  .getMore {
    color: #9FA0A0;
    font-size: 14px;
    text-align: center;
    padding: 15px 0;
  }
}

.titles_panl {
  overflow: hidden;

  span {
    border-left: 2px solid #FF2B2B;
    color: #3F3B3A;
    font-size: 18px;
    padding-left: 10px;
  }
}

.designImg_panl {
  margin-top: 10px;
  padding: 14px 20px 14px 20px;
  background-color: #ffffff;

  .imgBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top 15px;
    padding-bottom 15px;

    a {
      width: 160px;
      height: 120px;
      display: inline-block;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.brighDot_panl {
  background-color: #ffffff;
  margin-top: 10px;

  .brigDotBox {
    padding: 12px 20px 12px 20px;

    .about_panl {
      margin-top: 10px;

      p {
        font-size: 12px;
        color: #5C5A5A;
        line-height: 17px;
      }
    }
  }

  .flootAbout {
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      li {
        display: inline-block;
        width: 50%;
        padding-left: 20px;
        box-sizing: border-box;
        margin-bottom: 15px;

        .titel_p {
          display: flex;

          img {
            width: 18px;
            height: 18px;
            margin-right: 8px;
          }

          span {
            font-size: 18px;
          }
        }

        .about_p {
          font-size: 12px;
          color: #545150;
          margin-top: 10px;
        }
      }
    }
  }
}
.chat_panl{
  background-color: #ffffff;
  margin-top: 10px;

  .title_marig {
    padding: 20px;
  }
  .chat_main_item {
    display:flex ;
    justify-content space-between;
    width 100%;
    height 80px;
    box-sizing:border-box;
    padding 0 14px 0 20px;

    .chat_left {
      display:flex ;
      align-items center;
      justify-content flex-start;
      // width 110px;
      img {
        display block;
        height 50px;
        width 50px;
        border-radius 50%;
        margin-right 11px;
      }
      .chat_name {
        font-size:14px;
        font-weight:bold;
        color:rgba(89,87,87,1);
        margin-right 10px
      }
      .chat_tag {
        font-size:12px;
        font-weight:bold;
        color:rgba(159,160,160,1);
        margin-right 4px;
      }
    }
    .chat_right {
      display:flex ;
      align-items center;
      justify-content center;
      img {
        display block;
        height 28px;
        width 28px;
        margin 0 6px;
        // background #d8d8d8
      }

    }
  }

}
.match_panl {
  background-color: #ffffff;
  margin-top: 10px;

  .title_marig {
    padding: 20px;
  }

  .map_img {
    width: 100%;
    height: 150px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .dialog {
    position:absolute
    top 13%;
    left 50%;
    transform translateX(-20%);
    background-color #fff;
    padding: 10px;
    border-radius 5px;
    font-size: 12px;
  }
  .triangle_border_down{
    width:0;
    height:0;
    border-width:6px 6px 0;
    border-style:solid;
    border-color:#fff transparent transparent;/*灰 透明 透明 */
    position:absolute;
    bottom: -6px;
    left: 50%;
    margin-left: -3px;
  }

  .matchBox {
    display: flex;
    padding: 10px 20px;

    .macund {
      display: flex;
      flex-direction: column;
      width: 20%;
      // width: 17%;
      text-align: center;
      align-items: center;
      justify-content: center;

      img {
        width: 26px;
        height: 26px;
      }

      div {
        margin-top: 8px;
        font-size: 12px;
        color: #5C5A5A;
        line-height: 18px;
      }
    }
  }

  .distancBox {
    padding: 20px 20px 0 20px;

    ul {
      li {
        display: flex;
        margin-bottom: 7px;

        p.addr {
          width: 254px;
          line-height: 20px;
          font-size: 14px;
          color: #5C5A5A;
          no-wrap();
        }

        p.add_but {
          display: flex;
          flex: 1;
          font-size: 14px;
          color: #5C5A5A;

          img {
            width: 14px;
            height: 16px;
            margin-right: 6px;
          }
        }
      }
    }
  }

  .affirm_panl {
    padding: 14px 20px;

    p {
      font-size: 12px;
      color: #5C5A5A;
      line-height: 18px;
    }

    p:first-child {
      margin-bottom: 20px;
    }
  }
}
.rich-text {
  font-size: 12px !important;
  line-height 1.5 !important;
  font-size 12px !important;
}

.space-2 {
  display inline-block
  width 54rpx
}
.space-1 {
  display inline-block
  width 15rpx
}

.notice-model__close {
  width 20px
  height 20px
  margin 30px auto
  .notice-model__close-img {
    display block;
    width 20px
    height 20px
  }
}
.notice-model__main {
  .notice-model__main-img {
    margin 0 auto;
    width 320px;
    display block;
  }
}
</style>
