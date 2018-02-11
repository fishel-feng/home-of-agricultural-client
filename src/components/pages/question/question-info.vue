<template>
  <transition name="slide">
    <div class="question-info">
      <mt-header fixed title="问题详情">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="content-wrapper">
        <div class="question-title">{{question.title}}</div>
        <div class="question-content">{{question.content}}</div>
        <div class="question-image">
          <div v-for="(image, i) in question.images">
            <img @click.stop="showBigImage(`http://localhost:7001/public/question/${image}`)" :src="`http://localhost:7001/public/question/${image}`" width="100px" height="100px"  alt="">
          </div>
        </div>
        <div class="questioner-info">
          <img :src="`http://localhost:7001/public/headImage/${question.headImage}`" width="30px" height="30px" alt="">
          <div class="questioner-desc">
            <div class="nick-name">{{question.nickName}}</div>
            <div class="location">{{question.location}}</div>
            <div>{{getTime(question.time)}}</div>
          </div>
          <mt-button class="btn-attention" v-if="!attentionState" @click.native="giveAttention" type="primary" size="small">关注问题</mt-button>
          <mt-button class="btn-attention" v-if="attentionState" @click.native="removeAttention" type="primary" size="small">取消关注</mt-button>
        </div>
        <div class="btn-question">
          <div @click="getExpertList">邀请专家</div>
          <div @click="addAnswer">我要回答</div>
        </div>
        <ul class="answer-container">
          <li v-for="(answer, index) in question.answers" :key="index" class="answer-item">
            <div class="answer-title">
              <div class="title-container">
                <img src="../../../assets/svg/hot.svg" width="30px" height="30px" alt="">
                <div class="nick-name">{{answer.nickName}}</div>
                <div class="expert-state">
                  <span>{{answer.certification}}</span>
                  <span class="btn-message-send" v-show="answer.certification && !isMine(answer.userId)" @click.stop="sendMessage(answer)"><img src="../../../assets/svg/chat.svg" width="12px" alt=""> 问专家</span>
                </div>
              </div>
              <div v-show="isMine(answer.userId)" @click.stop="deleteAnswer(answer._id)" class="btn-del">删除</div>
            </div>
            <div>
              <div>{{answer.content}}</div>
              <div class="answer-images">
                <div v-for="(image, i) in answer.images" :key="i">
                  <img @click.stop="showBigImage(`http://localhost:7001/public/answer/${image}`)" :src="`http://localhost:7001/public/answer/${image}`" width="100px" height="100px"  alt="">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div @click="hideImage" v-if="showImage" class="image-wrapper">
        <img class="big-image" :src="currentImage" alt="">
      </div>
      <router-view/>
    </div>
  </transition>
</template>

<script>
  import {getTimeMixin, accountTestMixin, showImageMixin, goToRelativePathMixin} from '@/common/js/mixin'
  import {Toast, MessageBox} from 'mint-ui'
  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'
  export default {
    mixins: [getTimeMixin, accountTestMixin, showImageMixin, goToRelativePathMixin],
    data () {
      return {
        question: {},
        attentionState: false
      }
    },
    computed: {
      ...mapGetters([
        'attentions'
      ])
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get(`http://127.0.0.1:7001/question/getQuestion/${this.$route.params.questionId}`).then(res => {
          if (res.data.code === 200) {
            this.question = res.data.data
            this.attentionState = this.attentions.indexOf(this.question._id) !== -1
          }
        })
      },
      giveAttention () {
        axios.post('http://127.0.0.1:7001/question/attentionQuestion/', {
          questionId: this.question._id
        }).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            Toast({
              message: '关注问题成功',
              position: 'bottom',
              duration: 2000
            })
            this.attentionState = true
            this.addAttention(this.question._id)
          }
        })
      },
      removeAttention () {
        axios.post('http://127.0.0.1:7001/question/removeAttentionQuestion/', {
          questionId: this.question._id
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '取消关注问题成功',
              position: 'bottom',
              duration: 2000
            })
            this.attentionState = false
            this.deleteAttention(this.question._id)
          }
        })
      },
      getExpertList () {
        this.goToRelativePath(`expert?tag=${this.question.tag.tagName}&questionId=${this.$route.params.questionId}`)
      },
      addAnswer () {
        this.goToRelativePath('addAnswer')
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
      },
      sendMessage (answer) {
        this.goToRelativePath(`chat?userId=${answer.userId}&userName=${answer.nickName}`)
      },
      ...mapActions([
        'addAttention',
        'deleteAttention'
      ])
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
      overflow hidden
      padding 10px
      img
        margin 5px
        float left
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
        line-height normal
        margin 3px 0
        background #fff
        .answer-title
          display flex
          align-items center
          justify-content space-between
          margin-bottom 10px
          .title-container
            display flex
            align-items center
            .nick-name
              margin-left 10px
            .expert-state
              margin-left 10px
              .btn-message-send
                margin-left 10px
                border-radius 5px
                padding 2px
                font-size 12px
                background #ccc
          .btn-del
            font-size 10px
        .answer-images
          overflow hidden
          padding 10px
          img
            margin 5px
            float left
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
