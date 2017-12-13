<template>
  <div class="article-list">
    <list-view :data="newsList" :showLoading="showLoading" :loadMore="hasMore" :loading="true" @load="loadMore">
      <li
        slot="item"
        slot-scope="props"
        @click="getInfo"
        class="list-item">
        <h2 class="title">{{props.item.title}}</h2>
        <p class="desc">{{props.item.desc}}</p>
        <span class="date">{{props.item.date}}</span>
        <span class="read">
          <img src="../assets/svg/read.svg" alt="" height="8px">
          {{props.item.read}}
        </span>
      </li>
    </list-view>
  </div>
</template>

<script>
import axios from 'axios'
import ListView from '@/components/list-view'
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
  components: {
    ListView
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
</style>
