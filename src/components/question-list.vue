<template>
  <list-view class="question-list" :data="questions" :showLoading="showLoading" :loading="true" @load="loadMore">
    <li slot="item" slot-scope="props" @click="getInfo(props.item)" class="list-item">
      
    </li>
  </list-view>
</template>

<script>
import ListView from '@/components/list-view'
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 农友圈页面',
      type: 'all',
      page: 0,
      questions: [],
      isLiked: false,
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
      axios.get(`http://localhost:7001/circle/getCircleList/${page}`).then(res => {
        if (res && res.data.code === 200) {
          if (page === 0) {
            this.circles = res.data.data.circleList
            this.page++
          } else {
            if (res.data.data.circleList.length) {
              this.circles.push(...res.data.data.circleList)
              this.page++
            } else {
              this.hasMore = '已无更多新闻'
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
  .item-wrapper
    min-height: 10px
    display flex
    .head-image
      padding 10px
      flex none
    .circle-content
      font-size 14px
      padding 10px
      flex: auto;
      display: flex;
      flex-direction: column;
      line-height 18px
      .nick-name
        color #f63
      .circle-image
        display: flex;
        flex-wrap: wrap
        justify-content space-between
      .circle-tail
        font-size 10px
        display flex
        justify-content space-between
        .circle-mark
          display flex
          flex-direction: column;
          .btn-info
            color #9cf
        .circle-action
          padding 10px
          display flex
  .load-wrapper
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
