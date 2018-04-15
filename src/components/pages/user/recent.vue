<template>
  <transition name="slide">
    <div class="recent">
      <mt-header title="最近联系的人">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <person-list @select="sendMessage" :showButton="true" :text="'发消息'" :data="recent"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {BASE_API_PATH} from '@/common/js/util'
  import {accountTestMixin, goToRelativePathMixin} from '@/common/js/mixin'
  import PersonList from '@/components/abstract/person-list'
  export default {
    mixins: [accountTestMixin, goToRelativePathMixin],
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
        this.goToRelativePath(`chat?userId=${item.userId}&userName=${item.nickName}`)
      },
      initData () {
        this.$axios.get(BASE_API_PATH + '/user/getRecent').then(res => {
          if (res.data.code === 200) {
            this.recent = res.data.data.recent
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        if (from.path === '/user/recent/chat' && from.query.userId) {
          this.recent.forEach(item => {
            if (item.userId === from.query.userId) {
              item.newMessage = false
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
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
    background $color-article-background
    .container
      z-index 200
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
</style>
