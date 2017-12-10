<template>
  <div class="news">
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
      <li v-for="(item,index) in list" :key="index">gberiuhgueuib<br><br>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 新闻页面',
      scroll: [],
      list: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:7001/news/getArticleIndex'
        // headers: {'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'}
      }).then(res => {
        this.scroll = res.data.data.scroll
      })
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
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
  .swipe
    height 215px
    position relative
    .swipe-item
      .image
        position absolute
        left auto
        right auto
</style>
