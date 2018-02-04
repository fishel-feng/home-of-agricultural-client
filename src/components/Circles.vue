<template>
  <div class="circle">
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">全部动态</mt-tab-item>
      <mt-tab-item id="attention">关注的人</mt-tab-item>
    </mt-navbar>
    <router-view></router-view>
    <div class="btn-add" @click="addCircle">+</div>
  </div>
</template>

<script>
import { accountTestMixin } from '@/common/js/mixin'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      msg: 'Welcome to 农友圈页面',
      selected: this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1)
    }
  },
  methods: {
    addCircle () {
      this.verifyLogin(() => {
        this.$router.push('/addCircle')
      })
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal === 'attention') {
        this.verifyLogin(() => {
          this.$router.push(`/circles/attention`)
        })
      } else {
        this.$router.push(`/circles/all`)
      }
    },
    '$route' (to, from) {
      if (to.path === '/circles/all') {
        this.selected = 'all'
      } else if (to.path === '/circles/attention') {
        this.selected = 'attention'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle
  margin-bottom 55px
  width: 100%
  .btn-add
    font-weight bolder
    font-size 35px
    text-align center
    line-height 45px
    width 50px
    height 50px
    border-radius 50%
    position fixed
    right 10px
    bottom 65px
    color #fff
    background-color #26a2ff
</style>
