<template>
  <div class="chating-wrapper">
    <!-- 消息记录 -->
    <!-- 消息记录 -->
    <div class="record-wrapper" id="recordWrapper">
      <div v-for="message in messageArr" :key="message.key">
        <view
          class="record-item-time-wrapper"
          v-if="message.displayTimeHeader != ''"
        >
          <text class="record-item-time">{{ message.displayTimeHeader }}</text>
        </view>
        <div
          v-if="message.sendOrReceive === 'send'"
          :class="
            message.sendOrReceive === 'send' ? 'record-chatting-item self' : ''
          "
          style="justify-content: flex-end"
          :data-message="message"
          @longpress="showEditorMenu"
        >
          <view
            v-if="message.type === 'image'"
            :data-url="message.content"
            @tap="onPreviewImg"
            class="record-chatting-item-text img-wrap nobg"
          >
            <img mode="widthFix" :src="message.content" />
          </view>
          <rich-text
            v-if="message.type === 'text'|| message.type ==='custom'"
            :nodes="message.nodes"
            class="record-chatting-item-text"
            ></rich-text
          >
          <!-- <text class='right-triangle'></text> -->
          <view
            v-if="message.type === 'audio'"
            :data-audio="message.audio"
            @tap="playAudio"
            class="audio-wrapper"
          >
            <img src="/static/images/voice-right.png" class="image" />
            <text class="text" style="color:#000;"
              >{{ message.audio.dur / 1000 }}''</text
            >
          </view>
          <img
            :src="loginAccountLogo"
            class="record-chatting-item-img"
            style="margin-left:8px;"
          />
        </div>
        <div
          v-if="message.sendOrReceive === 'receive'"
          :class="
            message.sendOrReceive === 'receive'
              ? 'record-chatting-item other'
              : ''
          "
          style="justify-content: flex-start"
          :data-message="message"
          @longpress="showEditorMenu"
        >
          <img
            :src="chatheadPhoto"
            @click="switchToMyTab"
            class="record-chatting-item-img"
            style="margin-right:8px;"
          />
          <!-- <text class='left-triangle'></text> -->
          <view
            v-if="message.type === 'image'"
            :data-url="message.content"
            @tap="onPreviewImg"
            class="record-chatting-item-text img-wrap nobg"
          >
            <img mode="widthFix" :src="message.content" />
          </view>
          <rich-text
            v-if="message.type === 'text'|| message.type ==='custom'"
            :nodes="message.nodes"
            class="record-chatting-item-text fffbg"
            style="color:#000;background-color:#fff;"
            ></rich-text
          >
          <view
            v-if="message.type === 'audio'"
            :data-audio="message.audio"
            @tap="playAudio"
            class="audio-wrapper"
          >
            <img src="/static/images/voice-right.png" class="image" />
            <text class="text" style="color:#000;"
              >{{ message.audio.dur / 1000 }}''</text
            >
          </view>
        </div>
      </div>
    </div>
    <!--底部输入框  -->
    <div class="chatinput-wrapper"  :style="{'position':focusFlag?'absolute':'fixed'}">
      <div class="chatinput-content">
        <img
          :src="sendType === 0 ? '/static/images/voice.png' : '/static/images/keyboard.png'"
          class="chatinput-img"
          @tap="switchSendType"
        />
        <!-- :confirm-hold="true" -->
        <input
        style='margin-bottom: 20rpx;'
          v-if="sendType === 0"
          :cursor-spacing="36"
          :confirm-hold="true"
          :value="inputValue"
          :focus="focusFlag"
          @input="inputChange"
          @focus="inputFocus"
          @blur="inputBlur"
          @confirm="inputSend"
          class="chatinput-input"
          placeholder="输入文字"
          placeholder-style="color:#C1C1C1;"
          confirm-type="send"
        />
        <button
          v-if="sendType === 1"
          class="chatinput-voice-mask"
          :class="[
            { 'chatinput-voice-mask chatinput-voice-mask-hover': isLongPress }
          ]"
          hover-class="none"
          @touchstart="longPressStart"
          @touchend="longPressEnd"
        >
          {{ isLongPress ? "松开结束" : "按住说话" }}
        </button>
        <img
          src="/static/images/icon-input-more.png"
          @click="toggleMore"
          class="chatinput-img fr"
        />
        <img src='/static/images/emoji.png' @tap='toggleEmoji' class='chatinput-img fr emoji'/>
      </div>
      <div v-if="emojiFlag" class='chatinput-subcontent'>
        <component-emoji @EmojiClick="emojiCLick" @EmojiSend="emojiSend"></component-emoji>
      </div>
      <div v-if="moreFlag" class="more-subcontent">
        <div style="display:flex;">
          <div class="more-subcontent-item" @click.stop="chooseImageToSend">
            <img src="/static/images/icon-zhaox.png" class="image" />
            <text class="text">照片</text>
          </div>
          <div class="more-subcontent-item" @click.stop="chooseImageOrVideo">
            <img src="/static/images/icon-ph.png" class="image" />
            <text class="text">拍照</text>
          </div>
          <div class="more-subcontent-item" @click.stop="videoCall">
            <img src="/static/images/icon-ph.png" class="image" />
            <text class="text">视频通话</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// /* eslint-disable */
import { initInim } from '../../http/api.js'
import { calcTimeHeader, generateRichTextNode } from '../../../src/utils/util.js'
import componentEmoji from '../../components/componentEmoji'
import NetcallController from '../../controller/netcall.js'
let NIM = require('../../../static/libs/NIM_Web_NIM_weixin_v6.8.0')
let thisNIM = null
var YX_APP_KEY = process.env.YX_APP_KEY
let app = getApp()
export default {
  data () {
    return {
      nim: null,
      nimData: [],
      chatWrapperMaxHeight: 0, // 聊天界面最大高度
      videoContext: null, // 视频操纵对象
      isVideoFullScreen: false, // 视频全屏控制标准
      videoSrc: '', // 视频源
      chatTo: '', // 聊天对象account
      account: '',
      token: '',
      chatType: '', // 聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
      loginAccountLogo: '', // 登录账户对象头像
      chatheadPhoto: '',
      focusFlag: false, // 控制输入框失去焦点与否
      emojiFlag: false, // emoji键盘标志位
      moreFlag: false, // 更多功能标志
      tipFlag: false, // tip消息标志
      tipInputValue: '', // tip消息文本框内容
      sendType: 0, // 发送消息类型，0 文本 1 语音
      messageArr: [], // [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
      inputValue: '', // 文本框输入内容
      from: '',
      recorderManager: null, // 微信录音管理对象
      recordClicked: false, // 判断手指是否触摸录音按钮
      isLongPress: false, // 录音按钮是否正在长按
      audioContext: null
    }
  },
  components: {
    componentEmoji
  },
  async mounted () {
    console.log(this.$route.query)
    let title = this.$route.query.employeeName
    this.chatTo = this.$route.query.id
    this.chatheadPhoto = this.$route.query.headPhoto ? decodeURIComponent(this.$route.query.headPhoto) : ''
    this.loginAccountLogo = wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').headimgurl
    wx.setNavigationBarTitle({ title })
    this.messageArr = []
    const data = await initInim()
    console.log(data)
    this.account = data.yx_account
    this.token = data.yx_token
    this.initINM()
  },

  methods: {
    initINM () {
      if (thisNIM) {
        thisNIM.getHistoryMsgs({
          scene: 'p2p',
          to: this.chatTo,
          done: this.getHistoryMsgsDone
        })
      }
      console.log(this.account, this.token, YX_APP_KEY)
      thisNIM = NIM.getInstance({
      // 初始化SDK
        // debug: true,
        //  appKey: 'bd4ea621af735fd6924c38d44ae76eb0', // 开发
        // appKey: '146b62b8b039383f894b04e5aaec3701', // 测试
        appKey: YX_APP_KEY, // 正式
        account: this.account,
        token: this.token,
        //   account: '14ff0266a382729dd5d159d92f6945ba',
        //  token: 'b63a5db0e66a146d340855b3302f6e46',
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
    onConnect () {
      console.log('连接成功')
      getApp().globalData.netcallController = new NetcallController({
      // debug: false,
        debug: true,
        nim: thisNIM
      });
    },
    onWillReconnect (obj) {
      // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连', obj)
      wx.showToast({ title: '重连中，请稍后！', icon: 'loading', duration: 3000 })
    },
    onDisconnect (error) {
      let self = this
      // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log('连接断开', error)
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            wx.showToast({ title: '账号或者密码错误', icon: 'none', duration: 2000 })
            break
          // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            wx.showToast({ title: '重复登录, 已经在其它端登录了', icon: 'none', duration: 2000 })
            break
          // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            wx.showModal({
              title: '用户下线',
              content: '在其他客户端登录，导致被踢',
              confirmText: '重新登录',
              cancelText: '返回',
              success: (res) => {
                if (res.confirm) {
                  self.initINM()
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
            break
          default:
            break
        }
      }
    },
    onError (error, obj) {
      console.log('发生错误', error, obj)
      wx.showToast({ title: '连接发生错误', icon: 'none', duration: 2000 })
      this.initINM()
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
    },
    onUpdateSession (session) {
      console.log('会话更新了', session)
      if (session.lastMsg && session.lastMsg.status === 'success') {
        if ([this.chatTo, this.account].includes(session.to)) {
          this.nimData.push(session.lastMsg)
          this.messageArr = this.handleMsgs(this.nimData)
          // 滚动到底部
          setTimeout(() => {
            this.scrollToBottom()
          }, 150)
        }
      }
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
      thisNIM.getHistoryMsgs({
        scene: 'p2p',
        to: this.chatTo,
        done: this.getHistoryMsgsDone
      })
    },
    getHistoryMsgsDone (error, obj) {
      console.log('获取云端历史记录' + (!error ? '成功' : '失败'), error, obj)
      if (!error) {
        this.nimData = obj.msgs && obj.msgs.reverse()
        this.messageArr = this.handleMsgs(this.nimData)
        this.reCalcAllMessageTime()
        setTimeout(() => {
          this.scrollToBottom()
        }, 300)
      }
    },
    /**
   * emoji组件回调
   */
    emojiCLick (e) {
      let val = e
      // 单击删除按钮，，删除emoji
      if (val === '[删除]') {
        let lastIndex = this.inputValue.lastIndexOf('[')
        if (lastIndex !== -1) {
          this.inputValue = this.inputValue.slice(0, lastIndex)
        }
        return
      }
      if (val[0] === '[') { // emoji
        this.inputValue = this.inputValue + val
      } else { // 大图
        // this.sendBigEmoji(val)
      }
    },
    /**
   * emoji点击发送
   */
    emojiSend (e) {
      let val = this.inputValue
      this.sendRequest(val)
      this.emojiFlag = false
    },
    /**
     * 切换发送文本类型
     */
    switchSendType () {
      this.sendType = this.sendType === 0 ? 1 : 0
      this.focusFlag = false
      this.emojiFlag = false
    },
    /**
   * 视频通话
   */
    videoCall () {
      if (app.globalData.waitingUseVideoCall) {
        wx.showToast({ title: '请勿频繁操作', icon: 'none', duration: 2000 })
        return
      }
      if (this.chatType === 'advanced' || this.chatType === 'normal') { // 群组 暂时没有
        if (this.currentGroup.memberNum.length < 2) {
          wx.showToast({ title: '无法发起，人数少于2人', icon: 'none', duration: 2000 })
        } else {
          wx.navigateTo({
            url: `../forwardMultiContact/forwardMultiContact?teamId=${this.currentGroup.teamId}`
          })
        }
      } else { // p2p
        console.log(`正在发起对${this.chatTo}的视频通话`)
        this.$router.push({path: '/pages/videoCall/main', query: {callee: this.chatTo}})
        // wx.navigateTo({
        //   url: `../videoCall/videoCall?callee=${this.chatTo}`
        // })
      }
    },
    /**
     * 播放音频
     */
    onPreviewImg (e) {
      let url = e.mp.currentTarget.dataset.url
      wx.previewImage({
        current: url,
        urls: [url]
      })
    },
    playAudio (e) {
      if (this.audioContext) {
        this.audioContext.pause()
        this.audioContext = null
        wx.hideToast()
        return
      }
      wx.showToast({
        title: '播放中',
        icon: 'none',
        duration: 120 * 1000
      })
      let audio = e.mp.currentTarget.dataset.audio
      const audioContext = wx.createInnerAudioContext()
      this.audioContext = audioContext
      if (audio.ext === 'mp3') {
        // 小程序发送的
        audioContext.src = audio.url
      } else {
        audioContext.src = audio.mp3Url
      }
      audioContext.play()
      audioContext.onPlay(() => {})
      audioContext.onEnded(() => {
        wx.hideToast()
        this.audioContext = null
      })
      audioContext.onError(res => {
        wx.showToast({
          title: res.errCode,
          icon: 'none',
          duration: 120 * 1000,
          mask: true
        })
        this.audioContext = null
      })
    },
    /**
     * 微信按钮长按，有bug，有时候不触发
     */
    voiceBtnLongTap (e) {
      let self = this
      this.isLongPress = true
      wx.getSetting({
        success: res => {
          let recordAuth = res.authSetting['scope.record']
          if (recordAuth === false) {
            // 已申请过授权，但是用户拒绝
            wx.openSetting({
              success: function (res) {
                let recordAuth = res.authSetting['scope.record']
                if (recordAuth === true) {
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '请授权录音',
                    icon: 'none',
                    duration: 2000
                  })
                }
                self.isLongPress = false
              }
            })
          } else if (recordAuth === true) {
            // 用户已经同意授权
            self.startRecord()
          } else {
            // 第一次进来，未发起授权
            wx.authorize({
              scope: 'scope.record',
              success: () => {
                // 授权成功
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        },
        fail: function () {
          // showToast('error', '鉴权失败，请重试')
          wx.showToast({
            title: '鉴权失败，请重试',
            icon: 'error',
            duration: 2000
          })
        }
      })
    },
    /**
     * 手动模拟按钮长按，
     */
    longPressStart () {
      let self = this
      this.recordClicked = true
      setTimeout(() => {
        if (self.recordClicked === true) {
          self.executeRecord()
        }
      }, 350)
    },
    /**
     * 语音按钮长按结束
     */
    longPressEnd () {
      this.recordClicked = false
      // 第一次授权，
      if (!this.recorderManager) {
        this.isLongPress = false
        return
      }
      if (this.isLongPress === true) {
        this.isLongPress = false
        wx.hideToast()
        this.recorderManager.stop()
      }
    },
    /**
     * 执行录音逻辑
     */
    executeRecord () {
      let self = this
      this.isLongPress = true
      wx.getSetting({
        success: res => {
          let recordAuth = res.authSetting['scope.record']
          if (recordAuth === false) {
            // 已申请过授权，但是用户拒绝
            wx.openSetting({
              success: function (res) {
                let recordAuth = res.authSetting['scope.record']
                if (recordAuth === true) {
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '请授权',
                    icon: 'none',
                    duration: 2000
                  })
                }
                self.isLongPress = true
              }
            })
          } else if (recordAuth === true) {
            // 用户已经同意授权
            self.startRecord()
          } else {
            // 第一次进来，未发起授权
            wx.authorize({
              scope: 'scope.record',
              success: () => {
                // 授权成功
                wx.showToast({
                  title: '授权成功',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '授权成功',
            icon: 'error',
            duration: 2000
          })
        }
      })
    },
    /**
     * 开始录音
     */
    startRecord () {
      let self = this
      wx.showToast({
        title: '开始录音',
        icon: 'text',
        duration: 120000
      })
      const recorderManager = self.recorderManager || wx.getRecorderManager()
      const options = {
        duration: 120 * 1000,
        format: 'mp3'
      }
      recorderManager.start(options)
      self.recorderManager = recorderManager
      recorderManager.onStop(res => {
        if (res.duration < 2000) {
          // showToast('text', '录音时间太短')
          wx.showToast({
            title: '录音时间太短',
            icon: 'none',
            duration: 2000
          })
        } else {
          self.sendAudioMsg(res)
        }
      })
    },
    /**
     * 发送语音消息
     */
    sendAudioMsg (res) {
      wx.showLoading({
        title: '发送中...'
      })
      let tempFilePath = res.tempFilePath
      let self = this
      thisNIM.sendFile({
        scene: 'p2p',
        to: self.chatTo,
        type: 'audio',
        wxFilePath: tempFilePath,
        done: function (err, msg) {
          wx.hideLoading()
          // 判断错误类型，并做相应处理
          if (self.handleErrorAfterSend(err)) {
          }
        }
      })
    },
    handleMsgs (arr) {
      let messageArr = []
      arr.map(rawMsg => {
        let msgType = ''
        if (
          rawMsg.type === 'custom' &&
          JSON.parse(rawMsg['content'])['type'] === 1
        ) {
          msgType = '猜拳'
        } else if (
          rawMsg.type === 'custom' &&
          JSON.parse(rawMsg['content'])['type'] === 3
        ) {
          msgType = '贴图表情'
        } else {
          msgType = rawMsg.type
        }
        let displayTimeHeader = this.judgeOverTwoMinute(
          rawMsg.time,
          messageArr
        )
        let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
        let content = ''
        let specifiedObject = {}
        switch (msgType) {
          case 'text': {
            // content = rawMsg.text
            specifiedObject = {
              nodes: generateRichTextNode(rawMsg.text)
            }
            break
          }
          case 'image': {
            content = rawMsg.file.url
            break
          }
          case 'geo': {
            break
          }
          case 'audio': {
            specifiedObject = {
              audio: rawMsg.file
            }
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
          case 'custom':
            specifiedObject = {
              nodes: [{
                type: 'text',
                text: '自定义消息'
              }]
            }
            break
          case 'notification':
            break
          default: {
            break
          }
        }
        messageArr.push(
          Object.assign(
            {},
            {
              type: msgType,
              text: rawMsg.text || '',
              from: rawMsg.from,
              time: rawMsg.time,
              sendOrReceive,
              key: rawMsg.time + Math.random(),
              content,
              displayTimeHeader
            },
            specifiedObject
          )
        )
      })
      return messageArr
    },
    /**
     * 距离上一条消息是否超过两分钟
     */
    judgeOverTwoMinute (time, messageArr) {
      let displayTimeHeader = ''
      let lastMessage = messageArr[messageArr.length - 1]
      if (lastMessage) {
        // 拥有上一条消息
        let delta = time - lastMessage.time
        if (delta > 2 * 60 * 1000) {
          // 两分钟以上
          displayTimeHeader = calcTimeHeader(time)
        }
      } else {
        // 没有上一条消息
        displayTimeHeader = calcTimeHeader(time)
      }
      return displayTimeHeader
    },
    /**
     * 重新计算时间头
     */
    reCalcAllMessageTime () {
      let tempArr = [...this.messageArr]
      if (tempArr.length === 0) return
      // 计算时差
      tempArr.map((msg, index) => {
        if (index === 0) {
          msg['displayTimeHeader'] = calcTimeHeader(msg.time)
        } else {
          let delta = (msg.time - tempArr[index - 1].time) / (120 * 1000)
          if (delta > 1) {
            // 距离上一条，超过两分钟重新计算头部
            msg['displayTimeHeader'] = calcTimeHeader(msg.time)
          }
        }
      })
      this.messageArr = tempArr
    },
    toggleMore () {
      this.moreFlag = !this.moreFlag
      this.emojiFlag = false
      // focusFlag: false
    },
    /**
   * 切换出emoji键盘
   */
    toggleEmoji () {
      this.sendType = 0
      this.emojiFlag = !this.emojiFlag
      this.moreFlag = false
    },
    // 选择相册图片
    chooseImageToSend (e) {
      let self = this
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
      wx.chooseImage({
        sourceType: ['camera'],
        success: function (res) {
          self.sendImageToNOS(res)
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
            console.log('发送消息成功')
            self.moreFlag = false
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
          console.log('发送消息成功')
          self.inputValue = ''
          // self.focusFlag = false
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
    },
    /**
  * 获取聚焦
  */
    inputFocus (e) {
      this.focusFlag = true
      this.emojiFlag = false
    },

    // 失去聚焦(软键盘消失)
    inputBlur (e) {
      this.focusFlag = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../stylus/mixin.styl';

.chating-wrapper {
  width: 100%;
  min-height: 100vh;
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

/* 历史消息 */
.chating-history {
  position: fixed;
  padding: 0 20rpx;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
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

/* 聊天输入框 */
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
  height: 83px;
  box-sizing: border-box;
  // padding: 0 0 0 20rpx;
}

.chatinput-img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  margin: 22px 20rpx;
  display: inline-block;
}

.chatinput-img.emoji {
  margin-right: 0;
}

.chatinput-img:active {
  opacity: 0.6;
}

.chatinput-input {
  min-height: 72rpx;
  border-radius: 12rpx;
  border: 1px solid #ccc;
  margin-top: 15px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 20rpx;
  font-size: 30rpx;
  width: 466rpx;
  height: 38px;
  background: rgba(250, 250, 251, 1);
  border-radius: 19px;
  border: 1px solid rgba(232, 232, 232, 1);
}

.chatinput-voice-mask {
  min-height: 72rpx;
  border-radius: 12rpx;
  border: 1px solid #ccc;
  margin-top: 15px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 20rpx;
  font-size: 30rpx;
  width: 466rpx;
  height: 38px;
  background: rgba(250, 250, 251, 1);
  border-radius: 19px;
  border: 1px solid rgba(232, 232, 232, 1);
}

.chatinput-voice-mask-hover {
  background-color: #cecece;
  color: #333336;
}

/* subcontent wrapper */
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
  padding: 0 40rpx 30rpx;
  // border:2rpx solid #ccc;
}

.more-subcontent .more-subcontent-item {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.more-subcontent .more-subcontent-item .image {
  width: 28px;
  height: 23px;
  margin-bottom: 9px;
  margin-right: 40px;
}

.more-subcontent .more-subcontent-item .text {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
  line-height: 20px;
}

/* 聊天记录 */
.record-wrapper {
  width: 100%;
  padding-bottom: 200rpx;
  padding-top: 80rpx;
}

.record-chatting-item {
  width: 100%;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
}

.record-item-time-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.record-item-time {
  padding: 4rpx 10rpx;
  background: #D6D6D6;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #fff;
}

.record-chatting-item-img {
  width: 34px;
  height: 34px;
  border-radius: 100%;
  display: inline-block;
}

.record-chatting-item-text {
  max-width: 220px;
  border-radius: 14px;
  background-color: #FFE8E8;
  padding: 7px 11px;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: #333;
}

.record-chatting-item-text.nobg {
  background: transparent;
  // margin-left: 20rpx;
  // margin-right: 20rpx;
}

.record-chatting-item-text.img-wrap {
  padding: 0;
}

.record-chatting-item-text.img-wrap img {
  display: block;
  width: 220px;
}

.record-chatting-item-text.fffbg {
  background: #fff;
}

/* tip消息富文本 */
.tip-rich-text {
  background-color: #ccc;
  text-align: center;
  align-self: center;
  min-height: 40rpx;
  word-break: break-word;
  font-size: 26rpx;
  padding: 0 20rpx;
  color: #000;
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

.left-triangle {
  height: 0px;
  width: 0px;
  border-width: 20rpx;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  margin-top: 20rpx;
}

.right-triangle {
  height: 0px;
  width: 0px;
  border-width: 20rpx;
  border-style: solid;
  border-color: transparent transparent transparent #FFE8E8;
  margin-top: 20rpx;
}

.video-triangle {
  height: 0px;
  width: 0px;
  border-width: 30rpx;
  border-style: solid;
  border-color: transparent transparent transparent #777;
  margin-top: 20rpx;
  margin-left: 30rpx;
}

.small-map-wrapper {
  overflow: hidden;
  width: 452rpx;
  height: 300rpx;
  position: relative;
  border-radius: 8rpx;
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
  background-color: #444;
  color: #fff;
}

.small-video-wrapper {
  margin-left: 20rpx;
  margin-right: 20rpx;
  width: 200rpx;
  height: 200rpx;
  padding: 10rpx;
  background-color: #fff;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.small-video-wrapper .video {
  max-width: 200px;
  max-height: 300px;
}

.audio-wrapper {
  background-color: #fff;
  border-radius: 28rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  min-width: 30%;
  box-sizing: border-box;
  margin-left: -2px;
}

.audio-wrapper .image {
  width: 24rpx;
  height: 32rpx;
  align-self: center;
}

.audio-wrapper .text {
  align-self: center;
  color: #fff;
}

.chatinput-voice-mask::after {
  border: none;
}
</style>
