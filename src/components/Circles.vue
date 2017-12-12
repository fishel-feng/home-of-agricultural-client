<template>
  <div class="news" @click="clickMe">
    {{msg}}
    <!-- <message-box title="sdf"></message-box> -->
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      msg: 'Welcome to 农友圈页面'
    }
  },
  components: {
    MessageBox
  },
  methods: {
    clickMe () {
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      })
      // MessageBox.confirm('您还未登录，是否立即登录').then(action => {
      //   console.log(action)
      // })
      // this.$refs.messageBox.confirm('您还未登录，是否立即登录').then(action => {
      //   console.log(action)
      // })
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
