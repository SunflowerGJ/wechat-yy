<template>
  <div class="container">
    <div class="nav">
      <div :class="['tab', {'border': tabType === '商业贷款'}]" @click="tabType='商业贷款'">
        商业贷款
      </div>
      <div :class="['tab', {'border': tabType === '公积金贷款'}]" @click="tabType='公积金贷款'">
        公积金贷款
      </div>
      <div :class="['tab', {'border': tabType === '组合贷款'}]" @click="tabType='组合贷款'">
        组合贷款
      </div>
    </div>
    <div class="form" v-if="tabType === '商业贷款' || tabType === '组合贷款'">
      <picker :value="query.type" :range="types" @change="bindPickerChange('type', $event, 'query')">
        <div class="form-item">
          <span>商贷按贷款金额计算</span>
          <span>{{types[query.type]}}</span>
        </div>
      </picker>
      <div class="form-item">
        <span>商贷借款金额(万)</span>
        <input v-model="query.dkTotal" class="ipt" placeholder="请输入" type="digit">
      </div>
      <picker :value="query.dkm" :range="dates" @change="bindPickerChange('dkm', $event, 'query')">
        <div class="form-item">
          <span>商贷贷款期限</span>
          <span> {{dates[query.dkm]}}</span>
        </div>
      </picker>
      <picker :value="query.dknl" :range="rates" @change="bindPickerChange('dknl', $event, 'query')">
        <div class="form-item">
          <span>
            商贷基准利率
          </span>
          <span>
            {{rates[query.dknl]}}
          </span>
        </div>
      </picker>
      <div class="form-item">
        <span>自定义利率</span>
        <input v-model="query.dknl_custom" class="ipt" placeholder="请输入" type="digit">
      </div>
    </div>
    <div :class="['form', {'gjzContainer': tabType === '组合贷款'}]" v-if="tabType === '公积金贷款' || tabType === '组合贷款'">
      <picker :value="gjzQuery.type2" :range="types" @change="bindPickerChange('type2', $event, 'gjzQuery')">
        <div class="form-item">
          <span>公积金按贷款金额计算</span>
          <span>{{types[gjzQuery.type2]}}</span>
        </div>
      </picker>
      <div class="form-item">
        <span>公积金借款金额(万)</span>
        <input v-model="gjzQuery.dkTotal2" class="ipt" placeholder="请输入" type="digit">
      </div>
      <picker :value="gjzQuery.dkm2" :range="dates" @change="bindPickerChange('dkm2', $event, 'gjzQuery')">
        <div class="form-item">
          <span>公积金贷款期限</span>
          <span> {{dates[gjzQuery.dkm2]}}</span>
        </div>
      </picker>
      <picker :value="gjzQuery.dknl2" :range="gjzRates" @change="bindPickerChange('dknl2', $event, 'gjzQuery')">
        <div class="form-item">
          <span>
            公积金基准利率
          </span>
          <span>
            {{gjzRates[gjzQuery.dknl2]}}
          </span>
        </div>
      </picker>
      <div class="form-item">
        <span>自定义利率</span>
        <input v-model="query.dknl2_custom" class="ipt" placeholder="请输入" type="digit">
      </div>
    </div>
    <div class="form-item btn-container">
      <div class="btn-left btn" @click="handleRest">
        清空重填
      </div>
      <div class="btn-right btn" @click="handleOk">
        开始计算
      </div>
    </div>
    <div class="tip">
      计算结果仅供参考
    </div>
  </div>
</template>

<script>
import { mortgageShow, mortgageShowTwo } from '../../http/api.js'
export default {

  data () {
    return {
      tabType: '商业贷款',
      rates: ['基准利率(4.9%)', '基准利率7折(3.43%)',
        '基准利率75折(3.675%)', '基准利率8折(3.92%)',
        '基准利率85折(4.17%)', '基准利率9折(4.41%)',
        '基准利率95折(4.655%)', '基准利率1.05倍(5.145%)',
        '基准利率1.1倍(5.39%)', '基准利率1.2倍(5.88%)',
        '基准利率1.3倍(6.37%)'],
      gjzRates: ['基准利率(3.25%)', '基准利率1.1倍(3.58%)', '基准利率1.2倍(3.9%)',
        '基准利率1.3倍(4.23%)' ],
      dates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(item => `${item}年(${item * 12}期)`),
      types: ['等额本息', '等额本金'],
      query: {
        type: 0,
        dkm: 29,
        dknl: 0,
        dkTotal: '',
        dknl_custom: ''
      },
      gjzQuery: {
        type2: 0,
        dkm2: 29,
        dknl2: 0,
        dkTotal2: '',
        dknl2_custom: ''
      }
    }
  },
  methods: {
    bindPickerChange (type, e, queryType) {
      let copyQuery = JSON.parse(JSON.stringify(this[queryType]))
      copyQuery[type] = e.mp.detail.value
      this[queryType] = copyQuery
    },
    handleRest () {
      this.query = {
        type: 0,
        dkm: 29,
        dknl: 2,
        dkTotal: '',
        dknl_custom: ''
      }
      this.gjzQuery = {
        type2: 0,
        dkm2: 29,
        dknl2: 0,
        dkTotal2: '',
        dknl2_custom: ''
      }
    },
    _resolveQuery () {
      let copyQuery = JSON.parse(JSON.stringify(this.query))
      const dknl = this.rates[copyQuery.dknl]
      copyQuery.type = +copyQuery.type + 1
      copyQuery.dkm = (+copyQuery.dkm + 1) * 12
      copyQuery.dknl = copyQuery.dknl_custom === ''
        ? (dknl.slice(dknl.indexOf('(') + 1, dknl.lastIndexOf('%'))) / 100
        : copyQuery.dknl_custom
      copyQuery.dkTotal = +copyQuery.dkTotal * 10000

      let copyGjzQuery = JSON.parse(JSON.stringify(this.gjzQuery))
      const gjzDknl = this.gjzRates[copyGjzQuery.dknl2]
      copyGjzQuery.type2 = +copyGjzQuery.type2 + 1
      copyGjzQuery.dkm2 = (+copyGjzQuery.dkm2 + 1) * 12
      copyGjzQuery.dknl2 = copyGjzQuery.dknl2_custom === ''
        ? (gjzDknl.slice(gjzDknl.indexOf('(') + 1, gjzDknl.lastIndexOf('%'))) / 100
        : copyGjzQuery.dknl2_custom
      copyGjzQuery.dkTotal2 = +copyGjzQuery.dkTotal2 * 10000

      return {
        copyQuery,
        copyGjzQuery
      }
    },
    async handleOk () {
      const { tabType } = this
      const copyData = this._resolveQuery()
      let parmas = {}
      let res = null
      if (tabType === '商业贷款') {
        parmas = copyData.copyQuery
        if (this._check(!parmas.dkTotal, '请输入商业贷款')) return
        res = await mortgageShow(parmas)
      } else if (tabType === '公积金贷款') {
        parmas = copyData.copyGjzQuery
        if (this._check(!parmas.dkTotal2, '请输入公积金贷款')) return
        res = await mortgageShow({
          type: parmas.type2,
          dkm: parmas.dkm2,
          dknl: parmas.dknl2,
          dkTotal: parmas.dkTotal2
        })
      } else if (tabType === '组合贷款') {
        parmas = {...copyData.copyQuery, ...copyData.copyGjzQuery}
        if (this._check((!parmas.dkTotal || !parmas.dkTotal2), '请输入组合贷款')) return
        res = await mortgageShowTwo(parmas)
      }
      parmas.tabType = tabType
      if (res) {
        this.$router.push({path: '/pages/calculator-result/main', query: parmas})
      }
    },
    _check (check, msg) {
      if (check) {
        wx.showToast({
          title: msg,
          icon: 'success',
          duration: 2000
        })
        return true
      }
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nav
    display flex
    justify-content space-between
    padding 0 35px
    border-bottom 1px solid #D8D8D8
    background-color #fff
  .tab
    height 42px
    display flex
    align-items center
    font-size 14px
  .form
    background-color #fff
  .form-item
    display flex
    height 50px
    align-items center
    justify-content space-between
    font-size 16px
    padding 0 20px
    border-bottom 1px solid #d8d8d8
  .ipt
    width 50px
  .btn
    width 160px
    height 44px
    display flex
    align-items center
    border-radius 5px
    justify-content center
  .btn-left
    font-size 18px
    border 1px solid #979797
  .btn-right
    font-size 18px
    color #fff
    background-color #E60113
  .tip
    padding 14px 0 24px 20px
    color #9FA0A0
    font-size 14px
  .border
    color #E60114
    border-bottom 1px solid #E60114
  .btn-container
    padding-top 70px
    border-bottom 0
    background-color #fff
  .tip
    background-color #fff    
  .picker
    width 100%
    display flex
    justify-content space-between
  .gjzContainer
    border-top 1px solid #D8D8D8
    margin-top 30px
</style>
