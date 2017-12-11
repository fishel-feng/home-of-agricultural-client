<template>
  <div class="news">
    <mt-navbar class="nav" v-model="selected">
      <mt-tab-item v-for="nav in navList" :key="nav.itemName" :id="nav.itemName">{{nav.itemName}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="content" v-model="selected">
      <mt-tab-container-item id="首页">
        <ul
          class="main"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li>
            <mt-swipe class="swipe" :auto="4000">
              <mt-swipe-item class="swipe-item" v-for="(item,index) in scroll" :key="index">
                <span class="title">{{item.title}}</span>
                <img class="image" :src="item.imageUrl" alt="" width="100%" height="100%">
              </mt-swipe-item>
            </mt-swipe>
          </li>
          <li v-for="item in hotList" :key="item.rank">
            {{item.rank}} {{item.title}}
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 新闻页面',
      scroll: [],
      hotList: [],
      newsList: [],
      navList: [],
      selected: '首页'
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      axios.get('http://127.0.0.1:7001/news/getArticleIndex').then(res => {
        this.scroll = res.data.data.scroll
        this.hotList = res.data.data.todayNews
        this.navList = res.data.data.navItem
      })
    },
    getContent (url, page) {
      axios.get(`http://localhost:7001/news/getArticleListByPage/${url}/${page}`).then(res => {
        this.newsList = res.data.data.articles
      })
    },
    getInfo (id) {
      this.$router.push({
        path: `/articleInfo/${id}`
      })
      console.log(id)
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.hotList[this.hotList.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.hotList.push(last + i)
        }
        this.loading = false
      }, 2500)
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal !== '首页') {
        this.navList.forEach(element => {
          if (newVal === element.itemName) {
            this.getContent(element.navUrl, 1)
            // this.$router.push(`/news/${element.navUrl}`)
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  margin-top 40px
  margin-bottom 55px
  position: relative
  width: 100%
  .content
    padding-top 3px
    .swipe
      height 215px
      position relative
      .title
        position absolute
        top 20px
        background #ccc
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
