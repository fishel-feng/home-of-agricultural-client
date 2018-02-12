<template>
   <transition name="slide">
    <div class="follower-list">
      <mt-header title="关注我的人">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <person-list :data="followers"/>
      </div>
    </div>
   </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import PersonList from '@/components/abstract/person-list'
export default {
  components: {
    PersonList
  },
  computed: {
    ...mapGetters([
      'followers'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .follower-list
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      z-index 200
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
</style>
