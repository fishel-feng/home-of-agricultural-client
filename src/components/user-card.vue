<template>
  <!-- <transition name="slide"> -->
  <div class="user-card">
    <mt-header title="用户资料">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="content-wrapper">
      <img src="../assets/svg/hot.svg" width="120px" height="120px" alt="">
      <div class="nickname">隋堤倦客</div>
      <div class="description">风蓬飘尽悲歌气，泥絮沾来薄幸名。</div>
      <div class="information">
        <span>地址</span>
        <span>性别</span>
      </div>
      <div class="information">
        <span>年龄</span>
        <span>职业</span>
      </div>
      <mt-button type="primary" size="small">关注用户</mt-button>
    </div>
    <div>回答问题22</div>
    <div>提出问题22</div>
    <div>关注23</div>
    <div>粉丝45</div>
    <div>最近动态</div>
  </div>
  <!-- </transition> -->
</template>

<script>
  export default {
    mounted () {
      // console.log(this.$route.params.id)
    },
    watch: {
      '$route' (to, from) {
        // console.log(this.$route.params.id)
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
</style>


