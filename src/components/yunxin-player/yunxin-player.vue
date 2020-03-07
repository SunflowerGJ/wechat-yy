<template>
<!--components/yunxin-player/yunxin-player.wxml-->
<view @click="togglePositon" class="play-container" :style="'left:' + config.x + 'px; top:' + config.y + 'px; width: ' + config.width + 'px; height: ' + config.height + 'px;'">
  <live-player :src="url" mode="RTC" class="player" :orientation="orientation" min-cache="0.2" max-cache="0.8" @statechange="stateChangeHandler" :object-fit="objectFit" autoplay :style="'height: ' + config.height + 'px; position: absolute; width: 100%; top: 0; left: 0;background-color: transparent;'" :debug="debug" :id="'yunxinplayer-' + uid">
    <slot></slot>
    <!-- <cover-view v-if="status !== 'ready'" class="sud flex-center-column" style="display:none">
      <cover-image style="width: 182rpxheight:240rpx" :src="imgStatus"></cover-image>
    </cover-view> -->
    <cover-view style="position: absolute;top:10px;left:10px;font-size: 28rpx; right: 10px;color:#ccc" v-if="coverText.length != 0">{{coverText}}</cover-view>
  </live-player>  
</view>
</template>

<script>
 /* eslint-disable */
export default {
  data () {
    return {
      // togglesuc:true,
      livePlayerContext: null,
      detached: false,
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
        height: 0
      })
    },
    debug: {
      type: Boolean,
      default: false
    },

    /**
     * 加载状态：loading、ready、error
     */
    status: {
      type: String,
      default: 'loading'
    },
    /**
     * 画面方向，可选值有 vertical，horizontal
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
    objectFit: {
      type: String,
      default: 'fillCrop'
    },
    name: {
      type: String,
      default: ''
    },
    uid: {
      type: Number,
      default: ''
    },
    coverText: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  watch: {
    status: function (newVal, oldVal, changedPath) {
      console.log(`player status changed from ${oldVal} to ${newVal}`);
      if(newVal){
        this.imgStatus = `/static/images/yunxin/${newVal}.png`
      }
    },
    // config: function (newVal, oldVal, changedPath) {
    //   console.log('config配置进入=-=-=-=-=-=-=-')
    //   if(newVal){
    //     if(newVal.y==30){
    //      setTimeout(()=>{
    //        console.log('big窗口显示')
    //         this.togglesuc=true
    //       },2000)
    //     }else {
    //      setTimeout(()=>{
    //        console.log('xiao窗口显示')
    //         this.togglesuc=true
    //       },200)
    //     }
    //   }
    // }
  },
  methods: {
    // 我写的切换双方视频窗口
    // togglePositon(){
    //   console.log('togglePositon')
    //   // if(this.config.y==30){ // 小窗口 切换位置
    //     this.$emit('togglePositon',true)
    //     this.togglesuc=false
    //   // }
    // },
    /**
     * 组件生命周期：在组件布局完成后执行，此时可以获取节点信息
     */
    ready() {
      console.log(this.uid)
      console.log(`yunxinplayer-${this.uid} ready`);

      if (this.livePlayerContext) {
        this.livePlayerContext = wx.createLivePlayerContext(`yunxinplayer-${this.uid}`, this);
      }

      if (this.url) {
        this.start();
      }
    },

    /**
     * 组件生命周期：在组件实例被从页面节点树移除时执行
     */
    detachedFun() {
      console.log(`yunxinplayer-${this.uid} detached`);
      wx.createLivePlayerContext(`yunxinplayer-${this.uid}`, this).stop();
      this.detached = true;
    },

    /**
     * 开始拉流播放
     */
    start() {
      const uid = this.uid;

      if (this.status === 'ready') {
        console.log(`player ${uid} already started`);
        return;
      }

      if (this.detached) {
        console.log(`try to start player while component already detached`);
        return;
      }

      console.log(`starting player ${uid}`);
      this.livePlayerContext.play();
    },

    /**
     * 停止拉流播放
     */
    stop() {
      console.log(`stopping player ${this.uid}`);
      wx.createLivePlayerContext(`yunxinplayer-${this.uid}`, this).stop();
    },

    /**
     * 切换画面方向
     * true为 horizontal，false为 vertical
     */
    changeOrientation(isHorizontal) {
      let orientation = isHorizontal ? 'horizontal' : 'vertical';
      this.orientation=orientation
      // this.setData({
      //   orientation: orientation
      // });
    },

    /**
     * 切换填充模式
     * true为 fillCrop，false为 contain
     */
    changeObjectFit(isFillCrop) {
      let objectFit = isFillCrop ? 'fillCrop' : 'contain';
      this.objectFit=objectFit
      // this.setData({
      //   objectFit: objectFit
      // });
    },

    /**
     * 播放器状态更新回调
     */
    stateChangeHandler(e) {

      console.warn(`yunxin-player code: ${e.mp.detail.code} - ${e.mp.detail.message}`);
      let uid = parseInt(e.mp.target.id.split('-')[1]);

      if (e.mp.detail.code === 2004) {
        console.log(`live-player ${uid} started playing`);

        if (this.status === 'loading') {
          this.status='ready'
          // this.setData({
          //   status: 'ready'
          // });
        }
      } else if (e.mp.detail.code === -2301) {
        console.log(`live-player ${uid} stopped`, 'error');
         this.status='error'
        // this.setData({
        //   status: 'error'
        // });
        this.$emit('pullfailed');
      }
    },

    /**
     * 改变画面蒙面
     */
    changeStatus(status) {
      switch (status) {
        case 'leave':
        case 'notConnected':
          {
            break;
          }

        default:
          {
            status = this.status;
          }
      } // console.error(status)

        this.status=status
      // this.setData({
      //   status
      // });
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
@import "./yunxin-player.css";
</style>