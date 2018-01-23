<template>
  <div class="user">
    <div class="head">
      <img @click="showBigImage(`http://localhost:7001/public/headImage/${headImage}`)" :src="`http://localhost:7001/public/headImage/${headImage}`" height="80px" width="80px" alt="">
      <div class="desc">
        <div>{{nickName}}</div>
        <div>{{description}}</div>
      </div>
    </div>
    <div class="center">
      <mt-cell title="我的收藏" to="/user/collections" is-link :value="collectionCount"/>
      <mt-cell title="我的动态" to="/user/circles" is-link :value="circleCount"/>
      <mt-cell title="我的提问" to="/user/questions" is-link :value="questionCount"/>
      <mt-cell title="我关注的问题" to="/user/attentions" is-link :value="attentionCount"/>
      <mt-cell title="我回答的问题" to="/user/answers" is-link :value="answerCount"/>
      <mt-cell title="我关注的人" to="/user/followings" is-link :value="followingCount"/>
      <mt-cell title="关注我的人" to="/user/followers" is-link :value="followerCount"/>
    </div>
    <div class="foot">
      <mt-cell title="专家认证" to="/certification" is-link/>
      <mt-cell title="关于我们" to="/about" is-link/>
    </div>
    <div class="btn-wrapper">
      <mt-button @click.native="logout" class="btn-logout" type="danger">退出登录</mt-button>
    </div>
    <router-view/>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
  </div>
</template>

<script>
import { accountTestMixin, showImageMixin } from '@/common/js/mixin'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  mixins: [accountTestMixin, showImageMixin],
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
    },
    ...mapActions([
      'saveUserInfo',
      'addToken'
    ]),
    logout () {
      this.addToken('')
      this.$router.push('/')
    }
  },
  mounted () {
    this.verifyLogin(this.getData)
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
  .image-wrapper
    display flex
    align-items center
    position fixed
    background rgba(0, 0, 0, 0.8)
    z-index 200
    top 0
    right 0
    left 0
    bottom 0
    .big-image
      width 100%
</style>
