<template>
  <div class="container"> 
首页
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },

  methods: {
    bindViewTap () {
      this.$router.push({ path: '/pages/activty/main', isTab: true })
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
    }
  },

  async created () {
    console.log(wx)
    const res = await this.$wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗'
    })
    console.log(res)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../stylus/mixin.styl"

.container
  display flex
  no-wrap-more(3)

</style>
