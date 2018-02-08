
<template>
  <!-- <transition name="bottom"> -->
    <div class="about">
      <mt-header fixed title="关于">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <!-- todo -->
      <!-- logo -->
      <img src="../../../assets/svg/hot.svg" alt="">
      <div>联系方式</div>
      <div>&copy;</div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.about
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  margin-top 40px
  background #fff
</style>

