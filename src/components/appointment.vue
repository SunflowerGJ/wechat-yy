<template>
  <div class="appo-cont">
    <div class="appo-cont__header">
      <div class="close" @click="onClose">
        <img class="close-img" src='/static/images/icon-closed.png' />
      </div>
      <div class="main-title">
        <div class="h2">预约看房</div>
        <div class="tips">留下您的联系方式，稍后将有专属顾问与您联系</div>
      </div>
    </div>
    <div class="appo-cont__main">
      <form class="form" bindsubmit="submit" report-submit="true">
        <view class="form-item">
            <text class="form-item__label">姓名</text>
            <input class="form-item__value" placeholder-class="place-holder" @input="changeName" name="name" :value="name"/>
        </view>
        <view class="form-item">
            <text class="form-item__label">+86</text>
            <div class="form-item__line"></div>
            <input class="form-item__value" type="number" placeholder-class="place-holder" @input="changePhone" placeholder="输入电话号码" name="phone" :value="phone"/>
        </view>
        <view class="form-item">
            <text class="form-item__label">选择日期</text>
            <picker class="picker" mode="date" :value="orderDate" start="2019-11-01" end="2025-09-01" @change="bindDateChange">
              <div class="form-item__value picker-con">
                {{orderDate}}
              </div>
            </picker>
        </view>
        <div class="form-foot">
            <div class="form-error">{{error}}</div>
            <button class="submit-button" form-type="submit" @click="submit">
                提交
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { sendSeeInfo } from '../http/api.js'
export default {
  props: ['cityId', 'houseId'],
  data () {
    return {
      orderDate: '',
      name: '',
      phone: '',
      error: ''
    }
  },
  methods: {
    // 选择时间
    bindDateChange (e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.orderDate = e.mp.detail.value
      if (this.error) this.error = ''
    },
    changeName (e) {
      this.name = e.mp.detail.value
      if (this.error) this.error = ''
    },
    changePhone (e) {
      this.phone = e.mp.detail.value
      if (this.error) this.error = ''
    },
    async submit (e) {
      if (!this.name) {
        this.error = '请填写姓名'
        return
      }
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.error = '请填写正确手机号码'
        return
      }
      if (!this.orderDate) {
        this.error = '请选择日期'
        return
      }
      console.log(this.orderDate, this.name, this.phone)
      let params = {
        seetime: this.orderDate,
        name: this.name,
        seemobile: this.phone,
        city_id: this.cityId,
        house_id: this.houseId
      }

      const res = await sendSeeInfo(params)
      console.log(res)
      this.$emit('submitSuc', res)
      this.onReset()
    },
    onClose () {
      this.onReset()
      this.$emit('close', true)
    },
    onReset () {
      this.orderDate = ''
      this.name = ''
      this.phone = ''
      this.error = ''
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../stylus/mixin.styl"
.appo-cont
  width:335px;
  height:330px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  .appo-cont__header
    position relative
    .close 
      height 33px
      position absolute
      width 20px
      height 20px
      top 10px
      right 10px
      z-index 11
      .close-img
        display block
        width 14px
        height 14px
        margin 3px auto
    .main-title
      padding-top 33px;
      .h2
        width:72px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(230,1,19,1);
        line-height:25px;
        margin 0 auto
      .tips
        width:252px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(180,180,180,1);
        line-height:17px;
        margin 0 auto
  .appo-cont__main {
    padding-top 8px;
    .form {
      .form-item {
        width:280px;
        height:40px;
        border-radius:6px;
        border:1px solid rgba(151,151,151,1);
        margin 10px auto;
        display flex;
        justify-content flex-start;
        align-items center;
        .form-item__line {
          width:1px;
          height:30px;
          background #979797;
          display:inline-block;
          line-height 40px;
          margin-left 6px;
        }
        .place-holder {
          font-size:12px;
          color:#B4B4B4; 
        }
        .form-item__label {
          padding 12px 4px 12px 14px;
          font-size:12px;
          color:rgba(180,180,180,1);
        }
        .form-item__value {
          font-size:12px;
          color:rgba(180,180,180,1); 
          padding-left 10px;
        }
        .picker {
          flex 1;
          height 100%;
          .picker-con {
            width 100%;
            height 40px;
            line-height 40px;
          }
        }
      }
      .form-foot{
        margin-top 30px;
        position relative
        .submit-button {
          width:280px;
          height:40px;
          line-height 40px;
          background:rgba(230,1,19,1);
          border-radius:6px;
          padding-left 0;
          padding-right 0;
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        .form-error {
          color rgba(230,1,19,1);
          font-size 10px;
          text-align center;
          margin 0 auto;
          position absolute;
          top: -20px;
          left 50%;
          transform translateX(-50%)
        }
      }
    }
  }


</style>
