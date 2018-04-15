<template>
  <transition name="slide">
    <div class="user-question">
      <mt-header fixed title="我提问的问题">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <question-list ref="question-list" class="question-list" @refresh="reload" @load="getQuestionList" :questions="questions" :loading="loading" :showLoading="showLoading"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import { BASE_API_PATH } from '@/common/js/util'
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
        this.$axios.get(BASE_API_PATH + '/user/getQuestions/' + last).then(res => {
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .user-question
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      z-index 200
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
</style>

