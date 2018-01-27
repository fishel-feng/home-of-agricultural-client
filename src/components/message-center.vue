<template>
  <transition name="slide">
    <div class="message-center">
      <mt-header fixed title="消息中心">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="message-container">
        <div class="message-item">第一条消息</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      messages: [] // todo
    }
  },
  sockets: {
    chat () {
      //
    },
    like () {
      //
    },
    comment () {
      //
    },
    follow () {
      //
    },
    invite () {
      //
    },
    answer () {
      //
    },
    attention () {
      //
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.message-center
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  .message-container
    margin-top 40px
    .message-item
      min-height 60px
      display flex
      justify-content center
      align-items center
      padding 10px
      background radial-gradient(#ccc, #fff);
</style>

