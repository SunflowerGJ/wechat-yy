<script>
import { login } from './http/api.js'
export default {
  async created () {
    const {code} = await this.$wx.login()
    console.log('code', code)
    this.onLogin(code)
  },
  methods: {
    // 登陆
    async onLogin (code) {
      const {data} = await login({code: code})
      console.log(data)
    }
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
