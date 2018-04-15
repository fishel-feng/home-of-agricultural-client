<template>
  <transition name="slide">
    <div class="user-collection">
      <mt-header fixed title="我收藏的文章">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <ul class="wrapper">
        <li class="titleList" v-for="(item,index) in collections" :key="index" @click="showArticleInfo(item.articleId)">{{item.title}}</li>
      </ul>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {BASE_API_PATH} from '@/common/js/util'
  import {accountTestMixin} from '@/common/js/mixin'
  export default {
    mixins: [accountTestMixin],
    data () {
      return {
        collections: []
      }
    },
    mounted () {
      this.verifyLogin(this.initData)
    },
    methods: {
      initData () {
        this.$axios.get(BASE_API_PATH + '/user/getCollections').then(res => {
          this.collections = res.data.data.collections
        })
      },
      showArticleInfo (articleId) {
        this.$router.push(this.$route.path + '/' + articleId)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .user-collection
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .wrapper
      z-index 200
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
      background $color-background
      .titleList
        background $color-article-background
        margin-bottom 3px
        padding 10px
</style>

