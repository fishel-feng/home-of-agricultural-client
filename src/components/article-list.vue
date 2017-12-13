<template>
  <div class="article-list">
    <mt-tab-container class="content">
      <mt-tab-container-item>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li class="list-item" v-for="(item,index) in newsList" :key="index" @click="getInfo(item.articleId)">
              <h2 class="title">{{item.title}}</h2>
              <p class="desc">{{item.desc}}</p>
              <span class="date">{{item.date}}</span>
              <span class="read">
                <img src="../assets/svg/read.svg" alt="" height="8px">
                {{item.read}}
              </span>
          </li>
          <div class="load-wrapper">
            <div class="load-more" v-show="!showLoading" v-text="hasMore"></div>
            <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
          </div>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      newsList: [],
      listId: '',
      page: 1,
      showLoading: false,
      hasMore: '上拉加载更多'
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
    getInfo (articleId) {
      this.$router.push(`/news/${this.listId}/${articleId}`)
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
.content
  padding-top 3px
  .list-item
    display block
    padding 15px
    color black
    .title
      font-size 18px
    .desc
      margin 5px
      font-size 12px
    .date
      font-size 12px
    .read
      float right
      font-size 12px
  .load-wrapper
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
