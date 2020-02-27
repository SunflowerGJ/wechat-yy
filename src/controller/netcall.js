import NetcallWeixin from '../../static/libs/NIM_Web_Netcall_weixin_v6.8.0';
import NIM from '../../static/libs/NIM_Web_NIM_weixin_v6.8.0';
import Emitter from '../utils/emitter';
/* eslint-disable */
let app = getApp().globalData;
let store = getApp().globalData.store;

export default class NetcallController {
  constructor (props) {
    NIM.use(NetcallWeixin);
    NetcallWeixin.destroy();
    console.log(NetcallWeixin.getInstance(props))
    this.netcall = getApp().globalData.netcall = NetcallWeixin.getInstance(props);
    getApp().globalData.emitter = new Emitter();
    this.bindNetcallEvent();
    this.state = {
      onTheCall: false // 正在通话中

    };
  }

  bindNetcallEvent () {
    this.netcall.on('syncDone', data => {
      console.log(new Date());
      console.log('登录成功', data);
      getApp().globalData.emitter.emit('syncDone', data);
    });
    this.netcall.on('clientLeave', data => {
      console.log('有人离开了', data);
      getApp().globalData.emitter.emit('clientLeave', data);
    });
    this.netcall.on('clientJoin', data => {
      console.log(new Date()); // {account,cid,mode,uid,url}

      console.log('有人加入了', data);
      this.state.onTheCall = true; // 标记正在通话

      getApp().globalData.emitter.emit('clientJoin', data);
    });
    this.netcall.on('callRejected', data => {
      console.log('对方拒绝了', data);
      getApp().globalData.emitter.emit('callRejected', data);
    });
    this.netcall.on('callAccepted', data => {
      console.log('对方接听了', data);
      getApp().globalData.emitter.emit('callAccepted', data);
    });
    this.netcall.on('beCalling', data => {
      // {caller,cid,type}
      console.log('beCalling', data);
      let pages = getCurrentPages();
      let currentPage = pages[pages.length - 1];

      if (currentPage.route.includes('videoCall') === false && getApp().globalData.isPushBeCallPage == false) {
        // 不在多人通话中，才提示
        if (!currentPage) {
          wx.navigateTo({
            url: `/partials/videoCall/videoCall?beCalling=true&caller=${data.caller}&cid=${data.cid}&type=${data.type}`
          });
          getApp().globalData.isPushBeCallPage = true;
          return;
        }

        let netcallGroupCallInfo = store.getState().netcallGroupCallInfo;
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];

        if (Object.keys(netcallGroupCallInfo).length === 0) {
          // p2p视频
          if (!currentPage.route.includes('videoCall') && getApp().globalData.isPushBeCallPage == false) {
            wx.navigateTo({
              url: `/partials/videoCall/videoCall?beCalling=true&caller=${data.caller}&cid=${data.cid}&type=${data.type}`
            });
            getApp().globalData.isPushBeCallPage = true;
          }
        }
      }

      getApp().globalData.emitter.emit('beCalling', data);
    });
    this.netcall.on('callerAckSync', data => {
      // {timetag,type,fromClientType:number,cid,accepted}
      console.log('callerAckSync: 其他端已经处理了', data);
      wx.showToast({
        title: '已在其他端处理！',
        duration: 2000,
        icon: 'none',
        success: function () {
          setTimeout(() => {
            let pages = getCurrentPages();
            let currentPage = pages[pages.length - 1];

            if (currentPage.route.includes('videoCall') || currentPage.route.includes('videoCallMeeting')) {
              wx.navigateBack(1);
            }
          }, 2000);
        }
      });
    });
    this.netcall.on('hangup', data => {
      console.log('hangup', data);
      this.state.onTheCall = false; // 标记正在通话

      getApp().globalData.emitter.emit('hangup', data);
    });
    this.netcall.on('control', data => {
      console.log('control', data); // {cid,account,command}

      getApp().globalData.emitter.emit('control', data);
    });
    this.netcall.on('joinChannel', data => {
      // {uid,account,cid}
      console.log('joinChannel', data);
      getApp().globalData.emitter.emit('joinChannel', data);
    });
    this.netcall.on('clientUpdate', data => {
      console.log('有人更新了', data);
    });
    this.netcall.on('error', error => {
      console.log(error)
      console.error('出错了', error);
    });
    this.netcall.on('open', data => {
      console.log('socket建立成功', data);
    });
    this.netcall.on('willreconnect', data => {
      // 直播通道准备重连
      getApp().globalData.emitter.emit('willreconnect', data);
    });
    this.netcall.on('sendCommandOverTime', data => {
      console.log('发送命令超时', data);
    });
    this.netcall.on('liveRoomClose', data => {
      console.log('互动直播房间解散了', data);
    });
    this.netcall.on('sessionDuration', data => {
      console.log('===结束通话(ms)：', data);
    });
  }
}
