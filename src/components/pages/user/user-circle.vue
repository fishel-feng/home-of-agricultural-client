<template>
  <transition name="slide">
    <div class="user-circle">
      <mt-header fixed title="我发表的动态">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <circle-list class="circle-list" @refresh="reload" @load="getCircleList" :circles="circles" :loading="loading" :showLoading="showLoading"/>
      </div>
    </div>
  </transition>
</template>

<script>
import CircleList from '@/components/abstract/circle-list'
import { accountTestMixin } from '@/common/js/mixin'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      loading: false,
      showLoading: false,
      circles: []
    }
  },
  components: {
    CircleList
  },
  mounted () {
    this.getCircleList()
  },
  methods: {
    getCircleList (callback) {
      let last = this.circles.length ? this.circles[this.circles.length - 1].time : new Date().toISOString()
      this.showLoading = true
      this.loading = true
      this.$axios.get('/user/getCircles/' + last).then(res => {
        this.circles.push(...res.data.data.circleList)
        if (callback) {
          callback()
        }
        setTimeout(() => {
          this.loading = false
          this.showLoading = false
        }, 2000)
      })
    },
    getPageContent () {
      this.circles = []
      this.getCircleList()
    },
    reload (callback) {
      this.questions = []
      this.getCircleList(callback)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
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
    background $color-article-background
    .container
      z-index 200
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
</style>

