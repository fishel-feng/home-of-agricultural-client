<template>
<div id="app">
  <mt-header :title="title">
    <div class="icon-wrapper" slot="right" @click="showMessageCenter">
      <div v-show="messageCount!==0" class="dot"></div>
      <img class="message-icon" src="./assets/svg/message.svg" height="20px" width="20px">
    </div>
  </mt-header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <mt-tabbar v-model="selected" class="tail-tab">
    <mt-tab-item @click.native="selectItem(item)" :id="item.id" v-for="(item,index) in tailList" :key="index">
      <img slot="icon" :src="`http://127.0.0.1:7001/public/svg/${item.image}.svg`"> {{item.text}}
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      oldSelect: '',
      selected: 'news',
      title: '新闻',
      messageCount: 0,
      tailList: [
        {
          id: 'news',
          text: '新闻',
          image: 'home'
        },
        {
          id: 'wiki',
          text: '百科',
          image: 'wiki'
        },
        {
          id: 'question',
          text: '问专家',
          image: 'question'
        },
        {
          id: 'circles/all',
          text: '农友圈',
          image: 'circle'
        },
        {
          id: 'user',
          text: '我的',
          image: 'user'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    selectItem (item) {
      if (this.verifyLogin()) {
        this.selected = item.id
        this.title = item.text
        this.$router.push('/' + this.selected)
      } else {
        // todo 停止跳转逻辑
        // this.selected = this.oldSelect
      }
    },
    verifyLogin () {
      if (!this.token) {
        MessageBox.confirm('登录可体验更多功能', {
          title: '未登录',
          confirmButtonText: '现在登录',
          cancelButtonText: '以后再说'
        }).then(action => {
          this.$router.push('/signIn')
        }).catch(e => {
        })
        return false
      }
      return true
    },
    showMessageCenter () {
      this.$router.push('/message')
    }
  },
  watch: {
    '$route' (to, from) {
      this.tailList.forEach(element => {
        if (to.path.substring(1).startsWith(element.id)) {
          this.selected = element.id
          this.title = element.text
        }
      })
    },
    selected (newVal, oldVal) {
      this.oldSelect = oldVal
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
