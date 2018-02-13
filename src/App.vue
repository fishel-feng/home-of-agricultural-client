<template>
<div id="app">
  <mt-header fixed :title="title[$route.path.slice(1)]">
    <div class="icon-wrapper" slot="right" @click="showMessageCenter">
      <div v-show="messageCount!==0" class="dot"></div>
      <img class="message-icon" src="./assets/svg/message.svg" height="20px" width="20px">
    </div>
  </mt-header>
  <div class="main">
    <router-view></router-view>
  </div>
  <mt-tabbar @click.native="selectItem" v-model="selected" class="tail-tab">
    <mt-tab-item  id="news">
      <img slot="icon" src="./assets/svg/home.svg"> 新闻
    </mt-tab-item>
    <mt-tab-item id="wiki">
      <img slot="icon" src="./assets/svg/wiki.svg"> 百科
    </mt-tab-item>
    <mt-tab-item id="question">
      <img slot="icon" src="./assets/svg/question.svg"> 问专家
    </mt-tab-item>
    <mt-tab-item id="circles">
      <img slot="icon" src="./assets/svg/circle.svg"> 农友圈
    </mt-tab-item>
    <mt-tab-item id="user">
      <img slot="icon" src="./assets/svg/user.svg"> 我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
  import axios from 'axios'
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { accountTestMixin } from '@/common/js/mixin'
  export default {
    mixins: [accountTestMixin],
    name: 'app',
    data () {
      return {
        selected: 'news',
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
        if (this.selected === 'news' && this.selected === 'wiki') {
          this.verifyLogin(() => {
            this.$router.push('/' + this.selected)
          })
        } else {
          this.$router.push('/' + this.selected)
        }
      },
      showMessageCenter () {
        this.$router.push('/message')
      },
      ...mapActions([
        'addMessages',
        'saveUserInfo'
      ]),
      ...mapMutations({
        setMessage: 'SET_MESSAGES',
        setUserCount: 'SET_USER_COUNT'
      }),
      initData () {
        axios.get('/user/showMessage').then(res => {
          this.messages = res.data.data.messages
          this.setMessage(this.messages)
        })
        axios.get('/user/getUserIndex').then(res => {
          this.saveUserInfo(res.data.data.user)
        })
      }
    },
    computed: {
      ...mapGetters([
        'userCount'
      ])
    },
    watch: {
      '$route' (to, from) {
        this.selected = to.path.slice(1)
        if (from.path === '/message') {
          this.messageCount = 0
          this.setUserCount(0)
        }
      }
    },
    sockets: {
      chatMessage (userCount) {
        this.setUserCount(userCount)
      },
      chat (content) {
        this.messageCount++
        this.setUserCount(this.userCount + 1)
      },
      message (content) {
        if (content) {
          this.addMessages(content)
        }
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
  .main
    z-index 1
    position fixed
    overflow-y auto
    top 40px
    bottom 55px
    width 100%
  .tail-tab
    position fixed
</style>
