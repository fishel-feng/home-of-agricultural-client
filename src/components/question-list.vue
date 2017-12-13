<template>
  <div class="question-list">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <!-- <li class="item-wrapper" v-for="(item, index) in circles" :key="index">
        <div class="head-image">
          <img :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="50px">
        </div>
        <div class="circle-content">
          <div class="nick-name">{{item.nickName}}</div>
          <div class="circle-text">{{item.content}}</div>
          <div class="circle-image">
            <li  v-for="(image,innerIndex) in item.images" :key="innerIndex">
              <img :src="`http://localhost:7001/public/circle/${image}`" width="80px" height="80px" alt="">
            </li>
          </div>
          <div class="circle-tail">
            <div class="circle-mark">
              <span v-text="getText(item.time)"></span>
              <div>
                <span class="btn-info">{{item.likeCount}}人觉得很赞</span>&nbsp;
                <span class="btn-info">{{item.commentCount}}条评论</span>
              </div>
            </div>
            <div class="circle-action">
              <span v-if="!isLiked">
                <img src="../assets/svg/like.svg" alt="" width="14px">
                赞&nbsp;
              </span>
              <span v-if="isLiked">
                <img src="../assets/svg/liked.svg" alt="" width="14px">
                取消赞&nbsp;&nbsp;
              </span>
              <span>
                <img src="../assets/svg/comment.svg" alt="" width="14px">
                评论
              </span>
            </div>
          </div>
        </div>
      </li> -->
      <div class="load-wrapper">
        <div class="load-more" v-show="!showLoading" v-text="hasMore"></div>
        <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
      </div>
    </ul>
  </div>
</template>

<script>
// import moment from 'moment'
// import axios from 'axios'
// export default {
//   data () {
//     return {
//       msg: 'Welcome to 农友圈页面',
//       type: 'all',
//       page: 0,
//       questions: [],
//       showLoading: false,
//       hasMore: '上拉加载更多'
//     }
//   },
//   mounted () {
//     this.getData(this.page)
//   },
//   methods: {
//     loadMore () {
//       this.loading = true
//       this.showLoading = true
//       this.getData(this.page)
//       setTimeout(() => {
//         this.loading = false
//         this.showLoading = false
//       }, 6500)
//     },
//     getData (page) {
//       axios.get(`http://localhost:7001/question/getQuestionList/${page}`).then(res => {
//         if (res && res.data.code === 200) {
//           if (page === 0) {
//             this.questions = res.data.data.circleList
//             this.page++
//           } else {
//             if (res.data.data.circleList.length) {
//               this.circles.push(...res.data.data.circleList)
//               this.page++
//             } else {
//               this.hasMore = '已无更多新闻'
//             }
//           }
//         }
//       })
//     },
//     getText (time) {
//       return moment(time).format('YYYY-MM-DD HH:mm:ss')
//     }
//   },
//   watch: {
//     '$route' (to, from) {
//       this.type = this.$route.params.type
//     }
//   }
// }
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
