<template>
  <transition name="slide">
    <div class="user-circle">
      <mt-header fixed title="我发表的动态">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="circle-wrapper">

      </div>
    </div>
  </transition>
</template>

<script>
import { accountTestMixin } from '@/common/js/mixin'
import axios from 'axios'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      circles: []
    }
  },
  mounted () {
    this.verifyLogin(this.initData())
  },
  methods: {
    initData () {
      axios.get('http://localhost:7001/user/getCircles', {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.circles = res.data.data
        }
      })
    }
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

