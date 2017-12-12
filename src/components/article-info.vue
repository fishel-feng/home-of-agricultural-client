<template>
  <transition name="slide" class="article-info">
    <div class="article-info">
      <mt-header fixed title="文章详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content-wrapper" ref="wrapper">
        <div class="title">{{article.title}}</div>
        <div class="head-wrapper">
          <div class="btn-wrapper">
            <mt-button type="primary" v-text="isCollected?'取消收藏':'收藏文章'" :disabled="isCollected" size="small" class="btn" @click.native="addCollection">
            </mt-button>
          </div>
          <div class="note">
            <span class="from">{{article.from}}</span>
            <span class="time">{{article.time}}</span><br>
            <span class="read">{{article.read}}</span>
          </div>
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
      article: {},
      isCollected: false
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
    addCollection () {
      // todo 检查登录状态，判断收藏状态,未登录 弹出登录提示，登录 请求接口改变收藏状态
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
    margin-top 40px
    padding 10px
    .title
      font-size 18px
      margin-bottom 20px
    .head-wrapper
      overflow hidden
      padding 20px
      .note
        line-height 16px
        font-size 10px
        float left
      .btn-wrapper
        float right
        height 20px
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
