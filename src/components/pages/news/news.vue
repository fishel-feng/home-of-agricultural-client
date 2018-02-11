<template>
  <div class="news">
    <mt-navbar @click.native="getPageContent" class="nav" v-model="selected">
      <mt-tab-item v-for="nav in navList" :key="nav.itemName" :id="nav.navUrl">{{nav.itemName}}</mt-tab-item>
    </mt-navbar>
    <div class="content">
      <div v-if="!selected">
        <div>
          <mt-swipe class="swipe" :auto="4000">
            <mt-swipe-item @click.native="getArticleInfo(item.articleId)" class="swipe-item" v-for="(item,index) in scroll" :key="index">
              <span class="title">{{item.title}}</span>
              <img class="image" :src="item.imageUrl" alt="" width="100%" height="100%">
            </mt-swipe-item>
          </mt-swipe>
          <div class="main-wrapper">
            <div class="today-hot-wrapper">
              <div class="today-hot">
                <img src="../../../assets/svg/hot.svg" alt="" width="20px">
                今日热点
              </div>
            </div>
            <ul>
              <li @click="getArticleInfo(item.articleId)" v-for="item in hotList" :key="item.rank" class="list-wrapper">
                {{item.rank}} {{item.title}}
              </li>
            </ul>
          </div>
          <router-view/>
        </div>
      </div>
      <div v-else>
        <article-list @load="getArticleList" :newsList="newsList" :loading="loading" :showLoading="showLoading"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ArticleList from '@/components/abstract/article-list'
  export default {
    data () {
      return {
        navList: [{itemName: '首页', navUrl: ''},
          {itemName: '头条', navUrl: 'toutiao'},
          {itemName: '热点', navUrl: 'redian'},
          {itemName: '种植', navUrl: 'zhongzhi'},
          {itemName: '养殖', navUrl: 'yangzhi'},
          {itemName: '农资', navUrl: 'nongzi'},
          {itemName: '电商', navUrl: 'dianshang'},
          {itemName: '休闲', navUrl: 'xiuxian'},
          {itemName: '全部', navUrl: 'list'}],
        selected: '',
        scroll: [],
        hotList: [],
        newsList: [],
        page: 1,
        loading: false,
        showLoading: false
      }
    },
    components: {
      ArticleList
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        axios.get('http://127.0.0.1:7001/news/getArticleIndex').then(res => {
          if (res.data.code === 200) {
            this.scroll = res.data.data.scroll
            this.hotList = res.data.data.todayNews
          }
        })
      },
      getPageContent () {
        if (this.selected) {
          this.newsList = []
          this.page = 1
          this.getArticleList()
        }
      },
      getArticleInfo (id) {
        this.$router.push('/news/' + id)
      },
      getArticleList () {
        this.showLoading = true
        this.loading = true
        axios.get(`http://localhost:7001/news/getArticleListByPage/${this.selected}/${this.page}`).then(res => {
          if (this.newsList.length) {
            setTimeout(() => {
              this.loading = false
              this.showLoading = false
            }, 2000)
          }
          this.newsList.push(...res.data.data.articles)
        })
        this.page++
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .news
    width 100%
    .nav
      width 100%
    .content
      background $color-background
      .swipe
        padding-top 3px
        height 215px
        position relative
        .title
          position absolute
          padding 5px
          top 20px
          background $color-news-title-background
      .main-wrapper
        background rgba(153,255,255,0.3)
        padding 10px
        .today-hot-wrapper
          font-size 20px
          padding 20px
          .today-hot
            padding 10px
            margin 5px
            background #9cf
            text-align center
        .list-wrapper
          padding 10px
          font-size 16px
          margin 20px
</style>
