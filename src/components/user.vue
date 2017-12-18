<template>
  <div class="user">
    <div class="head">
      <img src="../assets/svg/hot.svg" height="80px" width="80px" alt="">
      <div class="desc">
        <div>姓名</div>
        <div>个性签名</div>
      </div>
    </div>
    <div class="center">
      <mt-cell title="我的收藏" to="/user/collections" is-link :value="collectionCount"></mt-cell>
      <mt-cell title="我的动态" to="/user/circles" is-link :value="circleCount"></mt-cell>
      <mt-cell title="我的提问" to="/user/questions" is-link :value="questionCount"></mt-cell>
      <mt-cell title="我关注的问题" to="/user/attentions" is-link :value="attentionCount"></mt-cell>
      <mt-cell title="我回答的问题" to="/user/answers" is-link :value="answerCount"></mt-cell>
      <mt-cell title="我关注的人" to="/user/follower" is-link :value="followingCount"></mt-cell>
      <mt-cell title="关注我的人" to="/user/following" is-link :value="followerCount"></mt-cell>
    </div>
    <div class="foot">
      <mt-cell title="关于我们" to="/about" is-link></mt-cell>
    </div>
    <div class="btn-wrapper">
      <mt-button class="btn-logout" type="danger">退出登录</mt-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios'
// import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      followingCount: 0,
      followerCount: 0,
      answerCount: 0,
      questionCount: 0,
      attentionCount: 0,
      circleCount: 0,
      collectionCount: 0
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
  margin-bottom 55px
  width: 100%
  .head
    display flex
    min-height 80px
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
  .btn-wrapper
    padding 15px
    .btn-logout
      width 100%
</style>
