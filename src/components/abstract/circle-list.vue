<template>
  <div class="circle-list">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li v-for="(item, index) in circles" :key="index" class="list-item" ref="li">
          <div class="head-image">
            <img @click="getUserCard(item.userId)" :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="50px" height="50px">
          </div>
          <div class="circle-content">
            <div class="title-container">
              <div @click="getUserCard(item.userId)" class="nick-name">{{item.nickName}}</div>
              <div v-show="isMine(item.userId)" @click="deleteCircle(item._id)" class="btn-del">删除</div>
            </div>
            <div class="circle-text">{{item.content}}</div>
            <div class="circle-image">
              <div v-for="(image,innerIndex) in item.images" :key="innerIndex">
                <img @click.stop="showBigImage(`http://localhost:7001/public/circle/${image}`)" :src="`http://localhost:7001/public/circle/${image}`" width="80px" height="80px" alt="">
              </div>
            </div>
            <div class="circle-tail">
              <div class="circle-mark">
                <span>{{getTime(item.time)}}</span>
                <div>
                  <span @click="getLikeList(item._id)" class="btn-info">{{item.likeCount}}人觉得很赞</span>&nbsp;
                  <span @click="getCommentList(item._id)" class="btn-info">{{item.commentCount}}条评论</span>
                </div>
              </div>
              <div class="circle-action">
                <span v-if="!isLiked(item._id)" @click="giveLike(item)">
                  赞 <img src="../../assets/svg/like.svg" alt="" width="14px">
                </span>
                <span v-if="isLiked(item._id)" @click="cancelLike(item)">
                  取消赞 <img src="../../assets/svg/liked.svg" alt="" width="14px">
                </span>
                <span @click="giveComment(item._id)">
                  评论 <img src="../../assets/svg/comment.svg" alt="" width="14px">
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
    <router-view/>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { showImageMixin, accountTestMixin, getTimeMixin } from '@/common/js/mixin'
import { Toast, MessageBox } from 'mint-ui'
import axios from 'axios'
export default {
  mixins: [ showImageMixin, accountTestMixin, getTimeMixin ],
  props: {
    baseUrl: String
  },
  data () {
    return {
      loading: false,
      circles: [],
      showLoading: false
    }
  },
  mounted () {
    if (this.$route.path === '/circles/all') {
      this.getData()
    } else if (this.$route.path === '/circles/attention' || this.$route.path === '/user/circles') {
      this.verifyLogin(this.getData)
    }
    axios.get('http://localhost:7001/user/getUserIndex').then(res => {
      const user = res.data.data.user
      this.setLikes(user.likes)
    })
  },
  deactivated () {
    this.loading = true
  },
  activated () {
    this.loading = false
  },
  computed: {
    ...mapGetters([
      'likes'
    ])
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.path === '/circles/all') {
        this.getData()
      } else if (this.$route.path === '/circles/attention' || this.$route.path === '/user/circles') {
        this.verifyLogin(this.getData)
      }
    }
  },
  methods: {
    getData (callback) {
      axios.get(this.baseUrl + new Date().toISOString()).then(res => {
        if (res.data.code === 200) {
          if (this.circles.length && res.data.data.circleList.length && this.circles[0]._id === res.data.data.circleList[0]._id) {
            if (callback) {
              Toast({
                message: '无更多动态',
                position: 'bottom',
                duration: 1000
              })
              callback()
            }
          } else {
            this.circles = res.data.data.circleList
            if (this.$route.query.id) {
              let index = this.circles.findIndex(item => {
                return item._id === this.$route.query.id
              })
              this.$nextTick(() => {
                this.$refs.li[index].scrollIntoView()
              })
            }
            this.loading = false
          }
        }
      })
    },
    loadTop () {
      this.getData(this.$refs.loadmore.onTopLoaded)
    },
    loadMore () {
      this.loading = true
      this.showLoading = true
      if (this.circles.length) {
        axios.get(this.baseUrl + this.circles[this.circles.length - 1].time).then(res => {
          if (res.data.code === 200) {
            if (!res.data.data.circleList.length) {
              Toast({
                message: '无更多动态',
                position: 'bottom',
                duration: 1000
              })
              this.showLoading = false
              return
            } else {
              this.circles.push(...res.data.data.circleList)
              this.loading = false
            }
          }
          this.showLoading = false
        })
      }
    },
    getUserCard (userId) {
      this.$router.push(`/userCard?id=${userId}`)
    },
    getCommentList (circleId) {
      this.$router.push(`/circles/comment/${circleId}`)
    },
    getLikeList (circleId) {
      this.$router.push(`/circles/like/${circleId}`)
    },
    giveLike (circle) {
      this.verifyLogin(() => {
        axios.post('http://localhost:7001/circle/giveLike', {
          circleId: circle._id
        }).then(res => {
          if (res.data.code === 200) {
            this.addLike(circle._id)
            circle.likeCount++
            this.$socket.emit('like', this.token, circle.userId, circle._id)
          }
        })
      })
    },
    cancelLike (circle) {
      this.verifyLogin(() => {
        axios.post('http://localhost:7001/circle/cancelLike', {
          circleId: circle._id
        }).then(res => {
          if (res.data.code === 200) {
            this.deleteLike(circle._id)
            circle.likeCount--
          }
        })
      })
    },
    giveComment (circleId) {
      this.verifyLogin(() => {
        this.$router.push(`/addComment?id=${circleId}`)
      })
    },
    isLiked (id) {
      return this.likes.indexOf(id) !== -1
    },
    isMine (userId) {
      return userId === this.myId
    },
    deleteCircle (circleId) {
      MessageBox.confirm('确定删除这条内容吗？', {
        title: '提示',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(action => {
        axios.post('http://localhost:7001/circle/deleteCircle', {
          circleId: circleId
        }).then(res => {
          if (res.data.code === 200) {
            let index = this.circles.findIndex(item => {
              return item._id === circleId
            })
            this.circles.splice(index, 1)
            Toast({
              message: '删除成功',
              position: 'bottom',
              duration: 2000
            })
          }
        })
      }).catch(e => {
      })
    },
    ...mapActions([
      'addLike',
      'deleteLike'
    ]),
    ...mapMutations({
      setLikes: 'SET_LIKES'
    })
  }
}
</script>

<style lang="stylus" scoped>
.circle-list
  background #ccc
  .list-item
    background #fff
    margin-bottom 3px
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
      .title-container
        display flex
        justify-content space-between
        align-items center
        .nick-name
          color #f63
        .btn-del
          font-size 10px
      .circle-image
        overflow hidden
        img
          margin 5px
          float left
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
          padding 5px
          display flex
          img
            margin-right 5px
            position relative
            top 2px
  .load-wrapper
    padding-top 10px
    background #fff
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
  .image-wrapper
    display flex
    align-items center
    position fixed
    background rgba(0, 0, 0, 0.8)
    z-index 200
    top 0
    right 0
    left 0
    bottom 0
    .big-image
      width 100%
</style>
