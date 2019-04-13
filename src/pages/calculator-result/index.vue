<template>
  <div class="container">
    <div class="nav">
      <div class="tab border">
        等额本息
      </div>
      <div class="tab">
        等额本金
      </div>
    </div>
    <div class="chart">
      <div class="chart-title">
        等额本息：每月还款额固定，其中本金部分逐月递增，利息部分逐月递减
      </div>
      <canvas canvas-id="areaCanvas" class="canvas" @touchstart="handleTouch"></canvas>
    </div>
    <div class="info">
      <div class="info-item">
        <div class="item">
          <div class="title">贷款金额(元)</div>
          <div class="num">6000</div>
        </div>
        <div class="item">
          <div class="title">总利息(元)</div>
          <div class="num">300</div>
        </div>
      </div>
      <div class="info-item border-bottom">
        <div class="item">
          <div class="title">总还款(元)</div>
          <div class="num">98980</div>
        </div>
        <div class="item">
          <div class="title">每月还款(元)</div>
          <div class="num">39000</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="list-tilte border-bottom">还款数据明细</div>
    </div>
    <div class="table">
      <div class="th">
        <div class="td">期数</div>
        <div class="td">月供</div>
        <div class="td">月供本金</div>
        <div class="td">月供利息</div>
        <div class="td">剩余本金</div>
      </div>
      <div class="tr">
        <div class="td">1</div>
        <div class="td">3999.3</div>
        <div class="td">147.123</div>
        <div class="td">245</div>
        <div class="td">1299</div>
      </div>
      <div class="tr">
        <div class="td">1</div>
        <div class="td">3999.3</div>
        <div class="td">147.123</div>
        <div class="td">245</div>
        <div class="td">1299</div>
      </div>
      <div class="tr">
        <div class="td">1</div>
        <div class="td">3999.3</div>
        <div class="td">147.123</div>
        <div class="td">245</div>
        <div class="td">1299</div>
      </div>
    </div>
  </div>
</template>

<script>
import WxCharts from '@/lib/wxcharts'
export default {

  data () {
    return {
      charts: null
    }
  },
  methods: {
    _initCharts () {
      this.charts = new WxCharts({
        canvasId: 'areaCanvas',
        type: 'ring',
        series: [{
          name: '成交量1',
          data: 15
        }, {
          name: '成交量2',
          data: 35
        }, {
          name: '成交量3',
          data: 78
        }, {
          name: '成交量4',
          data: 63
        }],
        width: 320,
        height: 200,
        dataLabel: true
      })
    },
    handleTouch (e) {
      this.charts.showToolTip(e)
    }
  },

  mounted () {
    this._initCharts()
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .container
    background-color #fff
  .nav
    display flex
    justify-content space-between
    padding 0 52px
    border-bottom 1px solid #D8D8D8
  .tab
    height 42px
    display flex
    align-items center
    font-size 14px
  .chart
    padding 16.2px
  .chart-title
    font-size 14px
    color #9FA0A0
    line-height 20px
  .border
    color #E60114
    border-bottom 1px solid #E60114
  .canvas
    width 100%
    height 200px
  .info
    padding 25px 0
  .info-item
    display flex
    border-top 1px solid #D8D8D8
    padding 8px 40px
  .border-bottom
    border-bottom 1px solid #D8D8D8    
  .item
    flex 1
  .title
    font-size 16px
    color #9FA0A0
  .num
    padding-top 8px
    font-size 20px
  .list-tilte
    padding 10px 20px
    font-size 16px
  .table
    padding 10px
    font-size 14px
  .th, .tr
    display flex
  .td
    flex  1
    text-align center
    padding-bottom 10px
</style>
