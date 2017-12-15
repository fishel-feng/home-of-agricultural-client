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
            <mt-button type="primary" v-if="!isCollected" :disabled="isCollected" size="small" class="btn" @click.native="addCollection">收藏文章</mt-button>
            <mt-button type="primary" v-if="isCollected" :disabled="isCollected" size="small" class="btn" @click.native="deleteCollection">取消收藏</mt-button>
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
          <li v-for="(item,index) in article.articleInfo" :key="index">
            <div v-if="item.type === 'word'">{{item.content}}</div>
            <div v-if="item.type === 'image'"><img :src="item.content" alt="" width="100%"></div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      articleId: '',
      article: {},
      isCollected: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
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
    verifyLogin () {
      if (!this.token) {
        MessageBox.confirm('登录可体验更多功能', {
          title: '未登录',
          confirmButtonText: '现在登录',
          cancelButtonText: '以后再说'
        }).then(action => {
          this.$router.push('/signIn')
        }).catch(e => {
        })
        return false
      }
      return true
    },
    addCollection () {
      // todo 检查登录状态，判断收藏状态,未登录 弹出登录提示，登录 请求接口改变收藏状态
      if (this.verifyLogin()) {
        console.log(0)
      }
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
      line-height 20px
</style>
