<template>
  <div class="user-edit">
    <mt-header fixed title="编辑个人资料">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="container">
      {{this.$route.query.id}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //
      }
    }
  }
</script>

<style lang="stylus" scoped>
.user-edit
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  .container
    margin-top 40px
</style>
