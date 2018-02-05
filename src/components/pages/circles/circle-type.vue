<template>
  <div class="circle-type">
    <circle-list :baseUrl="baseUrl"/>
  </div>
</template>

<script>
import CircleList from '@/components/abstract/circle-list'
export default {
  data () {
    return {
      baseUrl: 'http://localhost:7001/circle/getCircleList/'
    }
  },
  components: {
    CircleList
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== '/circles/all') {
        this.baseUrl = 'http://localhost:7001/circle/getAttentionList/'
      } else {
        this.baseUrl = 'http://localhost:7001/circle/getCircleList/'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle-type
  background #ccc
  padding-top 3px
</style>
