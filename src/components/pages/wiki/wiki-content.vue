<template>
  <transition name="slide">
    <div class="wiki-content">
      <mt-header fixed :title="$route.query.keyWord">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <div class="article" v-for="(item, index) in wiki" :key="index">
          <div class="title" v-if="item.type==='title'">{{item.content}}</div>
          <div class="main-area" v-else-if="item.type==='main'">{{item.content}}</div>
          <div class="inner-title" v-else-if="item.type==='innerTitle'">{{item.content}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        wiki: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        // todo 百科查询，登录注册，权限跳转
        this.$axios.get('/wiki/getWiki/' + this.$route.query.keyWord).then(res => {
          if (res.data.code) {
            this.wiki = res.data.data
          }
        })
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
  .wiki-content
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      position fixed
      overflow-y auto
      top 40px
      bottom 0
      width 100%
      .article
        padding 5px
        .title
          text-align center
          font-size $font-size-large-x
          color $color-user-name
        .main-area
          line-height 20px
        .inner-title
          font-size $font-size-large
          color $color-can-be-click
</style>
