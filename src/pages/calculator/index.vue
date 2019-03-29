<template>
  <div class="container">
    <div class="nav">
      <div class="tab border">
        商业贷款
      </div>
      <div class="tab">
        公积金贷款
      </div>
      <div class="tab">
        组合贷款
      </div>
    </div>
    <div class="form">
      <div class="form-item">
        <span>按贷款金额计算</span>
        <span>按还款金额计算</span>
      </div>
      <div class="form-item">
        <span>借款金额(万)</span>
        <input class="ipt" placeholder="请输入" type="text">
      </div>
      <div class="form-item">
        <span>贷款期限</span>
        <span>20年(240期)</span>
      </div>
      <div class="form-item">
        <span>贷款年利率</span>
        <span>基准利率(4.9%)</span>
      </div>
      <div class="form-item btn-container">
        <div class="btn-left btn">
          清空重填
        </div>
        <div class="btn-right btn">
          开始计算
        </div>
      </div>
      <div class="tip">
        计算结果仅供参考
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .container
    background-color #fff
  .nav
    display flex
    justify-content space-between
    padding 0 35px
    border-bottom 1px solid #D8D8D8
  .tab
    height 42px
    display flex
    align-items center
    font-size 14px
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
</style>
