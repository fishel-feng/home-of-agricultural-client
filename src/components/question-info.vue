<template>
  <transition name="slide">
    <div class="question-info">
      <mt-header fixed title="问题详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content-wrapper">
        <div class="question-title">{{question.title}}</div>
        <div class="question-content">{{question.content}}</div>
        <div class="question-image">
          <img src="../assets/svg/hot.svg" width="100px" height="100px"  alt="">
        </div>
        <div class="questioner-info">
          <img :src="`http://localhost:7001/public/headImage/${question.headImage}`" width="30px" height="30px" alt="">
          <div class="questioner-desc">
            <div class="nick-name">{{question.nickName}}</div>
            <div class="location">{{question.location}}</div>
            <div>{{getTime(question.time)}}</div>
          </div>
          <mt-button class="btn-attention" @click.native="addAttention(question._id)" type="primary" size="small">关注问题</mt-button>
        </div>
        <div class="btn-question">
          <div @click="getExpertList(question.tag)">邀请专家</div>
          <div @click="addAnswer(question._id)">我要回答</div>
        </div>
        <ul class="answer-container">
          <li v-for="(answer, index) in question.answers" :key="index" class="answer-item">
            <div class="answer-title">
              <div class="title-container">
                <img src="../assets/svg/hot.svg" width="30px" height="30px" alt="">
                <div class="nickName">{{answer.nickName}}</div>
                <div class="expertState">专家状态</div>
              </div>
              <div v-show="isMine(answer.userId)" @click.stop="deleteAnswer(answer._id)" class="btn-del">删除</div>
            </div>
            <div>
              <div>{{answer.content}}</div>
              <div v-for="(image, i) in question.answers.images" :key="i" class="answer-images">
                <img :src="`http://localhost:7001/public/circle/${image}`" width="100px" height="100px"  alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import { getTimeMixin, accountTestMixin } from '@/common/js/mixin'
  import { Toast, MessageBox } from 'mint-ui'
  import axios from 'axios'
  export default {
    mixins: [ getTimeMixin, accountTestMixin ],
    data () {
      return {
        question: {}
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get(`http://127.0.0.1:7001/question/getQuestion/${this.$route.params.questionId}`).then(res => {
          if (res.data.code === 200) {
            this.question = res.data.data
            console.log(this.question)
          }
        })
      },
      addAttention (questionId) {
        // todo
      },
      getExpertList (questionTag) {
        this.$router.push('/expert?tag=' + questionTag)
      },
      addAnswer (questionId) {
        this.$router.push(`/addAnswer?questionId=${questionId}`)
      },
      deleteAnswer (answerId) {
        MessageBox.confirm('确定删除这条内容吗？', {
          title: '提示',
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(action => {
          axios.post('http://localhost:7001/question/deleteAnswer', {
            questionId: this.$route.params.questionId,
            answerId: answerId
          }, {
            headers: {
              Authorization: this.token
            }
          }).then(res => {
            if (res.data.code === 200) {
              let index = this.question.answers.findIndex(item => {
                return item._id === answerId
              })
              this.question.answers.splice(index, 1)
              Toast({
                message: '删除成功',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        }).catch(e => {
        })
      },
      isMine (userId) {
        return userId === this.myId
      }
    }
  }
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.question-info
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  background #fff
  .content-wrapper
    margin-top 40px
    .question-title
      padding 10px
      font-size 20px
    .question-image
      padding 10px
    .question-content
      line-height: normal
      padding 10px
      font-size 16px
    .questioner-info
      padding 10px
      display flex
      justify-content space-between
      img
        margin-right 10px
      .questioner-desc
        flex 1
        display flex
        align-items center
        font-size 12px
      .nick-name
        color #0f0
      .location
        margin-left 10px
        margin-right 10px
    .btn-question
      display flex
      div
        border-radius 5px
        color white
        border 1px solid #cdcdcd
        line-height 40px
        height 40px
        text-align center
        flex 1
        background #26a2ff
    .answer-container
      background #ccc
      .answer-item
        padding 10px
        line-height: normal
        margin 3px 0
        background: #fff
        .answer-title
          display flex
          align-items center
          justify-content space-between
          margin-bottom 10px
          .title-container
            display flex
            align-items center
            .nickName
              margin-left 10px
            .expertState
              margin-left 10px
          .btn-del
            font-size 10px
        .answer-images
          padding 10px
</style>
