<template>
  <!-- <transition name="slide"> -->
  <div class="user-card">
    <mt-header title="用户资料">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="content-wrapper">
      <img :src="`http://localhost:7001/public/headImage/${user.headImage}`" width="120px" height="120px" alt="">
      <div class="nickname">{{user.nickName}}</div>
      <div class="description">{{user.description}}</div>
      <div class="information">
        <span>地区：{{user.location ? user.location : '未知'}}</span>
        <span>性别：{{user.gender ? user.gender : '未知'}}</span>
      </div>
      <div class="information">
        <span>年龄：{{user.age ? user.age : '未知'}}</span>
        <span>职业：{{user.job ? user.job : '未知'}}</span>
      </div>
      <mt-button @click.native="followUser" class="btn-follow" type="primary" size="small">关注用户</mt-button>
    </div>
    <div class="block-wrapper">
      <div>
        <span>回答问题</span>
        <span>22</span>
      </div>
      <div>
        <span>提出问题</span>
        <span>22</span>
      </div>
      <div>
        <span>关注的人</span>
        <span>22</span>
      </div>
      <div>
        <span>ta的粉丝</span>
        <span>22</span>
      </div>
    </div>
    <div>最近动态</div>
  </div>
  <!-- </transition> -->
</template>

<script>
  import axios from 'axios'
  import { accountTestMixin } from '@/common/js/mixin'
  export default {
    mixins: [ accountTestMixin ],
    data () {
      return {
        user: {}
      }
    },
    mounted () {
      this.getData()
    },
    watch: {
      '$route' (to, from) {
        // console.log(this.$route.params.id)
      }
    },
    methods: {
      getData () {
        axios.get(`http://127.0.0.1:7001/user/getUserInfo/${this.$route.params.id}`).then(res => {
          if (res.data.code === 200) {
            this.user = res.data.data.user
          }
        })
      },
      followUser () {
        this.$socket.emit('follow', this.token, this.$route.params.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)

  .user-card
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
    .content-wrapper
      padding-top 10px
      display flex
      flex-direction column
      align-items center
      .nickname
        font-weight 500
        font-size 20px
        margin 6px 0
      .description
        font-size 16px
        margin 6px 0
      .information
        font-style italic
        font-size 14px
        margin 3px 0
        span
          margin 0 10px
      .btn-follow
        margin-top 10px
    .block-wrapper
      margin-top 10px
      overflow hidden
      width 100%
      div
        border 1px solid #cccccc
        background: #efefef
        box-sizing border-box
        padding 10px
        display flex
        flex-direction column
        align-items center
        justify-content center
        float left
        width 50%
        height 80px
        span
          margin 5px 0
</style>


