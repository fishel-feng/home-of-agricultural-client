<template>
  <div class="user">
    <div class="head">
      <img src="../assets/svg/hot.svg" height="80px" width="80px" alt="">
      <div class="desc">
        <div>姓名</div>
        <div>
          个性签名
        </div>
      </div>
    </div>
    <div class="center">
      <mt-cell title="我的收藏" to="//github.com" is-link value="带链接"></mt-cell>
      <mt-cell title="我的动态" to="//github.com" is-link value="带链接"></mt-cell>
      <mt-cell title="我的提问" to="//github.com" is-link value="带链接"></mt-cell>
      <mt-cell title="我关注的问题" to="//github.com" is-link value="带链接"></mt-cell>
      <mt-cell title="我关注的人" to="//github.com" is-link value="带链接"></mt-cell>
      <mt-cell title="关注我的人" to="//github.com" is-link value="带链接"></mt-cell>
    </div>
    <div class="foot">
      <mt-cell title="关于我们" to="//github.com" is-link value="带链接"></mt-cell>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      msg: 'Welcome to 我的页面',
      popupVisible: false
    }
  },
  methods: {
    //
  },
  mounted () {
    //
  }
}
</script>

<style lang="stylus" scoped>
.user
  display flex
  flex-direction column
  position fixed
  width 100%
  top 40px
  bottom 55px
  .head
    display flex
    padding 15px
    .desc
      padding 10px
      display flex
      flex-direction column
      justify-content space-around
  .center
    padding 15px
  .foot
    padding 15px
</style>
