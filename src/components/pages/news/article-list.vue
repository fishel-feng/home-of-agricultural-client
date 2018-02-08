<template>
  <div class="article-list">
    <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" :infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <li v-for="news in newsList" @click="getInfo(news)" class="list-item">
        <h2 class="title">{{news.title}}</h2>
        <p class="desc">{{news.desc}}</p>
        <span class="date">{{news.date}}</span>
        <span class="read">
          <img src="../../../assets/svg/read.svg" alt="" height="8px">
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
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      newsList: [],
      listId: '',
      page: 1,
      showLoading: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.listId = this.$route.params.listId
      this.page = 1
      this.getContent(this.page)
    },
    getContent (page) {
      axios.get(`http://localhost:7001/news/getArticleListByPage/${this.listId}/${page}`).then(res => {
        if (res && res.data.code === 200) {
          if (page === 1) {
            this.newsList = res.data.data.articles
            this.page++
          } else {
            if (res.data.data.articles.length) {
              this.newsList.push(...res.data.data.articles)
              this.page++
            } else {
              this.hasMore = '已无更多新闻'
            }
          }
        }
      })
    },
    getInfo (article) {
      this.$router.push(`/news/${this.listId}/${article.articleId}`)
    },
    loadMore () {
      this.loading = true
      this.showLoading = true
      this.getContent(this.page)
      setTimeout(() => {
        this.loading = false
        this.showLoading = false
      }, 6500)
    }
  },
  watch: {
    '$route' (to, from) {
      this.initData()
      this.listId = to.path.slice(6)
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-list
  background #ccc
  padding-top 3px
  .list-item
    background #fff
    margin-bottom 3px
    display block
    padding 15px
    .title
      font-weight bold
      font-size 18px
    .desc
      margin 5px
      font-size 14px
      color #4b4b4b
    .date
      font-size 12px
    .read
      float right
      font-size 12px
  .load-wrapper
    padding-top 10px
    background #fff
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
