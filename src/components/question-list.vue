<template>
  <list-view class="question-list" :data="questions" :showLoading="showLoading" :loading="true" @load="loadMore">
    <li slot="item" slot-scope="props" @click="getInfo(props.item)" class="list-item">
      <div>{{props.item.title}}</div>
      <div>{{props.item.desc}}</div>
      <div>{{props.item.finishState?'已解决':'未解决'}}</div>
      <div>{{props.item.answerCount}}</div>
    </li>
  </list-view>
</template>

<script>
import ListView from '@/components/list-view'
import axios from 'axios'
export default {
  data () {
    return {
      page: 0,
      questions: [],
      showLoading: false
    }
  },
  components: {
    ListView
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
.question-list
  padding-top 3px
</style>
