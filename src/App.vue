<script>

export default {

}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import "stylus/index.styl"
  page
    background-color #f2f2f2
  .container
    background-color #f2f2f2
  .fullscreen {
    width: 100vw;
    height: 100vh;
    color: #000;
    font-size: 30rpx;

    font-family: PingFangSC-Regular;
    background-color: #F3F4F6;
  }
  .background-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  button[disabled]:not([type]) {
    background-color:rgb(85,188,250);
    color: #fff;
  }

  cover-view {
    position: absolute;
  }
</style>
