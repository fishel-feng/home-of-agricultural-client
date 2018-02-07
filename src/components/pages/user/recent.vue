<template>
  <!-- <transition name="slide"> -->
  <div class="recent">
    <mt-header title="最近联系的人">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <person-list @select="sendMessage" :showButton="true" :text="'发消息'" :data="recent"/>
  </div>
  <!-- </transition> -->
</template>

<script>
  import axios from 'axios'
  import {accountTestMixin} from '@/common/js/mixin'
  import PersonList from '@/components/abstract/person-list'
  export default {
    mixins: [accountTestMixin],
    components: {
      PersonList
    },
    data () {
      return {
        recent: []
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      sendMessage (item) {
        this.$router.push(`/chat?userId=${item.userId}&userName=${item.nickName}`)
      },
      initData () {
        axios.get('http://127.0.0.1:7001/user/getRecent', {
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.recent = res.data.data.recent
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .recent
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
</style>
