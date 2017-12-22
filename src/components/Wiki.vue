<template>
  <div class="wiki">
    <div ref="wrapper">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <ul>
          <li v-for="item in list">{{ item }}</li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    loadTop () {
      setTimeout(() => {
        // 这里发送请求
        let firstValue = this.list[0]
        for (let i = 1; i <= 10; i++) {
          this.list.unshift(firstValue - i)
        }
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    }
  },
  created () {
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
</style>
