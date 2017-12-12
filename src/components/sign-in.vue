<template>
  <transition name="slide" class="article-info">
    <div class="sign-in">
      {{msg}}
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      msg: '登录页面...'
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.sign-in
  position fixed
  overflow-y:auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background: #fff
</style>
