<template>
  <div class="question-type">
    <question-list :data="questions"></question-list>
  </div>
</template>

<script>
import QuestionList from '@/components/question-list'
import axios from 'axios'
export default {
  data () {
    return {
      page: 0,
      questions: [1, 2, 3, 4, 5, 5],
      showLoading: false
    }
  },
  components: {
    QuestionList
  },
  mounted () {
    this.getData(this.page)
  },
  methods: {
    loadMore () {
      this.loading = true
      this.showLoading = true
      this.getData(this.page)
      setTimeout(() => {
        this.loading = false
        this.showLoading = false
      }, 6500)
    },
    getData (page) {
      axios.get(`http://localhost:7001/question/getQuestionList/${page}`).then(res => {
        if (res && res.data.code === 200) {
          if (page === 0) {
            this.questions = res.data.data
            this.page++
          } else {
            if (res.data.data.length) {
              this.questions.push(...res.data.data)
              this.page++
            } else {
              this.hasMore = '已无更多问题'
            }
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
