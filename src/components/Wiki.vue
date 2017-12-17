<template>
  <div class="wiki">
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '百科页面，正在建设中...'
    }
  }
}
</script>

<style lang="stylus" scoped>
.wiki
  margin-bottom 55px
  width: 100%
</style>
