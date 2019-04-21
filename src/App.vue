<script>
import { login } from './http/api.js'
export default {
  async mounted () {
    try {
      await this.$wx.checkSession()
    } catch (error) {
      // 重新登录
      const {code} = await this.$wx.login()
      const data = await login({code})
      wx.setStorage({key: 'token', data: data.token})
      wx.setStorage({key: 'userinfo', data: data.userinfo})
    }
    let token = await this.$wx.getStorage({key: 'token'})
    let userinfo = await this.$wx.getStorage({key: 'userinfo'})
    this.globalData.token = token.data
    this.globalData.userinfo = userinfo.data
  },
  methods: {

  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import "stylus/index.styl"
  page
    background-color #f2f2f2
  .container
    background-color #f2f2f2
</style>
