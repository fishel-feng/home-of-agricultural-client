<template>
  <transition name="slide" class="article-info">
    <div class="article-info">
      <mt-header title="文章详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content-wrapper" ref="wrapper">
        <div class="title">{{article.title}}</div>
        <div class="btn-wrapper">
          <mt-button type="primary" size="small" class="btn">收藏文章</mt-button>
        </div>
        <div class="note">
          <span class="from">{{article.from}}</span>
          <span class="time">{{article.time}}</span>
          <span class="read">{{article.read}}</span>
        </div>
        <div class="desc">{{article.desc}}</div>
        <hr>
        <ul class="article-content">
          <li v-for="(item,index) in article.content" :key="index">
            <div v-if="hasImage(item)">
              <!-- 无效？？？ -->
              <img :src="getImageUrl()" width="200px">
            </div>
            <div v-else>
              {{item}}<br><br>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
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
        if (res && res.data.code === 200) {
          this.article = res.data.data
        }
      })
    },
    hasImage (item) {
      return (item === '' && this.article.images.length)
    },
    getImageUrl () {
      let url = this.article.images.shift()
      return url
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
  overflow-y:auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background: #fff
  .content-wrapper
    padding 10px
    .title
      font-size 18px
      margin-bottom 20px
    .btn-wrapper
      height 20px
      position relative
      padding 5px
      .btn
        position absolute
        right 0
    .note
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
    .article-content
      font-size 15px
      padding 10px
      text-indent 30px
      line-height 20px
</style>
