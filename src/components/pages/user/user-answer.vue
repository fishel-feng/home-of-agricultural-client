<template>
  <transition name="slide">
    <div class="user-answer">
      <mt-header fixed title="我回答的问题">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <question-list ref="question-list" class="question-list" @refresh="reload" @showDetail="getQuestionInfo"  @load="getQuestionList" :questions="questions" :loading="loading" :showLoading="showLoading"/>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import QuestionList from '@/components/abstract/question-list'
  export default {
    data () {
      return {
        loading: false,
        showLoading: false,
        questions: []
      }
    },
    mounted () {
      this.getQuestionList()
    },
    components: {
      QuestionList
    },
    methods: {
      addQuestion () {
        this.$router.push('/question/addQuestion')
      },
      selectItem () {
        this.$router.push('/question/selectItem')
      },
      getPageContent () {
        this.questions = []
        this.getQuestionList()
      },
      getQuestionList (callback) {
        let last = this.questions.length ? this.questions[this.questions.length - 1].time : new Date().toISOString()
        this.showLoading = true
        this.loading = true
        axios.get('http://localhost:7001/user/getAnswers/' + last).then(res => {
          this.questions.push(...res.data.data.questions)
          if (callback) {
            callback()
          }
          setTimeout(() => {
            this.loading = false
            this.showLoading = false
          }, 2000)
        })
      },
      reload (callback) {
        this.questions = []
        this.getQuestionList(callback)
      },
      getQuestionInfo (id) {
        this.$router.push('/user/question/' + id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.user-answer
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

