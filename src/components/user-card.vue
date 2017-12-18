<template>
  <transition name="slide">
    <div class="user-card">
      <mt-header title="用户资料">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <img src="../assets/svg/hot.svg" alt="">
    </div>
  </transition>
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
</style>


