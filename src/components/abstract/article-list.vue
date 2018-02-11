<template>
  <div class="article-list">
    <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" :infinite-scroll-distance="15" infinite-scroll-immediate-check="false">
      <li v-for="news in newsList" @click="getArticleInfo(news)" class="list-item">
        <h2 class="title">{{news.title}}</h2>
        <p class="desc">{{news.desc}}</p>
        <span class="date">{{news.date}}</span>
        <span class="read">
          <img src="../../assets/svg/read.svg" alt="" height="8px">
          {{news.read}}
        </span>
      </li>
      <div class="load-wrapper">
        <div class="load-more" v-show="!showLoading">加载更多</div>
        <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
      </div>
    </ul>
    <router-view/>
  </div>
</template>

<script>
  import {goToRelativePathMixin} from '@/common/js/mixin'
  export default {
    mixins: [goToRelativePathMixin],
    props: {
      newsList: {
        type: Array,
        default: []
      },
      loading: {
        type: Boolean,
        default: false
      },
      showLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getArticleInfo (article) {
        this.goToRelativePath(article.articleId)
      },
      loadMore () {
        this.$emit('load')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable"
  .article-list
    padding-top 3px
    .list-item
      background $color-list-item-background
      margin-bottom 3px
      display block
      padding 15px
      .title
        font-weight bold
        font-size $font-size-large
      .desc
        margin 5px
        font-size $font-size-medium
        color #4b4b4b
      .date
        font-size $font-size-small
      .read
        float right
        font-size $font-size-small
    .load-wrapper
      padding-top 10px
      background $color-list-item-background
      position relative
      width 100%
      height 30px
      text-align center
      font-size $font-size-medium
</style>
