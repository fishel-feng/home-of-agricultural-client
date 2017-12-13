<template>
  <div class="circle">
    <mt-navbar v-model="selected">
      <mt-tab-item id="all">全部动态</mt-tab-item>
      <mt-tab-item id="attention">关注的人</mt-tab-item>
    </mt-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 农友圈页面',
      selected: 'all'
    }
  },
  watch: {
    selected (newVal, oldVal) {
      this.$router.push(`/circles/${newVal}`)
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
  overflow-y:auto
  position: fixed
  width: 100%
  top: 40px
  bottom: 55px
</style>
