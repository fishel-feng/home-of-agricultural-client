<template>
  <div class="circle-list">
    {{msg}} {{type}}
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 农友圈页面',
      type: 'all',
      circles: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    loadMore () {

    },
    initData () {

    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to)
      this.type = this.$route.params.type
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle-list
  padding-top 3px
</style>
