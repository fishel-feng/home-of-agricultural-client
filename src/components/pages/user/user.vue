<template>
  <div class="user">
    <div class="head">
      <img @click="showBigImage(`http://localhost:7001/public/headImage/${headImage}`)" :src="`http://localhost:7001/public/headImage/${headImage}`" height="80px" width="80px" alt="">
      <div class="desc" @click="showUserInfo">
        <div class="name-wrapper">
          {{nickName}}
          <span class="btn-edit" @click.stop="editInfo">编辑个人资料</span>
        </div>
        <div>{{description}}</div>
      </div>
    </div>
    <div class="center">
      <mt-cell title="最近联系" to="/user/recent" is-link></mt-cell>
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
    <div class="center">
      <mt-cell title="专家认证" to="/user/certification" is-link></mt-cell>
      <mt-cell title="关于我们" to="/user/about" is-link></mt-cell>
    </div>
    <div class="btn-wrapper">
      <mt-button @click.native="logout" class="btn-logout" type="danger">退出登录</mt-button>
    </div>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {accountTestMixin, showImageMixin} from '@/common/js/mixin'
  import {mapActions} from 'vuex'
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
        this.$axios.get('/user/getUserIndex').then(res => {
          const user = res.data.data.user
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
        })
      },
      ...mapActions([
        'addToken'
      ]),
      logout () {
        this.addToken('')
        this.$router.push('/')
      },
      editInfo () {
        this.$router.push('/user/edit')
      },
      showUserInfo () {
        this.$router.push(`/user/userCard?userId=${this.myId}`)
      }
    },
    mounted () {
      this.verifyLogin(this.getData)
    },
    watch: {
      '$route' (to, from) {
        if (from.path === '/user/edit' && from.query.flag) {
          this.getData()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .user
    width: 100%
    .head
      display flex
      min-height 80px
      padding 15px
      .desc
        padding 10px
        display flex
        flex-direction column
        justify-content space-between
        .name-wrapper
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          .btn-edit
            font-size 10px
            color $color-background
    .center
      padding 10px 15px
    .btn-wrapper
      padding 10px 15px
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
