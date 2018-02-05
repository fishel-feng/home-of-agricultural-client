<template>
  <transition name="slide">
    <div class="user-circle">
      <mt-header fixed title="我发表的动态">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <circle-list baseUrl="http://127.0.0.1:7001/user/getCircles/"/>
    </div>
  </transition>
</template>

<script>
import CircleList from '@/components/abstract/circle-list'
export default {
  components: {
    CircleList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.user-circle
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  padding-top 40px
</style>

