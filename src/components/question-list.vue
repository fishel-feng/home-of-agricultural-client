<template>
  <div class="question-list">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item" v-for="(item,index) in questions" :key="index" @click="showQuestionInfo(item._id)">
          <img v-if="item.finishState" class="solve" src="../assets/svg/solve.svg" width="40px" alt="">
          <div class="title">
            {{item.title}}
            <span v-show="isMine(item.userId)" class="btn-del" @click.stop="deleteQuestion(item._id)">删除</span>
          </div>
          <div class="desc">{{item.desc}}</div>
          <div class="image">
            <div v-for="(image,index) in item.images" :key="index">
              <img @click.stop="showBigImage(`http://127.0.0.1:7001/public/question/${image}`)" :src="`http://127.0.0.1:7001/public/question/${image}`" width="100px" height="100px" alt="">
            </div>
          </div>
          <div class="tail">
            <div class="tag">
              <img src="../assets/svg/tag.svg" width="12px" alt="">
              {{item.tag.tagName}}
            </div>
            <div class="answerCount">{{getTime(item.time)}} 回答 {{item.answerCount}}</div>
          </div>
        </li>
        <div class="load-wrapper">
          <div class="load-more" v-show="!showLoading">无更多内容</div>
          <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
        </div>
      </ul>
    </mt-loadmore>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast, MessageBox } from 'mint-ui'
import { showImageMixin, accountTestMixin, getTimeMixin } from '@/common/js/mixin'
export default {
  mixins: [ showImageMixin, accountTestMixin, getTimeMixin ],
  props: {
    baseUrl: String
  },
  data () {
    return {
      questions: [],
      showLoading: false,
      loading: false
    }
  },
  deactivated () {
    this.loading = true
  },
  activated () {
    this.loading = false
  },
  mounted () {
    if (this.$route.path === '/user/attentions' || this.$route.path === '/user/questions' || this.$route.path === '/user/answers') {
      this.verifyLogin(this.getData)
    } else if (this.$route.path.startsWith('/question')) {
      this.getData()
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.path === '/user/attentions' || this.$route.path === '/user/questions' || this.$route.path === '/user/answers') {
        this.verifyLogin(this.getData)
      } else if (this.$route.path.startsWith('/question')) {
        this.getData()
      }
    }
  },
  methods: {
    showQuestionInfo (id) {
      this.$router.push('/question/all/' + id)
    },
    loadTop () {
      this.getData(this.$refs.loadmore.onTopLoaded)
    },
    loadMore () {
      this.loading = true
      this.showLoading = true
      if (this.questions.length) {
        axios.get(this.baseUrl + this.questions[this.questions.length - 1].time, {
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          if (res.data.code === 200) {
            if (!res.data.data.questions.length) {
              Toast({
                message: '无更多问题',
                position: 'bottom',
                duration: 1000
              })
              this.showLoading = false
            } else {
              this.circles.push(...res.data.data.circleList)
              this.loading = false
            }
          }
        })
      }
      this.showLoading = false
    },
    getData (callback) {
      axios.get(this.baseUrl + new Date().toISOString(), {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res && res.data.code === 200) {
          if (this.questions.length && res.data.data.questions.length && this.questions[0]._id === res.data.data.questions[0]._id) {
            if (callback) {
              Toast({
                message: '无更多问题',
                position: 'bottom',
                duration: 1000
              })
              callback()
            }
          } else {
            this.questions = res.data.data.questions
            this.loading = false
          }
        }
      })
    },
    isMine (userId) {
      return userId === this.myId
    },
    deleteQuestion (questionId) {
      MessageBox.confirm('确定删除这条内容吗？', {
        title: '提示',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(action => {
        axios.post('http://localhost:7001/question/deleteQuestion', {
          questionId: questionId
        }, {
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          if (res.data.code === 200) {
            let index = this.questions.findIndex(item => {
              return item._id === questionId
            })
            this.questions.splice(index, 1)
            Toast({
              message: '删除成功',
              position: 'bottom',
              duration: 2000
            })
          }
        })
      }).catch(e => {
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-list
  background #ccc
  .item
    position relative
    background #fff
    margin-bottom 3px
    padding 10px
    .solve
      right 0
      top auto
      bottom auto
      position absolute
    .title
      padding-right 30px
      font-size 18px
      font-weight bold
      position relative
      .btn-del
        font-size 10px
        position absolute
        right 0
        top 0
    .desc
      margin  5px
      font-size 14px
      color #4b4b4b
    .image
      padding 10px
      overflow hidden
      img
        float left
        margin 5px
    .tail
      min-height 14px
      display flex
      justify-content space-between
      font-size 12px
  .load-wrapper
    padding-top 10px
    background #fff
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
  .image-wrapper
    display flex
    align-items center
    position fixed
    background rgba(0, 0, 0, 0.8)
    z-index 200
    top 0
    right 0
    left 0
    bottom 0
    .big-image
      width 100%
</style>
