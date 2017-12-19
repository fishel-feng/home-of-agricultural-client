<template>
  <div class="user">
    <div class="head">
      <img :src="`http://localhost:7001/public/headImage/${headImage}`" height="80px" width="80px" alt="">
      <div class="desc">
        <div>{{nickName}}</div>
        <div>{{description}}</div>
      </div>
    </div>
    <div class="center">
      <mt-cell title="我的收藏" to="/user/collections" is-link :value="collectionCount"></mt-cell>
      <mt-cell title="我的动态" to="/user/circles" is-link :value="circleCount"></mt-cell>
      <mt-cell title="我的提问" to="/user/questions" is-link :value="questionCount"></mt-cell>
      <mt-cell title="我关注的问题" to="/user/attentions" is-link :value="attentionCount"></mt-cell>
      <mt-cell title="我回答的问题" to="/user/answers" is-link :value="answerCount"></mt-cell>
      <mt-cell title="我关注的人" to="/user/followings" is-link :value="followingCount"></mt-cell>
      <mt-cell title="关注我的人" to="/user/followers" is-link :value="followerCount"></mt-cell>
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
import { accountTestMixin } from '@/common/js/mixin'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      nickName: '',
      description: '',
      headImage: '',
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
    getData () {
      if (this.verifyLogin()) {
        axios.get('http://localhost:7001/user/getUserIndex', {
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          const user = res.data.data.user
          console.log(res.data)
          this.collectionCount = user.collectionCount
          this.circleCount = user.circleCount
          this.questionCount = user.questionCount
          this.attentionCount = user.attentionCount
          this.answerCount = user.answerCount
          this.followingCount = user.followingCount
          this.followerCount = user.followerCount
          this.nickName = user.nickName
          this.description = user.description
          this.headImage = user.headImage
          this.saveUserInfo(user)
        })
      }
    },
    ...mapActions([
      'saveUserInfo'
    ])
  },
  mounted () {
    this.getData()
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
