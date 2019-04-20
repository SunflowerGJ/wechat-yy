<template>
  <div class="container">
    <div class="panl_swiper">
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        class="swiper"
      >
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image mode="aspectFit" :src="item" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="delta_panl">
      <div class="label_panl">
        <div class="label_name">
          <img src="/static/images/icon-tag.png">
          <span>紧邻八大处公园地铁站</span>
        </div>
        <div class="label_name">
          <img src="/static/images/icon-tag.png">
          <span>八大处公园</span>
        </div>
        <div class="label_name">
          <img src="/static/images/icon-tag.png">
          <span>地铁规划中</span>
        </div>
      </div>
      <div class="adder_panl">
        <img src="/static/images/icon-lou.png">
        <span>项目地址：北京市石景山八大处公园西南800米</span>
      </div>
      <div class="sales_panl">
        <span>售楼处地址：北京市石景山五里坨黑石头路前行1500米</span><img src="/static/images/icon-addr.png">
      </div>
    </div>
    <div class="price_panl">
      <div class="price_name">
        <p>约<span>700万元</span>/套</p>
        <p>参考总价</p>
      </div>
      <div class="price_name">
        <p>95000元/m²</p>
        <p>参考均价</p>
      </div>
      <div class="price_name">
        <p>住宅</p>
        <p>物业类型</p>
      </div>

    </div>
    <div class="onlookers_panl">
        <div class="looks_panl">
          <div class="left_panl">
              <p class="num">5014</p>
              <p class="title">围观人数</p>
          </div>
          <div class="right_panl">
              <div class="imgall" v-for="(item,index)  in imgUrls" :key="index" :style="{zIndex:index, 
          left:(index*30)+'px'}">
                <img :src="item">
              </div>
          </div>
        </div>
        <div class="copent_panl">
            <img src="/static/images/cpument.png">
            <span>房贷计算器</span>
        </div>
    </div>
    <div class="estate_news_panl">
        <div class="estate_title">
          <span>楼盘动态</span>
        </div>
        <div class="estate_panl">
          <scroll-view class="scroll-view_H" scroll-x="true" style="width: 100%">
            <div class="swiper-item scroll_item">
              <div class='item-main_tag'>
                <i></i>
                <div class='lawyerType-bgImg'></div>
                <span>置顶</span>
              </div>
              <p class="text_panl">地铁6号线西延段开通，西延工程西起石景山区金安桥站地铁6号线西延段开通，西延工程西起石景山区金安桥站。。。</p>
              <p class="deta_panl">3-12</p>
            </div>
           <div class="swiper-item scroll_item">
              <div class='item-main_tag'>
                <i></i>
                <div class='lawyerType-bgImg'></div>
                <span>置顶</span>
              </div>
              <p class="text_panl">地铁6号线西延段开通，西延工程西起石景山区金安桥站地铁6号线西延段开通，西延工程西起石景山区金安桥站。。。</p>
              <p class="deta_panl">3-12</p>
            </div>
          <div class="swiper-item scroll_item">
              <div class='item-main_tag'>
                <i></i>
                <div class='lawyerType-bgImg'></div>
                <span>置顶</span>
              </div>
              <p class="text_panl">地铁6号线西延段开通，西延工程西起石景山区金安桥站地铁6号线西延段开通，西延工程西起石景山区金安桥站。。。</p>
              <p class="deta_panl">3-12</p>
            </div>
            <div class="swiper-item scroll_item">
              <div class='item-main_tag'>
                <i></i>
                <div class='lawyerType-bgImg'></div>
                <span>置顶</span>
              </div>
              <p class="text_panl">地铁6号线西延段开通，西延工程西起石景山区金安桥站地铁6号线西延段开通，西延工程西起石景山区金安桥站。。。</p>
              <p class="deta_panl">3-12</p>
            </div>
          </scroll-view>
        </div>
    </div>
    <div class="apartment_panl">
      <div class="apar_title">
        <span>户型介绍</span>
        <a>更多户型 ></a>
      </div>
      <div class="apar_panl">
            <div class="apar_left">
              <img mode="aspectFit" src="/static/images/storey.png"/>
            </div>
            <div class="apar_right">
                <p class="titel">
                  <img src="/static/images/storey.png" />
                  <span>4室2厅3卫</span>
                </p>
                <ul class="apar_details">
                  <li><label>【 建    面 】</label>90m²</li>
                  <li><label>【 朝    向 】</label>南北</li>
                  <li><label>【 总    价 】</label>约<span>300万元</span>/套</li>
                  <li><label>【 单    价 】</label>95000元/m²</li>
                </ul>
            </div>
      </div>
       <div class="apar_panl">
            <div class="apar_left">
              <img mode="aspectFit" src="/static/images/storey.png"/>
            </div>
            <div class="apar_right">
                <p class="titel">
                  <img src="/static/images/storey.png" />
                  <span>4室2厅3卫</span>
                </p>
                <ul class="apar_details">
                  <li><label>【 建    面 】</label>90m²</li>
                  <li><label>【 朝    向 】</label>南北</li>
                  <li><label>【 总    价 】</label>约<span>300万元</span>/套</li>
                  <li><label>【 单    价 】</label>95000元/m²</li>
                </ul>
            </div>
      </div>
    </div>
    <div class="estateDetails_panl">
        <div class="titles_panl">
          <span>楼盘详情</span>
        </div>
        <ul class="floor_details">
          <li>
            <label>售楼地址：</label><span>石景山五里坨黑石头路前行500米</span>
          </li>
          <li>
            <label>楼盘别名：</label><span>远洋五里雅苑</span>
          </li>
          <li>
            <label>参考均价：</label><span>52024/m²</span>
          </li>
          <li>
            <label>参考总价：</label><span>420万/套起</span>
          </li>
          <li>
            <label>物业类型：</label><span>住宅</span>
          </li>
          <li>
            <label>建筑类型：</label><span>板楼</span>
          </li>
          <li>
            <label>装修标准：</label><span>精装修</span>
          </li>
          <li>
            <label>产权年限：</label><span>70年</span>
          </li>
          <li>
            <label>最新开盘：</label><span>2018-10-01</span>
          </li>
        </ul>
        <p class="getMore">下拉展开更多</p>
    </div>
    <div class="designImg_panl">
        <div class="itemImg_panl">
            <div class="titles_panl">
              <span>样板间(2)</span>
            </div>
            <div class="imgBox">
                <a><img src="/static/images/personal-bg.png"></a>
                <a><img src="/static/images/personal-bg.png"></a>
            </div>
        </div>
        <div class="itemImg_panl">
            <div class="titles_panl">
              <span>园林实景图(5)</span>
            </div>
            <div class="imgBox">
                <a><img src="/static/images/personal-bg.png"></a>
                <a><img src="/static/images/personal-bg.png"></a>
            </div>
        </div>
        <div class="itemImg_panl">
            <div class="titles_panl">
              <span>效果图(3)</span>
            </div>
            <div class="imgBox">
                <a><img src="/static/images/personal-bg.png"></a>
                <a><img src="/static/images/personal-bg.png"></a>
            </div>
        </div>
    </div>
    <div class="brighDot_panl">
      <div class="brigDotBox">
        <div class="titles_panl">
          <span>楼盘亮点</span>
        </div>
        <div class="about_panl">
          <p>远洋·五里春秋西至黑石头路，南至规划中的五里坨五街，东至规划中的五里坨八号路，北至规划中的五里坨四街。项目北侧背靠西山，同时规划有9.5万㎡的商业办公用地，西侧为军区用地，东侧同样 西山山脉，环境优美，上风上水。每天清晨醒来，无论是沿小区周边慢跑，还是登山健步，既可以达到吸收新鲜空气健身的目的，也是一天好心情的开始。</p>
          <p>五里春秋，是远洋集团继天著春秋后在石景山的又一艺术力作。延续"春秋系"的别墅标准精心打造，分为叠拼和洋房两种产品，让您生活处处充满艺术气息。项目总占地面积约10万㎡，总地上建筑面积约14万㎡，容积率仅为1.3-1.6，绿化率30%，是目前市场上少有的低密住宅小区。项目邀请多位国际设计师参与、台湾刘荣禄、美籍华人联合日本设计师本间贵史定制强大收纳空间样板间，全体系收纳设计，在合理利用空间中找到生活的幸福感。</p>
        </div>
      </div>
      <div class="flootAbout">
        <ul>
          <li>
            <p class="titel_p">
              <img src="/static/images/icon-tag.png">
              <span>地理位置</span>
            </p>
            <p class="about_p">
              西山脚下临近八大处
            </p>
          </li>
          <li>
            <p class="titel_p">
              <img src="/static/images/icon-tag.png">
              <span>地理位置</span>
            </p>
            <p class="about_p">
              西山脚下临近八大处
            </p>
          </li>
          <li>
            <p class="titel_p">
              <img src="/static/images/icon-tag.png">
              <span>地理位置</span>
            </p>
            <p class="about_p">
              西山脚下临近八大处
            </p>
          </li>
          <li>
            <p class="titel_p">
              <img src="/static/images/icon-tag.png">
              <span>地理位置</span>
            </p>
            <p class="about_p">
              西山脚下临近八大处
            </p>
          </li>

        </ul>
      </div>
    </div>
    <div class="match_panl">
      <div class="title_marig">
        <div class="titles_panl">
          <span>周边配套</span>
        </div>
      </div>
      <div class="map_img">
        <img src="/static/images/mapImg.png">
      </div>
      <div class="matchBox">
        <div class="macund">
           <img src="/static/images/route.png">
          <div class="cen_text">
              <p>公交路线</p>
              <p>约10处</p>
          </div>
        </div>
        <div class="macund">
           <img src="/static/images/education.png">
          <div class="cen_text">
              <p>教育机构</p>
              <p>约10处</p>
          </div>
        </div>
        <div class="macund">
           <img src="/static/images/hospital.png">
          <div class="cen_text">
              <p>医院设施</p>
              <p>约10处</p>
          </div>
        </div>
        <div class="macund">
           <img src="/static/images/bank.png">
          <div class="cen_text">
              <p>银行网点</p>
              <p>约10处</p>
          </div>
        </div>
        <div class="macund">
           <img src="/static/images/foot.png">
          <div class="cen_text">
              <p>餐饮商户</p>
              <p>约10处</p>
          </div>
        </div>
        <div class="macund">
           <img src="/static/images/bus.png">
          <div class="cen_text">
              <p>公交</p>
              <p>约10处</p>
          </div>
        </div>
        
      </div>

      <div class="distancBox">
        <ul>
          <li>
            <p class="addr">石景山区五里坨医院石景山区五里坨医院石景山区五里坨医院石景山区五里坨医院石景山区五里坨医院石景山区五里坨医院</p>
            <p class="add_but">
              <img src="/static/images/icon-addr.png">
              <span>619m</span>
            </p>
          </li>
           <li>
            <p class="addr">石景山区五里坨医院………………………….</p>
            <p class="add_but">
              <img src="/static/images/icon-addr.png">
              <span>619m</span>
            </p>
          </li>
           <li>
            <p class="addr">石景山区五里坨医院………………………….</p>
            <p class="add_but">
              <img src="/static/images/icon-addr.png">
              <span>619m</span>
            </p>
          </li>
           <li>
            <p class="addr">石景山区五里坨医院………………………….</p>
            <p class="add_but">
              <img src="/static/images/icon-addr.png">
              <span>619m</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="affirm_panl">
        <p>免责声明：以上价格仅供参考，具体一房一价的信息以售楼处展示为准。本网显示房屋位置、交通、医疗、教育、商业等配套信息，均来源于第三方网络数据，不作为要约，仅供参考。双方具体权利义务应以法律规定及买卖合同约定为准。</p>
        <p>本平台对项目周边文化教育的介绍旨在提供相关信息，并不意味信息发布方对就学安排作出承诺。相关教育资源就学信息存在调整的可能，应以政府教育主管部门及办学方颁布的政策规定为准。</p>
      </div>
    </div>
    <div class="footer_fixed">
        <div class="fixed_left">
            <a>
              <img src="/static/images/forward.png">
              <span>转发分享</span>
            </a>
            <a>
              <img src="/static/images/fileback.png">
              <span>生成海报</span>
            </a>
            <a>
              <img class="collection" src="/static/images/collection.png">
              <span>收藏</span>
            </a>
        </div>
        <div class="fixed_right">
            <img src="/static/images/phone.png">
            <span>VIP热线</span>
        </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    }
  },
  mounted () {
    console.log(this.$route.query.id)
  },
  methods: {
    scrolltolower (e) {
      console.log(e)
      console.log('加载数据')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../stylus/mixin.styl"
  .container
    background #f2f2f2
    margin-bottom 50px
  .panl_swiper
    width 100%
    height 200px
    .swiper
      width 100%
      height 100%
      .slide-image
        width 100%
        height 100%
  .delta_panl
    background-color #ffffff
    overflow hidden
    .label_panl
      padding 10px 20px 6px 20px
      display  flex
      flex-wrap wrap 
      .label_name
        display flex
        padding 3px
        border 1px solid #E60113
        border-radius 3px
        margin-right 6px
        margin-bottom 6px
        padding 4px 
        img 
          width 9px
          height 9px
          margin-right 3px
        span 
          font-size 10px  
    .adder_panl
      padding 0 20px
      margin-bottom 10px
      font-size 12px
      color #9FA0A0
      img 
        width 13px
        height 13px
        margin-right 8px
    .sales_panl
      padding 0 20px
      margin-bottom 10px
      font-size 12px
      color #3F3B3A
      img
        width 11px
        height 14px
        margin-left 16px
        margin-bottom -2px
  .price_panl
    background-color #ffffff
    border-bottom 1px solid #D8D8D8
    border-top 1px solid #D8D8D8
    padding 10px 0
    display flex
    .price_name
      width 33.3%
      border-right 1px solid #d8d8d8
      p
        text-align center
        font-size 14px
        color #000000
        span 
          color #E60113
      p:last-child
        margin-top 6px   
    .price_name:last-child
      border-right 0 
  .onlookers_panl
    padding 0 20px
    background-color #ffffff
    overflow hidden
    .looks_panl
      display flex
      justify-content space-between
      margin 20px 0
      .left_panl
        p.num
          font-size 20px
          color #3F3B3A
          margin-bottom 6px
        p.title
          font-size 14px
          color #9FA0A0
      .right_panl
        display flex
        flex 1
        margin-left 38px
        position relative
        .imgall
          width 44px
          height 44px
          border-radius 100%
          overflow hidden
          position absolute
          img
            width 100%
            height 100%
    .copent_panl
      display flex
      justify-content center
      align-items center
      background-color #F0F0F0
      width 100%
      line-height 38px
      border-radius 6px
      margin-bottom 10px
      img 
        width 17px
        height 22px
        margin-right 14px
      span
        font-size 14px
        color #686564
  .estate_news_panl
    background-color #ffffff
    margin 10px 0
    overflow hidden
    padding 10px 0 14px 20px
    .estate_title
      border-left 2px solid #FF2B2B
      padding-left 10px
      span 
        font-size 18px
        color #3F3B3A
    .estate_panl
      margin-top 14px;
      .scroll-view_H
        display flex
        white-space nowrap
        .scroll_item
          display inline-block
          width 144px
          height 90px
          border 1px solid #979797
          border-radius 6px
          position relative 
          margin-right 10px
          overflow hidden
          padding 7px
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
              padding:0 10px;
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
              right: -20px;
              top: 0;
              width: 0; 
              height: 0;
              border-width: 10px;
              border-style: solid;
              border-color: transparent transparent transparent #E60113 ;
          .text_panl
            no-wrap-more(3)
            font-size: 12px;
            color: #3F3B3A;
            margin-top: 18px;
            line-height:18px;
            white-space:normal;
          .deta_panl
            text-align:right;
            font-size: 14px;
            color: #9A9A9A;
            margin-top 6px;
  .apartment_panl
    background-color #ffffff
    padding 15px 20px
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
      padding 20px 0 30px 0
      display flex
      justify-content space-between
      .apar_left
        width 168px
        height 127px
        margin-right 15px
        border 1px solid #eee
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
  .estateDetails_panl
    margin-top 10px
    padding 14px 20px 0 20px
    background-color #ffffff
    .floor_details
      margin-top 12px
      li
        font-size 14px
        color #000000
        line-height 20px
        label 
          color #9FA0A0
    .getMore
      color #9FA0A0 
      font-size 14px
      text-align center
      margin 10px 0 6px 0
  .titles_panl
    overflow hidden
    span
      border-left 2px solid #FF2B2B
      color #3F3B3A
      font-size 18px
      padding-left 10px
  .designImg_panl
    margin-top 10px
    padding 14px 20px 14px 20px
    background-color #ffffff
    .imgBox
      margin 14px 0 10px 0
      width 100%
      display  flex
      justify-content space-between
      a
        width 160px
        height 120px
        display inline-block
        img
          width 100%
          height 100%
  .brighDot_panl
    background-color #ffffff
    margin-top 10px
    .brigDotBox
      padding 12px 20px 12px 20px
      .about_panl
        margin-top 10px
        p
          font-size 12px
          color #5C5A5A
          line-height 17px
    .flootAbout
      ul
        width 100%
        display flex
        flex-wrap wrap
        li
          display inline-block
          width 50%
          padding-left 20px
          box-sizing border-box
          margin-bottom 15px
          .titel_p
            display flex
            img
              width 18px
              height 18px
              margin-right 12px
            span
              font-size 18px
          .about_p
            font-size 12px
            color #545150
            margin-top 10px
  .match_panl
    background-color #ffffff
    margin-top 10px
    .title_marig
      padding 20px
    .map_img
      width 100%
      height 150px
      img
        width 100%
        height 100%
    .matchBox
      display flex
      padding 10px 20px
      .macund
        display flex
        flex-direction column
        width 17%
        text-align center
        align-items center
        justify-content center
        img 
          width 26px
          height 26px
        div
          margin-top 8px
          font-size 12px
          color #5C5A5A
          line-height 18px
    .distancBox
      padding 20px 20px 0 20px
      ul
        li
          display flex
          margin-bottom 7px
          p.addr
            width 270px
            line-height 20px
            font-size 14px
            color #5C5A5A
            no-wrap()
          p.add_but
            display flex
            flex 1
            font-size 14px
            color #5C5A5A
            img
              width 14px
              height 16px 
              margin-right 6px
    .affirm_panl
      padding 14px 20px
      p
        font-size 12px
        color #5C5A5A
        line-height 18px
      p:first-child
        margin-bottom 20px
  .footer_fixed
    box-sizing border-box
    width 100%
    position fixed
    z-index 10
    left 0
    bottom 0
    background-color #ffffff
    padding 7px 12px
    display flex
    justify-content space-between
    .fixed_left
      width 200px
      display flex
      justify-content space-between
      a
        display flex
        flex-direction column
        text-align center
        justify-content center
        align-items center
        width 33%
        img
          width 13px
          height 15px
        img.collection
          width 17px
          height 15px
        span
          font-size 14px
          color #9FA0A0
          margin-top 2px
  .fixed_right
    flex 1
    font-size 14px
    line-height 30px
    background #E60113
    border-radius 6px
    text-align center
    color #ffffff
    img
      width 15px
      height 15px
      margin-right 10px
      margin-bottom -3px
</style>