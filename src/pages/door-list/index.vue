<template>
  <div class="container">
    <div class="apartment_panl">
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
  </div>
</template>

<script>

export default {

  data () {
    return {
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
  .apartment_panl
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
      padding 20px 20px 30px 20px
      display flex
      justify-content space-between
      margin-bottom 2px
      background-color #ffffff
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
  
</style>