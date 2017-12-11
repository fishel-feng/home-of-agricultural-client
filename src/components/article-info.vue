<template>
  <transition name="slide" class="article-info">
    <div class="article-info">
      <mt-header title="文章详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content-wrapper">
        <div class="title">{{article.title}}</div>
        <div class="note">
          <span class="from">{{article.from}}</span>
          <span class="time">{{article.time}}</span>
          <span class="read">{{article.read}}</span>
        </div>
        <div class="desc">{{article.desc}}</div>
        <hr>
        <ul>
          <li v-for="(item,index) in article.content" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/components/scroll'
import axios from 'axios'
export default {
  components: {
    Scroll
  },
  data () {
    return {
      articleId: '',
      article: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.articleId = this.$route.params.articleId
      axios.get(`http://localhost:7001/news/getArticleInfo/${this.articleId}`).then(res => {
        this.article = res.data.data
        console.log(this.article)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.article-info
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background: #ffffff
  .content-wrapper
    padding 10px
    .title
      font-size 18px
    .note
      overflow hidden
      padding 15px
      font-size 10px
      .from
        padding-right 10px
      .read
        float right
    .desc
      padding 5px
      font-size 14px
      line-height 20px
      background #eee
</style>
