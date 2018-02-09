<template>
<div id="app">
  <mt-header :title="title[$route.path.slice(1)]">
    <div class="icon-wrapper" slot="right" @click="showMessageCenter">
      <div v-show="messageCount!==0" class="dot"></div>
      <img class="message-icon" src="./assets/svg/message.svg" height="20px" width="20px">
    </div>
  </mt-header>
  <router-view/>
  <mt-tabbar v-model="selected" class="tail-tab">
    <mt-tab-item @click.native="selectItem" id="news">
      <img slot="icon" src="./assets/svg/home.svg"> 新闻
    </mt-tab-item>
    <mt-tab-item @click.native="selectItem" id="wiki">
      <img slot="icon" src="./assets/svg/wiki.svg"> 百科
    </mt-tab-item>
    <mt-tab-item @click.native="selectItem" id="question">
      <img slot="icon" src="./assets/svg/question.svg"> 问专家
    </mt-tab-item>
    <mt-tab-item @click.native="selectItem" id="circles">
      <img slot="icon" src="./assets/svg/circle.svg"> 农友圈
    </mt-tab-item>
    <mt-tab-item @click.native="selectItem" id="user">
      <img slot="icon" src="./assets/svg/user.svg"> 我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'
import { accountTestMixin } from '@/common/js/mixin'
export default {
  mixins: [accountTestMixin],
  name: 'app',
  data () {
    return {
      oldSelect: '',
      selected: this.$route.path.slice(1),
      messageCount: 0,
      title: { news: '新闻', wiki: '百科', question: '问专家', circles: '农友圈', user: '我的' }
    }
  },
  mounted () {
    this.verifyLogin(() => {
      this.$socket.emit('login', this.token)
      this.initData()
    })
  },
  methods: {
    selectItem () {
      this.$router.push('/' + this.selected)
    },
    showMessageCenter () {
      this.$router.push('/message')
    },
    ...mapActions([
      'addMessages'
    ]),
    ...mapMutations({
      setMessage: 'SET_MESSAGES'
    }),
    initData () {
      axios.get('http://127.0.0.1:7001/user/showMessage').then(res => {
        this.messages = res.data.data.messages
        this.setMessage(this.messages)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log(to.path)
      // todo 重构路由结构，提取抽象组件
      this.selected = to.path.slice(1)
      // this.$router.push('/' + this.selected)
      // this.tailList.forEach(element => {
      //   if (to.path.substring(1).startsWith(element.id)) {
      //     this.title = element.text
      //   }
      // })
      // if (from.path === '/message') {
      //   this.messageCount = 0
      // }
    },
    selected (newVal, oldVal) {
      this.oldSelect = oldVal
    }
  },
  sockets: {
    chat () {
      //
    },
    message (content) {
      this.addMessages(content)
      this.messageCount++
    }
  }
}
</script>

<style lang="stylus">
.icon-wrapper
  position relative
  .dot
    position absolute
    width 4px
    height 4px
    background red
    border 2px red solid
    border-radius 50%
    right 2px
    top -12px
    z-index 1
  .message-icon
    display block
    bottom -8px
    right 3px
    position absolute
.tail-tab
  position fixed
</style>
