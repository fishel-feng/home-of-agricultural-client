<template>
  <transition name="slide">
    <div class="comment-list">
      <mt-header fixed title="评论详情">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <ul>
          <li v-for="(comment, index) in comments" :key="index" @click="giveComment(comment.userId, comment.nickName)" class="item">
            <div class="user-info">
              <div>
                <span @click.stop="getUserInfo(comment.userId)" class="nickname">{{comment.nickName}}</span>
                <span v-if="comment.targetId">回复 <span class="nickname" @click.stop="getUserInfo(comment.targetId)">{{comment.targetName}}</span></span>
                :
              </div>
              <div class="right">
                {{getTime(comment.time)}}
                <div v-if="comment.userId===myId" @click.stop="deleteComment(comment._id)">删除</div>
              </div>
            </div>
            <div class="content">{{comment.content}}</div>
          </li>
        </ul>
      </div>
      <router-view/>
    </div>
  </transition>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui'
  import {getTimeMixin, accountTestMixin, goToRelativePathMixin} from '@/common/js/mixin'
  export default {
    mixins: [getTimeMixin, accountTestMixin, goToRelativePathMixin],
    data () {
      return {
        comments: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$axios.get(`/circle/getComment/${this.$route.query.id}`).then(res => {
          if (res.data.code === 200) {
            this.comments = res.data.data.comments
          }
        })
      },
      giveComment (targetId, targetName) {
        this.goToRelativePath(`replyComment?id=${this.$route.query.id}&targetId=${targetId}&targetName=${targetName}`)
      },
      getUserInfo (userId) {
        this.goToRelativePath('userCard?userId=' + userId)
      },
      deleteComment (commentId) {
        MessageBox.confirm('确定删除这条内容吗？', {
          title: '提示',
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(action => {
          this.$axios.post('/circle/deleteComment', {
            circleId: this.$route.query.id,
            commentId: commentId
          }).then(res => {
            if (res.data.code === 200) {
              let index = this.comments.findIndex(item => {
                return item._id === commentId
              })
              this.comments.splice(index, 1)
              Toast({
                message: '删除成功',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        }).catch(e => {
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // if (from.path === '/question/addCircle' && from.query.flag) {
        //   this.selected = ''
        //   this.getPageContent()
        // }
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .comment-list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
    .container
      width 100%
      position fixed
      overflow-y auto
      top 40px
      bottom 0
      background #ccc
      .item
        background #fff
        padding 10px
        margin-bottom 3px
        .user-info
          display flex
          justify-content space-between
          margin-bottom 15px
          font-size 16px
          .nickname
            color #0f0
          .right
            font-size 10px
            display flex
            div
              margin-left 5px
        .content
          line-height: normal
          font-size 16px
</style>
