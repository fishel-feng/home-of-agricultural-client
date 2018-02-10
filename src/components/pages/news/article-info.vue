<template>
  <transition name="slide">
    <div class="article-info">
      <mt-header fixed title="文章详情">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="content-wrapper" ref="wrapper">
        <div class="title">{{article.title}}</div>
        <div class="head-wrapper">
          <div class="btn-wrapper">
            <mt-button type="primary" v-if="!isCollected" size="small" class="btn" @click.native="addToCollection">收藏文章</mt-button>
            <mt-button type="primary" v-if="isCollected" size="small" class="btn" @click.native="deleteFromCollection">取消收藏</mt-button>
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
import { accountTestMixin } from '@/common/js/mixin'
import { Toast } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      articleId: '',
      article: {},
      isCollected: false
    }
  },
  computed: {
    ...mapGetters([
      'collections',
      'token'
    ])
  },
  mounted () {
    this.initData()
  },
  watch: {
    '$route' (to, from) {
      this.initData()
    }
  },
  methods: {
    ...mapActions([
      'addCollection',
      'deleteCollection'
    ]),
    initData () {
      this.articleId = this.$route.params.articleId
      axios.get(`http://localhost:7001/news/getArticleInfo/${this.articleId}`).then(res => {
        if (res && res.data.code === 200) {
          this.article = res.data.data
        }
      })
      this.testCollectionState()
    },
    testCollectionState () {
      if (this.collections.length) {
        this.collections.forEach(element => {
          if (element.articleId === this.articleId) {
            this.isCollected = true
          }
        })
      }
    },
    _addToCollection () {
      const articleId = this.articleId
      const title = this.article.title
      axios.post('http://localhost:7001/news/addToCollections', {
        articleId,
        title
      }, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.addCollection({articleId, title})
          Toast({
            message: '收藏成功',
            position: 'bottom',
            duration: 3000
          })
          this.isCollected = true
        }
      })
    },
    addToCollection () {
      this.verifyLogin(this._addToCollection)
    },
    deleteFromCollection () {
      const articleId = this.articleId
      axios.post('http://localhost:7001/news/deleteFromCollections', {
        articleId
      }, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.deleteCollection(articleId)
          Toast({
            message: '取消收藏成功',
            position: 'bottom',
            duration: 3000
          })
          this.isCollected = false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.article-info
  position fixed
  overflow-y auto
  top 0
  left 0
  width 100%
  height 100%
  z-index 100
  background #fff
  .content-wrapper
    margin-top 40px
    padding 10px
    .title
      font-size 18px
      margin-bottom 20px
    .head-wrapper
      overflow hidden
      padding 10px
      .note
        line-height 16px
        font-size 10px
        float left
      .btn-wrapper
        float right
        height 20px
    .desc
      margin 5px 0
      border-radius 10px
      padding 5px
      font-size 14px
      line-height 20px
      background #eee
    .article-content
      font-size 15px
      padding 10px
      line-height 20px
</style>
