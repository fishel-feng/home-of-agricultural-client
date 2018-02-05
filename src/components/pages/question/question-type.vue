<template>
  <div class="question-type">
    <question-list :baseUrl="baseUrl"/>
  </div>
</template>

<script>
import QuestionList from '@/components/abstract/question-list'
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
      if (to.path === '/question/all') {
        this.baseUrl = 'http://localhost:7001/question/getAllQuestionList/'
      } else if (to.path.startsWith('/question')) {
        this.baseUrl = 'http://localhost:7001/question/getQuestionList/' + to.path.slice(10) + '/'
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
