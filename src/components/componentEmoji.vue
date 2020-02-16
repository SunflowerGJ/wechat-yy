<template>
  <div class="emoji-wrapper">
    <div class="emoji-content">
      <swiper indicator-dots="true" class="emoji-content-swiper">

          <div
            style="display: inline-block;"
            v-for="(currentEmojiArr,indexP) in currentAlbumKeys"
            :data-index="indexP"
            :key="indexP"
            @tap="emojiTap"
          >
            <swiper-item>
              <div
                class="emoji-content-item"
                v-for="(currentEmojiKey,index) in currentEmojiArr"
                :key="index"
              >
                <img
                  :src="emojiList[currentAlbum][currentEmojiKey].img"
                  :class="currentAlbum == 'emoji' ? 'emoji-content-img-emoji' : 'emoji-content-img-other'"
                  :data-emoji="currentEmojiKey"
                >
              </div>
            </swiper-item>
          </div>

      </swiper>
    </div>
    <div class="emoji-album">
      <!-- <div
        class="emoji-album-left"
        v-for="album in albumArr"
        :key="album.album"
        :data-album="album.album"
        @tap="switchAlbum"
      >
        <img
          :src="localAlbumImages[index]"
          :class="album.album === currentAlbum ? 'emoji-album-left-img album-active' : 'emoji-album-left-img'"
        >
      </div> -->
      <div class="emoji-send" @tap="emojiSend">发送</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EmojiObj from "../utils/emojimap.js";

export default {
  data() {
    return {
        localAlbumImages: [
          "/images/album-emoji.png",
          "/images/album-ajtd.png",
          "/images/album-xxy.png",
          "/images/album-lt.png"
        ],
        albumArr: [],
        currentAlbum: "emoji",
        emojiList: {},
        currentAlbumKeys: [] // 存储每一类别的key
    };
  },
  onLoad () {
    let currentAlbumKeys = this.splitAlbumKeys(Object.keys(EmojiObj.emojiList[this.currentAlbum]), this.currentAlbum == 'emoji' ? 23 : 10)
      this.albumArr= EmojiObj.albumArr,
      this.emojiList= EmojiObj.emojiList,
      this.currentAlbumKeys=currentAlbumKeys
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
       * 切换emoji类别
       */
    switchAlbum: function (e) {
      this.currentAlbum = e.mp.currentTarget.dataset.album
      // 提前跟新一次，下面分类需要用到
      this.currentAlbumKeys = this.splitAlbumKeys(Object.keys(this.emojiList[currentAlbum]), currentAlbum == 'emoji' ? 23 : 10, currentAlbum)
    },
    /**
     * 每页显示固定个数
     * arr数据源数组，space每个数组最大容量
     * [[], [], []]
     */
    splitAlbumKeys (arr, space, currentAlbum='') {
      console.log(arr, space, currentAlbum)
      const delta = space || 23
      let result = [],
        factor = Math.ceil(arr.length / delta),
        begin = 0,
        end = 1
      if (factor == 1) {
        result = [[...arr]]
      } else {
        for (let i = 1; i < factor; i++) {
          let temp = []
          temp = [...arr.slice(begin, i * delta)]
          begin = i * delta
          result.push(temp)
        }
        result.push([...arr.slice(delta * (factor - 1), arr.length)])
      }
      if (currentAlbum == 'emoji' || this.currentAlbum == 'emoji') { // 只有emoji才添加删除按钮
        result.map((cata, index) => {
          if (index != (result.length - 1)) {
            cata.push('[删除]')
          }
        })
        // console.log(result)
      }
      return result
    },
    /**
     * 单击emoji
     */
    emojiTap: function (e) {
      let emoji = e.mp.target.dataset.emoji
      if (!emoji) return
      // console.log(emoji)
      this.$emit('EmojiClick', emoji)
    },
    /**
     * 发送emoji
     */
    emojiSend: function () {
      this.$emit('EmojiSend')
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../stylus/mixin.styl';

.emoji-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

/* 内容 */
.emoji-content {
  width: 100%;
  height: 400rpx;
  /* padding-top: 30rpx; */
  padding-left: 20rpx;
  box-sizing: border-box;
}

.emoji-content-swiper {
  width: 100%;
  height: 100%;
}

.emoji-content-item {
  display: inline-block;
  margin: 17rpx;
}

.emoji-content-img-emoji {
  width: 56rpx;
  height: 56rpx;
}

.emoji-content-img-other {
  width: 100rpx;
  height: 100rpx;
}

/* 底部类别 */
.emoji-album {
  width: 100%;
  height: 88rpx;
  border: 2rpx solid #999;
  box-sizing: border-box;
  background-color: #fff;
}

.emoji-album-left {
  display: inline-block;
  height: 100%;
}

.emoji-album-left-img {
  width: 88rpx;
  height: 100%;
  padding: 8rpx 10rpx;
  box-sizing: border-box;
  border-right: 2rpx soild #999;
}

.emoji-send {
  width: 88rpx;
  height: 100%;
  line-height: 88rpx;
  background-color: #0091e4;
  text-align: center;
  float: right;
  color: #fff;
}

.album-active {
  background-color: #aaa;
}
</style>
