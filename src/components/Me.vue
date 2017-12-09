<template>
  <div class="news">
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to 我的页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  position: fixed
  width: 100%
  top: 40px
  bottom: 55px
</style>
