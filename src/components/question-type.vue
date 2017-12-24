<template>
  <div class="question-type">
    <question-list @refresh="loadTop" @load="loadMore" :data="questions" :showLoading="showLoading" :loading="loading"></question-list>
  </div>
</template>

<script>
import QuestionList from '@/components/question-list'
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      baseUrl: 'http://localhost:7001/question/getAllQuestionList/',
      loading: false,
      questions: [],
      showLoading: false
    }
  },
  components: {
    QuestionList
  },
  deactivated () {
    this.loading = true
  },
  activated () {
    this.loading = false
  },
  mounted () {
    if (this.$route.path === '/question/all') {
      this.baseUrl = 'http://localhost:7001/question/getAllQuestionList/'
    } else {
      this.baseUrl = `http://localhost:7001/question/getQuestionList/${this.$route.path.slice(10)}/`
    }
    this.getData()
  },
  methods: {
    loadTop (callback) {
      this.getData(callback)
    },
    loadMore () {
      this.loading = true
      this.showLoading = true
      this.getData(this.page)
      setTimeout(() => {
        this.loading = false
        this.showLoading = false
      }, 6500)
    },
    getData (callback) {
      axios.get(this.baseUrl + new Date().toISOString()).then(res => {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-type
  background #ccc
  padding-top 3px
</style>
