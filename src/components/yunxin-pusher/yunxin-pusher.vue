<template>


<!--components/yunxin-pusher/yunxin-pusher.wxml-->
<view @click="togglePositon" class="pusher-container" id="rtcpusher" :style="'left: ' + config.x + 'px; top: ' + config.y + 'px; width: ' + config.width + 'px; height: ' + config.height + 'px; position: absolute;'">
  <live-pusher :style="'height:' + config.height + 'px; position: absolute; width: 100%;'" :url="url" v-if="url.length !== 0" mode="RTC" :aspect="aspect" class="camera" @statechange="stateChangeHandler" @netstatus="netChangeHandler" background-mute="true" :enable-camera="enableCamera" :muted="muted" :beauty="beauty" max-bitrate="500" min-bitrate="200" :debug="debug" autopush="true">
    <slot></slot>
    <!-- <cover-view v-if="status !== 'ready'" class="sud flex-center-column" style="display:flexposition: absolute width: 100% height: 100%justify-content:centeralign-items:center">
      <cover-image style="width: 182rpxheight:240rpx" :src="imgStatus"></cover-image>
    </cover-view> -->
    <cover-view style="position: absolute;top:10px;left:10px;font-size: 28rpx; right: 10px;color:#ccc" v-if="coverText.length != 0">{{coverText}}</cover-view>
  </live-pusher>
</view>
</template>

<script>
 /* eslint-disable */
export default {
  data() {
    return {
      livePusherContext: null,
      // togglesuc:true,
      // 组件操作上下文
      detached: false, // 组件是否被移除标记
      imgStatus:'/static/images/yunxin/loading.png'
    };
  },

  components: {},
  props: {
    config: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        toggle:true
      })
    },
    debug: {
      type: Boolean,
      default: false
    },
    minBitrate: {
      type: Number,
      default: 200
    },
    maxBitrate: {
      type: Number,
      default: 500
    },
    enableCamera: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: false
    },
    beauty: {
      type: String,
      default: 0
    },
    aspect: {
      type: String,
      default: "3:4"
    },

    /**
     * 加载状态：loading、ready、error
     */
    status: {
      type: String,
      default: "loading"
    },
    coverText: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ""
    }
  },
  watch: {
    status: function (newVal, oldVal, changedPath) {
      console.log(`yunxin-pusher status changed from ${oldVal} to ${newVal}`);
      if(newVal){
        this.imgStatus = `/static/images/yunxin/${newVal}.png`
      }
    },
    config: function (newVal, oldVal, changedPath) {
     console.log('config配置进入=-=-=-=-=-=-=-')
      // if(newVal){
      //   this.togglesuc=false
      //   if(newVal.y==30){
      //    setTimeout(()=>{
      //      console.log('yunxin-pusher小窗口显示')
      //       this.togglesuc=true
      //     },500)
      //   }else {
      //    setTimeout(()=>{
      //      console.log('yunxin-pusher大窗口显示')
      //       this.togglesuc=true
      //     },3000)
      //   }
      // }
    }
  },

  /**
   * 在组件实例被从页面节点树移除时执行
   */
  destroyed: function () {
    console.log("yunxin-pusher detached"); // auto stop yunxin-pusher when detached
    // this.stop()
    this.detached = true
  },

  /**
   * 在组件布局完成后执行，此时可以获取节点信息
   */
  beforeMount: function () {
    console.log("yunxin-pusher ready");
    this.start();
    this.detached = false
    // this.setData({
    //   detached: false
    // });
  },
  methods: {
    // 我写的切换双方视频窗口
    togglePositon(){
      console.log('togglePositon')
      if(this.config.y==30){ // 小窗口 切换位置
        this.$emit('togglePositon',true)
        // this.togglesuc=false
      }
    },
    /**
     * 播放推流
     * 一般情况下不应手动调用，在推流组件预备好后会自动被调用
     */
    start(options = {}) {
      if (!this.livePusherContext) {
        this.livePusherContext = wx.createLivePusherContext();
      }

      console.log(`starting yunxin-pusher`);
      this.livePusherContext.start(options);
    },

    /**
     * 停止推流
     */
    stop(options = {}) {
      if (this.livePusherContext) {
        console.log(`stopping yunxin-pusher`);
        this.livePusherContext.stop(options);
      }
    },

    /**
     * 切换前后摄像头
     */
    switchCamera() {
      this.livePusherContext.switchCamera();
    },

    /**
     * 快照
     */
    snapshot() {
      this.livePusherContext.snapshot();
    },

    /**
     * 推流状态变化事件回调
     */
    stateChangeHandler(e) {
      console.warn(`yunxin-pusher code: ${e.mp.detail.code} - ${e.mp.detail.message}`);
      if (e.mp.detail.code === -1307) {
        // 网络断连，且经多次重连抢救无效，更多重试请自行重启推
        console.log('yunxin-pusher stopped', `code: ${e.mp.detail.code}`);
        this.status= "error"
        // this.setData({
        //   status: "error"
        // });
        this.livePusherContext.stop({
          complete: () => {
            this.livePusherContext.start();
          }
        });
        this.$emit('pushfailed');
      } else if (e.mp.detail.code === 1008) {
        // 编码器启动
        console.log(`yunxin-pusher started`, `code: ${e.mp.detail.code}`);

        if (this.status === "loading") {
          this.status= "ready"
          // this.setData({
          //   status: "ready"
          // });
        }
      }
    },

    /**
     * 网络状态通知回调
     */
    netChangeHandler(e) {// console.log(`network: ${JSON.stringify(e.detail)}`);
    },

    /**
     * 开启调试
     */
    toggleDebug(isDebug) {
      this.debug= isDebug
      // this.setData({
      //   debug: isDebug
      // });
    }

  }
};
</script>
<style>
@import "./yunxin-pusher.css";
</style>