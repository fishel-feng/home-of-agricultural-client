<template>
  <div class="user">
    {{msg}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to 我的页面',
      popupVisible: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.user
  position: fixed
  width: 100%
  top: 40px
  bottom: 55px
</style>
