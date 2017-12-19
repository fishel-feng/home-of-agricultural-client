<template>
  <!-- <transition name="slide"> -->
    <div class="follower-list">
      <mt-header title="关注我的人">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <person-list :data="followers"></person-list>
    </div>
  <!-- </transition> -->
</template>

<script>
import { mapGetters } from 'vuex'
import PersonList from '@/components/person-list'
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
  background #fff
</style>
