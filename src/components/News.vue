<template>
  <div class="news">
    <mt-navbar class="nav" v-model="selected">
      <mt-tab-item @click.native="getList(nav)" v-for="nav in navList" :key="nav.itemName" :id="nav.itemName">{{nav.itemName}}</mt-tab-item>
    </mt-navbar>
    <div class="content">
      <ul
        v-if="selected==='首页'"
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
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      scroll: [],
      hotList: [],
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
    getList (nav) {
      if (nav.navUrl) {
        this.$router.push(`/news/${nav.navUrl}`)
        this.selected = nav.itemName
        return
      }
      this.$router.push('/news')
    },
    // getInfo (id) {
    //   this.$router.push({
    //     path: `/articleInfo/${id}`
    //   })
    //   console.log(id)
    // },
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
  }
}
</script>

<style lang="stylus" scoped>
.news
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
</style>
