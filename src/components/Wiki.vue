<template>
  <div class="wiki">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
      <li v-for="item in list" class="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0
    }
  },
  deactivated () {
    this.loading = true
  },
  activated () {
    this.loading = false
  },
  methods: {
    loadMore () {
      // this.loading = true
      console.log(0)
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        // this.loading = false
      }, 2500)
    }
  },
  mounted () {
    for (let i = 1; i <= 20; i++) {
      this.list.push(i)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wiki
  margin-bottom 55px
  width: 100%
  .item
    height 40px
    background #ccc
</style>
