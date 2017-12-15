<template>
  <div class="user">
    {{msg}}
    <router-view></router-view>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      msg: 'Welcome to 我的页面',
      popupVisible: false
    }
  },
  mounted () {
    // MessageBox.confirm('确定执行此操作?', {closeOnClickModal: false}).then(action => {
    //   console.log(action)
    // }).catch(e => {
    //   console.log(e)
    // })
    MessageBox.confirm('登录可体验更多功能', {
      title: '未登录',
      confirmButtonText: '现在登录',
      cancelButtonText: '以后再说'
    }).then(action => {
      console.log(0)
    }).catch(e => {
    })
  }
}
</script>

<style lang="stylus" scoped>
.user
  position fixed
  width 100%
  top 40px
  bottom 55px
</style>
