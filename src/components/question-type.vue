<template>
  <div class="question-type">
    <question-list :baseUrl="baseUrl"></question-list>
  </div>
</template>

<script>
import QuestionList from '@/components/question-list'
export default {
  data () {
    return {
      baseUrl: 'http://localhost:7001/question/getAllQuestionList/'
    }
  },
  components: {
    QuestionList
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== '/question/all') {
        this.baseUrl = 'http://localhost:7001/question/getQuestionList/' + to.path.slice(10) + '/'
      } else {
        this.baseUrl = 'http://localhost:7001/question/getAllQuestionList/'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-type
  background #ccc
  padding-top 3px
</style>
