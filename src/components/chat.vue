<template>
  <div class="chat">
    <mt-header fixed :title="this.$route.query.userName">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="messages">
      <!--todo-->
    </div>
    <div class="input-area">
      <mt-field class="input-text" type="text" v-model="message"/>
      <mt-button class="btn-submit" type="primary" size="small" >发送</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
.chat
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  .messages
    margin-top 40px
    margin-bottom 48px
  .input-area
    width 100%
    height 48px
    display flex
    position fixed
    bottom 0
    .input-text
      flex 1
      border-radius 10px
      border #218dff solid 1px
    .btn-submit
      height 100%
      width 60px
</style>
