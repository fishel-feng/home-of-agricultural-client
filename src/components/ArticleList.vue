<template>
  <div class="article-list">
    <mt-tab-container class="content">
      <mt-tab-container-item>
        <ul
          class="main"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li v-for="(item,index) in newsList" :key="index" @click="getInfo(item.articleId)">
            <div class="list-item">
              <h2 class="title">{{item.title}}</h2>
              <p class="desc">{{item.desc}}</p>
              <span class="date">{{item.date}}</span>
              <span class="read">
                <img src="../assets/svg/read.svg" alt="" height="8px">
                {{item.read}}
              </span>
            </div>
          </li>
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
      listId: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      // this.listId = this.$route.params.listId
      this.getContent(1)
    },
    getContent (page) {
      axios.get(`http://localhost:7001/news/getArticleListByPage/${this.listId}/${page}`).then(res => {
        this.newsList = res.data.data.articles
      })
    },
    getInfo (id) {
      this.$router.push({
        path: `/news/${this.listId}/${id}`
      })
      console.log(id)
    },
    loadMore () {
      // this.loading = true
      // setTimeout(() => {
      //   let last = this.hotList[this.hotList.length - 1]
      //   for (let i = 1; i <= 10; i++) {
      //     this.hotList.push(last + i)
      //   }
      //   this.loading = false
      // }, 2500)
    }
  },
  watch: {
    '$route' (to, from) {
      this.listId = to.path.slice(6)
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-list
  position: relative
  width: 100%
  // padding-bottom: 55px
  .content
    padding-top 3px
    .list-item
      display block
      overflow hidden
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
