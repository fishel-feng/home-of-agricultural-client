<template>
  <div class="message-center">
    <mt-header fixed title="消息中心">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="message-container">
      <div v-for="(item, index) in messages" :key="index">
        <div v-if="item.type==='like'" class="message-item" @click="showCircle(item.circleId)">
          <div>
            <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 赞了你的动态
          </div>
          <span class="time">{{getTime(item.time)}}</span>
        </div>
        <div v-else-if="item.type==='comment'" class="message-item" @click="showCircle(item.circleId)">
          <div>
            <span class="nick-name" @click.stop="showUserInfo(item.userId)">{{item.nickName}}</span> 评论了你的动态
          </div>
          <span class="time">{{getTime(item.time)}}</span>
        </div>
        <div v-else-if="item.type==='reply'" class="message-item" @click="showCircle(item.circleId)">
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getTimeMixin, accountTestMixin} from '@/common/js/mixin'
  export default {
    computed: {
      ...mapGetters([
        'messages'
      ])
    },
    mixins: [getTimeMixin, accountTestMixin],
    methods: {
      showUserInfo (userId) {
        this.$router.push('/user/' + userId)
      },
      showQuestionInfo (questionId) {
        this.$router.push('/question/all/' + questionId)
      },
      showCircle (circleId) {
        this.$router.push('/user/circles?id=' + circleId)
      },
      showFollowers () {
        this.$router.push('/user/followers')
      }
    }
  }
</script>

<style lang="stylus" scoped>
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
      line-height normal
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

