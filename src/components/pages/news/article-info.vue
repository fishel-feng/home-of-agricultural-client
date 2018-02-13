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
  import {accountTestMixin} from '@/common/js/mixin'
  import {Toast} from 'mint-ui'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    mixins: [accountTestMixin],
    data () {
      return {
        article: {}
      }
    },
    computed: {
      ...mapGetters([
        'collections',
        'token'
      ]),
      isCollected () {
        let res = false
        if (this.collections.length) {
          this.collections.forEach(element => {
            if (element.articleId === this.$route.params.articleId) {
              res = true
            }
          })
        }
        return res
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      ...mapActions([
        'addCollection',
        'deleteCollection'
      ]),
      initData () {
        this.$axios.get(`/news/getArticleInfo/${this.$route.params.articleId}`).then(res => {
          if (res && res.data.code === 200) {
            this.article = res.data.data
          }
        })
      },
      addToCollection () {
        this.verifyLogin(() => {
          const articleId = this.$route.params.articleId
          const title = this.article.title
          this.$axios.post('/news/addToCollections', {
            articleId,
            title
          }).then(res => {
            if (res.data.code === 200) {
              this.addCollection({articleId, title})
              Toast({
                message: '收藏成功',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        })
      },
      deleteFromCollection () {
        this.verifyLogin(() => {
          const articleId = this.$route.params.articleId
          this.$axios.post('/news/deleteFromCollections', {
            articleId
          }).then(res => {
            if (res.data.code === 200) {
              this.deleteCollection(articleId)
              Toast({
                message: '取消收藏成功',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .article-info
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 500
    background $color-article-background
    .content-wrapper
      position fixed
      z-index 500
      overflow-y auto
      top 40px
      bottom 0
      padding $font-size-small-s
      .title
        font-size $font-size-large
        margin-bottom 20px
      .head-wrapper
        overflow hidden
        padding 10px
        .note
          line-height 16px
          font-size $font-size-small-s
          float left
        .btn-wrapper
          float right
          height 20px
      .desc
        margin 5px 0
        border-radius 10px
        padding 5px
        font-size $font-size-medium
        line-height 20px
        background $color-article-desc-background
      .article-content
        font-size $font-size-medium-x
        padding 10px
        line-height 20px
</style>
