<template>
  <transition name="slide">
    <div class="certification">
      <mt-header fixed title="专家认证">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      专家认证
    </div>
  </transition>
</template>

<script>
export default {
  // todo
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.certification
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  padding-top 40px
  background #fff
</style>


