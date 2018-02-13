
<template>
  <transition name="slide">
    <div class="about">
      <mt-header fixed title="关于">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <img src="../../../assets/svg/logo.svg" alt="">
        <div class="tail">
          <div>小农之家测试版，正式版不久之后上线，敬请期待</div>
          <div>有问题欢迎反馈</div>
          <div>&copy; xnzj</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .about
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      padding 60px 0
      position fixed
      top 40px
      bottom 0
      width 100%
      .tail
        text-align center
        font-size $font-size-small
</style>

