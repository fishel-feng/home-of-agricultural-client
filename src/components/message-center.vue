<template>
  <!--<transition name="slide">-->
    <div class="message-center">
      <mt-header fixed title="消息中心">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="message-container">
        <div v-for="(item, index) in messages" :key="index">
          <div v-if="item.type==='like'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span> 赞了你的动态
            </div>
            <span class="time">{{getTime(item.content.time)}}</span>
          </div>
          <div v-else-if="item.type==='comment'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span> 评论了你的动态
            </div>
            <span class="time">{{getTime(item.content.time)}}</span>
          </div>
          <div v-else-if="item.type==='reply'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span> 回复了你的评论
            </div>
            <span class="time">{{getTime(item.content.time)}}</span>
          </div>
          <div v-else-if="item.type==='follow'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span> 关注了你
            </div>
            <span class="time">{{getTime(item.content.time)}}</span>
          </div>
          <div v-else-if="item.type==='invite'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span>
              邀请你回答问题
              <span class="question-title" @click.stop="showQuestionInfo(item.content.questionId)">{{item.content.title}}</span>
            </div>
            <span class="time">{{getTime(item.content.time)}}</span>
          </div>
          <div v-else-if="item.type==='answer'" class="message-item">
            <div>
              <span class="nick-name" @click.stop="showUserInfo(item.content.userId)">{{item.content.nickName}}</span>
              回答了你提出的问题
              <span class="question-title" @click.stop="showQuestionInfo(item.content.questionId)">{{item.content.title}}</span>
            </div>
          </div>
          <div v-else-if="item.type==='attention'" class="message-item">
            <div>
              你关注的问题
              <span class="question-title" @click.stop="showQuestionInfo(item.content.questionId)">{{item.content.title}}</span>
              有了新的回答
            </div>
          </div>
        </div>
      </div>
    </div>
  <!--</transition>-->
</template>

<script>
  import {getTimeMixin} from '@/common/js/mixin'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'messages'
      ])
    },
    mixins: [getTimeMixin],
    methods: {
      showUserInfo (userId) {
        this.$router.push('/user/' + userId)
      },
      showQuestionInfo (questionId) {
        this.$router.push('/question/all/' + questionId)
      }
    }
  }
</script>

<style lang="stylus" scoped>
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
  background #fff
  .message-container
    margin-top 40px
    .message-item
      min-height 50px
      display flex
      align-items center
      padding 10px
      background radial-gradient(#ccc, #fff);
      justify-content space-between
      .time
        font-size 10px
        padding-left 5px
      .nick-name
        color #f63
      .question-title
        color #83adff
</style>

