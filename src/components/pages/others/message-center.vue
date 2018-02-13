<template>
  <transition name="slide">
    <div class="message-center">
      <mt-header fixed title="消息中心">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="message-container">
        <div class="chat-message" @click="$router.push('/user/recent')">
          聊天消息<mt-badge size="normal" type="error">{{userCount ? '有新消息' : '无最新消息'}}</mt-badge>
        </div>
        <div v-for="(item, index) in messages" :key="index">
          <div v-if="item.type==='like'" class="message-item" @click="showCircle(item.circleId, 'like')">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 赞了你的动态
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='comment'" class="message-item" @click="showCircle(item.circleId, 'comment')">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 评论了你的动态
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='reply'" class="message-item" @click="showCircle(item.circleId, 'reply')">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 回复了你的评论
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='follow'" class="message-item" @click="showFollowers">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 关注了你
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='invite'" class="message-item" @click="showQuestionInfo(item.questionId)">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span>
              邀请你回答问题
              <span class="question-title" @click.stop="showQuestionInfo(item.questionId)">{{item.title}}</span>
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='answer'" class="message-item" @click="showQuestionInfo(item.questionId)">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span>
              回答了你提出的问题
              <span class="question-title" @click.stop="showQuestionInfo(item.questionId)">{{item.title}}</span>
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
          <div v-else-if="item.type==='attention'" class="message-item" @click="showQuestionInfo(item.questionId)">
            <div>
              你关注的问题
              <span class="question-title" @click.stop="showQuestionInfo(item.questionId)">{{item.title}}</span>
              有了新的回答
            </div>
            <span class="time">{{getTime(item.time)}}</span>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {getTimeMixin, accountTestMixin} from '@/common/js/mixin'
  export default {
    computed: {
      ...mapGetters([
        'messages',
        'userCount'
      ])
    },
    mixins: [getTimeMixin, accountTestMixin],
    methods: {
      showUserInfo (userId) {
        this.$router.push('/message/userCard?userId=' + userId)
      },
      showQuestionInfo (questionId) {
        this.$router.push('/question/' + questionId)
      },
      showCircle (circleId, type) {
        this.$router.push('/user/circles?newId=' + circleId + '&type=' + type)
      },
      showFollowers () {
        this.$router.push('/user/followers')
      },
      ...mapMutations({
        setUserCount: 'SET_USER_COUNT'
      })
    },
    watch: {
      '$route' (to, from) {
        if (from.path === '/user/recent') {
          this.setUserCount(0)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .message-center
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .message-container
      margin-top 40px
      .chat-message
        background $color-background
        line-height normal
        min-height 50px
        display flex
        align-items center
        padding 10px
        justify-content space-between
      .message-item
        line-height normal
        min-height 50px
        display flex
        align-items center
        padding 10px
        background $color-message-background
        justify-content space-between
        .time
          font-size $font-size-small-s
          padding-left 5px
        .nick-name
          color $color-user-name
        .question-title
          color $color-can-be-click
</style>

