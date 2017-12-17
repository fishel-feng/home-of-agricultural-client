<template>
  <list-view class="circle-list" :data="circles" :showLoading="showLoading" :loading="true" @load="loadMore">
    <li slot="item" slot-scope="props" class="list-item">
      <div class="head-image">
        <img @click="getUserCard(props.item)" :src="`http://localhost:7001/public/headImage/${props.item.headImage}`" width="50px">
      </div>
      <div class="circle-content">
        <div @click="getUserCard(props.item)" class="nick-name">{{props.item.nickName}}</div>
        <div class="circle-text">{{props.item.content}}</div>
        <div class="circle-image">
          <li  v-for="(image,innerIndex) in props.item.images" :key="innerIndex">
            <img :src="`http://localhost:7001/public/circle/${image}`" width="80px" height="80px" alt="">
          </li>
        </div>
        <div class="circle-tail">
          <div class="circle-mark">
            <span v-text="getText(props.item.time)"></span>
            <div>
              <span class="btn-info">{{props.item.likeCount}}人觉得很赞</span>&nbsp;
              <span class="btn-info">{{props.item.commentCount}}条评论</span>
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
    </li>
  </list-view>
</template>

<script>
import ListView from '@/components/list-view'
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to 农友圈页面',
      type: 'all',
      page: 0,
      circles: [],
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
    },
    getText (time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    getUserCard (item) {
      // todo 前往用户信息页面
      this.$router.push(`/user/${item.userId}`)
    },
    getCommentList () {
      //
    },
    getLikeList () {
      //
    },
    giveLike () {
      //
    },
    cancelLike () {
      //
    },
    giveComment () {
      //
    }
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.params.type
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
</style>
