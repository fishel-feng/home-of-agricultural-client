<template>
  <div class="news">
    <mt-navbar class="nav" v-model="selected">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
      <mt-tab-item id="3">选项三</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="content" v-model="selected">
      <mt-tab-container-item id="1">
        <ul
          class="main"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li>
            <mt-swipe class="swipe" :auto="4000">
              <mt-swipe-item class="swipe-item" v-for="(item,index) in scroll" :key="index">
                <img class="image" :src="item.imageUrl" alt="" width="100%" height="100%">
              </mt-swipe-item>
            </mt-swipe>
          </li>
          <li v-for="item in newslist" :key="item.rank">
            {{item.rank}} {{item.title}}
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
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
      newslist: [],
      selected: '1'
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      axios.get('http://127.0.0.1:7001/news/getArticleIndex').then(res => {
        this.scroll = res.data.data.scroll
        this.newslist = res.data.data.todayNews
      })
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.newslist[this.newslist.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.newslist.push(last + i)
        }
        this.loading = false
      }, 2500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  position: relative
  width: 100%
  top: 40px
  padding-bottom: 55px
  .content
    .swipe
      height 215px
      position relative
</style>
