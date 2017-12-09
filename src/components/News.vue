<template>
  <div class="news">
    <mt-swipe class="swipe" :auto="4000">
      <mt-swipe-item class="swipe-item" v-for="(item,index) in scroll" :key="index">
        <img class="image" :src="item.imageUrl" alt="" height="160px">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 新闻页面',
      scroll: []
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  position: fixed
  width: 100%
  top: 40px
  bottom: 55px
  .swipe
    height 160px
    .swipe-item
      position relative
      .image
        position absolute
        left auto
        right auto
</style>
