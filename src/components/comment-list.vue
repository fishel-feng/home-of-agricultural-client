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
              <div class="time">{{getTime(comment.time)}}</div>
            </div>
            <div class="content">{{comment.content}}</div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import {getTimeMixin} from '@/common/js/mixin'
  import axios from 'axios'
  export default {
    mixins: [getTimeMixin],
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
        axios.get(`http://127.0.0.1:7001/circle/getComment/${this.$route.params.circleId}`).then(res => {
          if (res.data.code === 200) {
            this.comments = res.data.data.comments
          }
        })
      },
      giveComment (targetId, targetName) {
        this.$router.push(`/addComment?id=${this.$route.params.circleId}&targetId=${targetId}&targetName=${targetName}`)
      },
      getUserInfo (userId) {
        this.$router.push(`/user/${userId}`)
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
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
    .container
      background #ccc
      margin-top 40px
      .item
        background #fff
        padding 10px
        margin 3px 0
        .user-info
          display flex
          justify-content space-between
          margin-bottom 15px
          font-size 16px
          .nickname
            color #0f0
          .time
            font-size 10px
        .content
          line-height: normal
          font-size 16px
</style>
