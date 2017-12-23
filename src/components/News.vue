<template>
  <div class="news">
    <mt-navbar fixed class="nav" v-model="selected">
      <mt-tab-item @click.native="getList(nav)" v-for="nav in navList" :key="nav.itemName" :id="nav.itemName">{{nav.itemName}}</mt-tab-item>
    </mt-navbar>
    <div class="content">
      <ul v-if="selected==='首页'">
        <li>
          <mt-swipe class="swipe" :auto="4000">
            <mt-swipe-item @click.native="getInfo(item.articleId)" class="swipe-item" v-for="(item,index) in scroll" :key="index">
              <span class="title">{{item.title}}</span>
              <img class="image" :src="item.imageUrl" alt="" width="100%" height="100%">
            </mt-swipe-item>
          </mt-swipe>
        </li>
        <div class="main-wrapper">
          <div class="today-hot-wrapper">
            <div class="today-hot">
              <img src="../assets/svg/hot.svg" alt="" width="20px">
              今日热点
            </div>
          </div>
          <li @click="getInfo(item.articleId)" v-for="item in hotList" :key="item.rank" class="list-wrapper">
              {{item.rank}} {{item.title}}
          </li>
        </div>
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
    getInfo (id) {
      this.$router.push({
        path: `/news/index/${id}`
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.navList.forEach(element => {
        if (to.path.substring(6) === element.navUrl) {
          this.selected = element.itemName
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  margin-bottom 55px
  width: 100%
  .nav
    width 100%
  .content
    // background #ccc
    margin-top 6px
    .swipe
      background #ccc
      padding-top 3px
      height 215px
      position relative
      .title
        position absolute
        padding 5px
        top 20px
        background rgba(204,204,204,0.5)
    .main-wrapper
      background rgba(153,255,255,0.3)
      padding 10px
      .today-hot-wrapper
        font-size 20px
        padding 20px
        .today-hot
          margin 5px
          background #9cf
          text-align center
      .list-wrapper
        padding 10px
        font-size 16px
        margin 20px
</style>
