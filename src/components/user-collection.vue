<template>
  <transition name="slide">
    <div class="user-collection">
      <mt-header fixed title="我收藏的文章">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div v-for="item in collections">
        <mt-cell :title="item.title" @click.native="showArticleInfo(item.articleId)"></mt-cell>
      </div>
    </div>
  </transition>
</template>

<script>
import { accountTestMixin } from '@/common/js/mixin'
import axios from 'axios'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      collections: []
    }
  },
  mounted () {
    this.verifyLogin(this.initData)
  },
  watch: {
    '$route' (to, from) {
      this.initData()
    }
  },
  methods: {
    initData () {
      axios.get('http://localhost:7001/user/getCollections', {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        this.collections = res.data.data.collections
      })
    },
    showArticleInfo (articleId) {
      this.$router.push(`/news/user/${articleId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.user-collection
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  padding-top 40px
</style>

