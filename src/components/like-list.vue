<template>
  <transition name="slide">
    <div class="like-list">
      <mt-header title="点赞的人">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <person-list :data="likes"></person-list>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import PersonList from '@/components/abstract/person-list'
export default {
  data () {
    return {
      likes: []
    }
  },
  components: {
    PersonList
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      const circleId = this.$route.params.circleId
      axios.get(`http://localhost:7001/circle/getLikeList/${circleId}`).then(res => {
        this.likes = res.data.data.likes
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.like-list
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
</style>
