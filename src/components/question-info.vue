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
            <div>时间</div>
          </div>
          <mt-button class="btn-attention" type="primary" size="small">关注问题</mt-button>
        </div>
        <div class="btn-question">
          <div>邀请专家</div>
          <div>我要回答</div>
        </div>
        <ul class="answer-container">
          <li v-for="(answer, index) in question.answers" :key="index" class="answer-item">
            <div class="answer-title">
              <img src="../assets/svg/hot.svg" width="30px" height="30px" alt="">
              <div>
                <span>{{answer.nickName}}</span>
              </div>
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
  import axios from 'axios'
  export default {
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
        axios.get(`http://127.0.0.1:7001/question/getQuestion/${this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1)}`).then(res => {
          if (res.data.code === 200) {
            this.question = res.data.data
            console.log(this.question)
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
          margin-bottom 10px
        .answer-images
          padding 10px
</style>
