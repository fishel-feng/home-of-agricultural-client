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
                <span v-if="likes.indexOf(item._id) === -1" @click="giveLike(item)">
                  赞 <img src="../../assets/svg/like.svg" alt="" width="14px">
                </span>
                <span v-if="likes.indexOf(item._id) !== -1" @click="cancelLike(item)">
                  取消赞 <img src="../../assets/svg/liked.svg" alt="" width="14px">
                </span>
                <span @click="giveComment(item._id, index)">
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
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { showImageMixin, accountTestMixin, getTimeMixin, goToRelativePathMixin } from '@/common/js/mixin'
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    mixins: [ showImageMixin, accountTestMixin, getTimeMixin, goToRelativePathMixin ],
    props: {
      circles: {
        type: Array,
        default: []
      },
      showLoading: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'likes'
      ])
    },
    methods: {
      loadTop () {
        this.$emit('refresh', this.$refs.loadmore.onTopLoaded)
      },
      loadMore () {
        this.$emit('load')
      },
      getUserCard (userId) {
        this.goToRelativePath('userCard?userId=' + userId)
      },
      getCommentList (circleId) {
        this.goToRelativePath('comment?id=' + circleId)
      },
      getLikeList (circleId) {
        this.goToRelativePath('like?id=' + circleId)
      },
      giveLike (circle) {
        this.verifyLogin(() => {
          this.$axios.post('/circle/giveLike', {
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
          this.$axios.post('/circle/cancelLike', {
            circleId: circle._id
          }).then(res => {
            if (res.data.code === 200) {
              this.deleteLike(circle._id)
              circle.likeCount--
            }
          })
        })
      },
      giveComment (circleId, index) {
        this.verifyLogin(() => {
          this.goToRelativePath(`addComment?id=${circleId}&index=${index}`)
        })
      },
      isMine (userId) {
        return userId === this.myId
      },
      deleteCircle (circleId) {
        MessageBox.confirm('确定删除这条内容吗？', {
          title: '提示',
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(() => {
          this.$axios.post('/circle/deleteCircle', {
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
        }).catch(e => {})
      },
      ...mapActions([
        'addLike',
        'deleteLike'
      ])
    },
    watch: {
      '$route' (to, from) {
        if (from.path.indexOf('addComment') !== -1 && from.query.flag) {
          this.circles[from.query.index].commentCount++
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable"
  .circle-list
    background $color-background
    .list-item
      background $color-list-item-background
      margin-bottom 3px
      min-height 10px
      display flex
      .head-image
        padding 10px
        flex none
      .circle-content
        font-size $font-size-medium
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
            color $color-user-name
          .btn-del
            font-size $font-size-small-s
        .circle-image
          overflow hidden
          img
            margin 5px
            float left
        .circle-tail
          font-size $font-size-small-s
          display flex
          justify-content space-between
          .circle-mark
            display flex
            flex-direction column
            .btn-info
              color $color-can-be-click
          .circle-action
            padding 5px
            display flex
            img
              margin-right 5px
              position relative
              top 2px
    .load-wrapper
      padding-top 10px
      background $color-load-wrapper-background
      position relative
      width 100%
      height 30px
      text-align center
      font-size $font-size-medium
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
