<template>
  <div class="circle-list">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="disableLoading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li v-for="item in circles" class="list-item">
          <div class="head-image">
            <img @click="getUserCard(item.userId)" :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="50px" height="50px">
          </div>
          <div class="circle-content">
            <div @click="getUserCard(item.userId)" class="nick-name">{{item.nickName}}</div>
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
                  <span @click="getLikeList(item._id)" class="btn-info">{{item.likeCount}}人觉得很赞</span>&nbsp;
                  <span @click="getCommentList(item._id)" class="btn-info">{{item.commentCount}}条评论</span>
                </div>
              </div>
              <div class="circle-action">
                <span v-if="!isLiked" @click="giveLike">
                  赞 <img src="../assets/svg/like.svg" alt="" width="14px">
                  &nbsp;
                </span>
                <span v-if="isLiked" @click="cancelLike">
                  取消赞 <img src="../assets/svg/liked.svg" alt="" width="14px">
                  &nbsp;&nbsp;
                </span>
                <span @click="giveComment(item._id)">
                  评论 <img src="../assets/svg/comment.svg" alt="" width="14px">
                </span>
              </div>
            </div>
          </div>
        </li>
        <div class="load-wrapper">
          <div class="load-more" v-show="!showLoading">无更多内容</div>
          <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
        </div>
      </ul>
    </mt-loadmore>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      circles: [],
      disableLoading: false,
      showLoading: false,
      isLiked: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      axios.get('http://127.0.0.1:7001/circle/getCircleList/' + new Date().toISOString()).then(res => {
        this.circles = res.data.data.circleList
      })
    },
    loadTop () {
      setTimeout(() => {
        console.log('刷新')
        this.$refs.loadmore.onTopLoaded()
      }, 1000)
    },
    loadMore () {
      console.log('加载')
    },
    getText (time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    getUserCard (userId) {
      this.$router.push(`/user/${userId}`)
    },
    getCommentList (circleId) {
      this.$router.push(`/circles/comment/${circleId}`)
    },
    getLikeList (circleId) {
      this.$router.push(`/circles/like/${circleId}`)
    },
    giveLike () {
      //
      this.isLiked = true
    },
    cancelLike () {
      //
      this.isLiked = false
    },
    giveComment (circleId) {
      this.$router.push(`/addComment?id=${circleId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle-list
  padding-top 3px
  .list-item
    min-height 10px
    display flex
    .head-image
      padding 10px
      flex none
    .circle-content
      font-size 14px
      padding 10px
      flex auto
      display flex
      flex-direction column
      line-height 18px
      .nick-name
        color #f63
      .circle-image
        display flex
        flex-wrap wrap
        justify-content space-between
      .circle-tail
        font-size 10px
        display flex
        justify-content space-between
        .circle-mark
          display flex
          flex-direction column
          .btn-info
            color #9cf
        .circle-action
          padding 10px
          display flex
          img
            position relative
            top 2px
  .load-wrapper
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
