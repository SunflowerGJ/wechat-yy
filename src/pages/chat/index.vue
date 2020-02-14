<template>
  <div class='chating-wrapper'>
  <!-- 消息记录 -->
      <!-- 消息记录 -->
  <div class='record-wrapper' id="recordWrapper">
    <div v-for="(message,index) in messageArr" :key="index">
      <view class='record-item-time-wrapper' v-if="message.displayTimeHeader != ''">
        <text class='record-item-time'>{{message.displayTimeHeader}}</text>
      </view>
      <div v-if="message.sendOrReceive == 'send'" :class='message.sendOrReceive == "send" ? "record-chatting-item self" : ""' style='justify-content: flex-end' :data-message="message" @longpress='showEditorMenu'>
        <view v-if="message.type === 'image'" class='record-chatting-item-text ' ><img :src="message.content"/></view>
        <text v-if="message.type === 'text'" class='record-chatting-item-text'>{{message.content}}</text>
        <text class='right-triangle'></text>
        <img :src='loginAccountLogo'  class='record-chatting-item-img'/>
      </div>
      <div v-if="message.sendOrReceive == 'receive'" :class='message.sendOrReceive == "receive" ? "record-chatting-item other" : ""' style='justify-content: flex-start' :data-message="message"  @longpress='showEditorMenu'>
        <img :src='chatheadPhoto' @click='switchToMyTab' class='record-chatting-item-img'/>
        <text class='left-triangle'></text>
        <view v-if="message.type === 'image'" class='record-chatting-item-text nobg' ><img :src="message.content"/></view>
        <text v-if="message.type === 'text'" class='record-chatting-item-text' style='color:#000;background-color:#fff;' >{{message.content}}</text>
      </div>
    </div>
  </div>
  <!--底部输入框  -->
    <div class='chatinput-wrapper' >
      <div class='chatinput-content'>
        <input style='margin-bottom: 20rpx;'  :value='inputValue' :focus='focusFlag' @input='inputChange' @focus='inputFocus' @blur='inputBlur' @confirm='inputSend' class='chatinput-input'  placeholder="输入文字" confirm-type='send'/>
        <img src='/static/images/icon-input-more.png' @click='toggleMore' class='chatinput-img fr'/>
      </div>
      <div v-if="moreFlag" class='more-subcontent'>
        <div style='display:flex;'>
          <div class='more-subcontent-item' @click.stop='chooseImageToSend'>
            <img src="/static/images/icon-zhaox.png" class='image'/>
            <text class='text'>照片</text>
          </div>
          <div class='more-subcontent-item' @click.stop='chooseImageOrVideo'>
            <img src="/static/images/icon-ph.png" class='image'/>
            <text class='text'>拍摄</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
import {initInim} from '../../http/api.js'
 let NIM = require('../../../static/libs/NIM_Web_NIM_weixin_v6.8.0')
  let thisNIM=null
 import {calcTimeHeader} from '../../../src/utils/util.js'
export default {
  data () {
    return {
      nim: null,
      nimData: {},
      testList: [{sendOrReceive: 'send', type: 'text', text: '谁的风景刘恺家刘恺风景刘恺'}, {sendOrReceive: 'receive', type: 'text', text: '十分艰苦'}],
      chatWrapperMaxHeight: 0, // 聊天界面最大高度
      chatTo: '', // 聊天对象account
      chatType: '', // 聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
      loginAccountLogo: '', // 登录账户对象头像
      chatheadPhoto:'',
      focusFlag: false, // 控制输入框失去焦点与否
      emojiFlag: false, // emoji键盘标志位
      moreFlag: false, // 更多功能标志
      tipFlag: false, // tip消息标志
      tipInputValue: '', // tip消息文本框内容
      sendType: 0, // 发送消息类型，0 文本 1 语音
      messageArr: [], // [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
      inputValue: '', // 文本框输入内容
      from: ''
    }
  },
//  onLoad (e) {
//    Object.assign(this, this.$options.data())
//  },
  async mounted () {
    console.log(this.$route.query)
    this.chatTo = this.$route.query.id
    this.chatheadPhoto = this.$route.query.headPhoto
    this.loginAccountLogo = wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').headimgurl
    const data = await initInim()
    console.log(data)
    if(thisNIM){

      thisNIM.getHistoryMsgs({
        scene: 'p2p',
        to: this.chatTo,
        done: this.getHistoryMsgsDone
      });
    }
    thisNIM = NIM.getInstance({
       // 初始化SDK
       // debug: true,
       appKey: 'bd4ea621af735fd6924c38d44ae76eb0',
       account: data.yx_account,
       token: data.yx_token,
       onconnect: this.onConnect,
       onerror: this.onError,
       onwillreconnect: this.onWillReconnect,
       ondisconnect: this.onDisconnect,
       // 多端
       onloginportschange: this.onLoginPortsChange,
       // 会话
       onsessions: this.onSessions,
       onupdatesession: this.onUpdateSession,
       // 消息
       onroamingmsgs: this.onRoamingMsgs,
       onofflinemsgs: this.onOfflineMsgs,
       onmsg: this.onMsg,
       // 同步完成
       onsyncdone: this.onSyncDone
     })
  },
  methods: {
    onConnect () {
      console.log('连接成功')
    },
    onWillReconnect (obj) {
      // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连', obj)
    },
    onDisconnect (error) {
      // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log('连接断开', error)
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            break
          // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break
          // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            break
          default:
            break
        }
      }
    },
    onError (error, obj) {
      console.log('发生错误', error, obj)
    },
    onLoginPortsChange (loginPorts) {
      console.log('当前登录帐号在其它端的状态发生改变了', loginPorts)
      thisNIM.kick({
        deviceIds: [loginPorts[0].deviceId],
        done: this.onKick
      })
    },
    onKick (error, obj) {
      console.log('踢其它端' + (!error ? '成功' : '失败'))
    },
    onSessions (sessions) {
      console.log('收到会话列表', sessions)
       this.nimData.sessions = thisNIM.mergeSessions(this.nimData.sessions, sessions)
      this.updateSessionsUI()
    },
    onUpdateSession (session) {
      console.log('会话更新了', session)
       this.nimData.sessions = thisNIM.mergeSessions(this.nimData.sessions, session)
       this.updateSessionsUI()
    },
    updateSessionsUI () {
      // 刷新界面
      console.log('刷新界面')
    },

    onRoamingMsgs (obj) {
      console.log('漫游消息', obj)

    },
    onOfflineMsgs (obj) {
      console.log('离线消息', obj)

    },
    onMsg (msg) {
      console.log('收到消息', msg.scene, msg.type, msg)
    },

    onSyncDone () {
      console.log('同步完成')
      thisNIM.getHistoryMsgs({
        scene: 'p2p',
        to: this.chatTo,
        done: this.getHistoryMsgsDone
      });
    },
    getHistoryMsgsDone(error, obj) {
      console.log('获取云端历史记录' + (!error?'成功':'失败'), error, obj);
      if (!error) {
        console.log(obj.msgs);
       this.messageArr= this.handleMsgs(obj.msgs).reverse()
        setTimeout(()=>{
          this.scrollToBottom()
        },400)
      }
    },

    handleMsgs(arr){
      let messageArr = []
      arr.map(rawMsg => {
        let msgType = ''
        if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
          msgType = '猜拳'
        } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
          msgType = '贴图表情'
        } else {
          msgType = rawMsg.type
        }
        let displayTimeHeader = this.judgeOverTwoMinute(rawMsg.time, messageArr)
        let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
        let content = ''
        switch (msgType) {
          case 'text': {
            content = rawMsg.text
            break
          }
          case 'image': {
          	console.log(rawMsg.file.url)
            content = rawMsg.file.url
            break
          }
          case 'geo': {

            break
          }
          case 'audio': {

            break
          }
          case 'video': {

            break
          }
          case '猜拳': {

            break
          }
          case '贴图表情': {
            break
          }
          case 'tip': {

            break
          }
          case '白板消息':
          case '阅后即焚': {

            break
          }
          case 'file':
          case 'robot': {
            break
          }
          case 'notification':
            break;
          default: {
            break
          }
        }
        messageArr.push(Object.assign({}, {
          type: msgType,
          text: rawMsg.text || '',
          from: rawMsg.from,
          time: rawMsg.time,
          sendOrReceive,
          content,
          displayTimeHeader
        }))
      })
      return messageArr
    },
    /**
     * 距离上一条消息是否超过两分钟
     */
    judgeOverTwoMinute(time, messageArr) {
      let displayTimeHeader = ''
      let lastMessage = messageArr[messageArr.length - 1]
      if (lastMessage) {//拥有上一条消息
        let delta = time - lastMessage.time
        if (delta > 2 * 60 * 1000) {//两分钟以上
          displayTimeHeader = calcTimeHeader(time)
        }
      } else {//没有上一条消息
        displayTimeHeader = calcTimeHeader(time)
      }
      return displayTimeHeader
    },
    toggleMore () {
      this.moreFlag = !this.moreFlag
      console.log(this.moreFlag)
    },

    // 选择相册图片
    chooseImageToSend (e) {
      // let type = e.currentTarget.dataset.type
      let self = this
      // self.setData({
      //   moreFlag: false
      // })
      wx.chooseImage({
        sourceType: ['album'],
        success: function (res) {
          self.sendImageToNOS(res)
        }
      })
    },
    // 选择拍摄视频或者照片
    chooseImageOrVideo () {
      let self = this
      // self.setData({
      //   moreFlag: false
      // })
      wx.showActionSheet({
        itemList: ['照相', '视频'],
        success: function (res) {
          if (res.tapIndex === 0) { // 相片
            wx.chooseImage({
              sourceType: ['camera'],
              success: function (res) {
                self.sendImageToNOS(res)
              }
            })
          } else if (res.tapIndex === 1) { // 视频
            wx.chooseVideo({
              sourceType: ['camera', 'album'],
              success: function (res) {
                if (res.duration > 60) {
                  // showToast('text', '视频时长超过60s，请重新选择')
                  return
                }
                console.log(res)
                // {duration,errMsg,height,size,tempFilePath,width}
                self.sendVideoToNos(res)
              }
            })
          }
        }
      })
    },
    // 滚动页面到底部
    scrollToBottom () {
      wx.pageScrollTo({
        scrollTop: 999999,
        duration: 100
      })
    },
    // 文本框输入事件
    inputChange (e) {
      this.inputValue = e.mp.detail.value
    },

    // 键盘单击发送，发送文本
    inputSend () {
      this.sendRequest(this.inputValue)
    },
    // 发送图片到nos
    sendImageToNOS (res) {
      wx.showLoading({
        title: '发送中...'
      })
      let self = this
      let tempFilePaths = res.tempFilePaths
      for (let i = 0; i < tempFilePaths.length; i++) {
      // 上传文件到nos
        thisNIM.sendFile({
        // app.globalData.nim.previewFile({
          type: 'image',
          scene: 'p2p',
          to: self.chatTo,
          wxFilePath: tempFilePaths[i],
          done: function (err, msg) {
            wx.hideLoading()
            // 判断错误类型，并做相应处理
            if (self.handleErrorAfterSend(err)) {
              return
            }
            // 存储数据到store
//            self.saveChatMessageListToStore(msg)
            console.log('发送消息成功')
            console.log(msg)
            // 滚动到底部
            self.scrollToBottom()
          }
        })
      }
    },
    // 发送网络请求：发送文本消息(包括emoji)
    sendRequest (text) {
      let self = this
      thisNIM.sendText({
        scene: 'p2p',
        to: this.chatTo,
        text,
        done: (err, msg) => {
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
            return
          }
          // 存储数据到store
          // self.saveChatMessageListToStore(msg)
          console.log('发送消息成功')
          console.log(msg)
          // 滚动到底部
          self.scrollToBottom()
        }
      })
    },
    /**
   * 统一发送消息后打回的错误信息
   * 返回true表示有错误，false表示没错误
   */
    handleErrorAfterSend (err) {
      if (err) {
        if (err.code === 7101) {
          console.log('text', '你已被对方拉黑')
        }
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.chating-wrapper {
  width: 100%;
  min-height: 100%;
  position: relative;
  /* margin: 70rpx 0 100rpx; */
  box-sizing: border-box;
  /* overflow: hidden; */
  background: #F3F4F6;
}
/* 收起键盘热区 */
.fold-keyboad-wrapper {
  position: fixed;
  top: 70rpx;
  width: 100%;
  height: 500rpx;
}
/*历史消息  */
.chating-history {
  position: fixed;
  padding: 0 20rpx;
  width:100%;
  height:80rpx;
  line-height:80rpx;
  box-sizing: border-box;
  border: 1px solid #E7E7E7;
  background-color: #E7E7E7;
  z-index: 1;
  color: #888888;
  font-size: 30rpx;
}
.chating-history-left {
  float: left;
  color: #666;
}
.chating-history-right {
  float: right;
}
/*聊天输入框  */
.chatinput-wrapper {
  width: 100%;
  background-color: #fff;
  // border: 2rpx solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;


}
.chatinput-content {
  width: 100%;
  height:83px;
  box-sizing:border-box;
  padding:0 0 0 20rpx
}
.chatinput-img{
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin: 15px 20px 0 0;
  display: inline-block;
}
.chatinput-img.emoji{
  margin-right: 0;
}
.chatinput-img:active {
  opacity: .6;
}
 .chatinput-input {

  min-height: 72rpx;
  border-radius: 12rpx;
  border: 1px solid #ccc;
  margin-top: 15px;
  display: inline-block;
  vertical-align:top;
  box-sizing:border-box;
  padding-left: 20rpx;
  font-size: 30rpx;
  width:298px;
  height:38px;
  background:rgba(250,250,251,1);
  border-radius:19px;
  border:1px solid rgba(232,232,232,1);
}
.chatinput-voice-mask {
  width: 466rpx;
  height: 76rpx;
  line-height: 76rpx;
  display: inline-block;
  border-radius: 12rpx;
  border: 1px solid #ccc;
  margin-top: 12rpx;
  vertical-align:top;
  box-sizing:border-box;
  /* padding-left: 20rpx; */
  font-size: 30rpx;
  text-align: center;
  color: #333336;
  background-color: #fff;
  letter-spacing: 4rpx;
}
.chatinput-voice-mask-hover {
  background-color: #cecece;
  color: #333336;
}
/*subcontent wrapper  */
.chatinput-subcontent {
 width: 100%;
 height: 470rpx;
 background-color: #999;
}
.fr {
  float: right;
}
/* more-subcontent */
.more-subcontent {
  padding: 40rpx 30rpx;
  // border:2rpx solid #ccc;
}
.more-subcontent .more-subcontent-item {
  display:flex;
  justify-content flex-start;
  flex-direction:column;
}
.more-subcontent .more-subcontent-item .image {
  width:28px;
  height:23px;
  margin-bottom: 9px;
  margin-right 40px;
}
.more-subcontent .more-subcontent-item .text {
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(69,69,69,1);
  line-height:20px;

}
/*聊天记录  */
.record-wrapper {
  width: 100%;
  padding-bottom: 200rpx;
  padding-top:80rpx;
}
.record-chatting-item {
  width: 100%;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
}
.record-item-time-wrapper {
  display:flex;
  flex-direction:row;
  justify-content:center;
}
.record-item-time {
  padding:4rpx 10rpx;
  background: #D6D6D6;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #fff;
}
.record-chatting-item-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
  display: inline-block;
}

.record-chatting-item-text {
  max-width: 70%;
  border-radius: 8rpx;
  background-color: #3387FF;
  padding: 16rpx;
  box-sizing:border-box;
  word-wrap:break-word;
  overflow: hidden;
  font-size: 32rpx;
  line-height: 48rpx;
}
.record-chatting-item-text.nobg {
  background: transparent;
  margin-left: 20rpx;
  margin-right: 20rpx;
}
/* tip消息富文本 */
.tip-rich-text {
  background-color:#ccc;
  text-align:center;
  align-self:center;
  min-height:40rpx;
  word-break:break-word;
  font-size:26rpx;
  padding:0 20rpx;
  color:#000;
  border-radius: 10rpx;
}

.self {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: #fff;
}
.other {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #222;
}
.left-triangle{
  height:0px;
  width:0px;
  border-width:20rpx;
  border-style:solid;
  border-color:transparent #fff transparent transparent;
  margin-top: 20rpx;
}
.right-triangle{
  height:0px;
  width:0px;
  border-width:20rpx;
  border-style:solid;
  border-color:transparent transparent transparent #3387FF;
  margin-top: 20rpx;
}
.video-triangle {
  height:0px;
  width:0px;
  border-width:30rpx;
  border-style:solid;
  border-color:transparent transparent transparent #777;
  margin-top: 20rpx;
  margin-left: 30rpx;
}

.small-map-wrapper {
  overflow: hidden;
  width: 452rpx;
  height:300rpx;
  position:relative;
  border-radius:8rpx;
}
.self .small-map-wrapper {
  margin-right: 20rpx;
}
.other .small-map-wrapper {
  margin-left: 20rpx;
}
.small-map-wrapper .small-geo-img {
  width: 100%;
  height: 100%;
  background-color: pink;
}
.small-map-wrapper .text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 10rpx;
  min-height: 70rpx;
  /* line-height: 70rpx; */
  opacity: 0.75;
  font-size: 28rpx;
  /* white-space: nowrap; */
  text-align: center;
  text-overflow: ellipsis;
  background-color:#444;
  color:#fff;
}

.small-video-wrapper {
  margin-left: 20rpx;
  margin-right: 20rpx;
  width:200rpx;
  height:200rpx;
  padding:10rpx;
  background-color:#fff;
  border-radius:20rpx;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
}
.small-video-wrapper .video {
  max-width:200px;
  max-height:300px;
}

.audio-wrapper {
  background-color:#fff;
  border-radius:28rpx;
  display:flex;
  justify-content:space-between;
  padding:0 20rpx;
  min-width: 30%;
  box-sizing:border-box;
  margin-left:-2px;
}
.audio-wrapper .image {
  width:70rpx;
  height:70rpx;
  align-self:center;
}
.audio-wrapper .text {
  align-self:center;
  color:#fff;
}

</style>
