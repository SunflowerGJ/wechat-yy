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
      <div>
        <canvas canvas-id="areaCanvas" class="canvas" @touchstart="handleTouch"></canvas>
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
        dataLabel: false
      })
    },
    handleTouch (e) {
      console.log(this.charts.getCurrentDataIndex(e))
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
</style>
