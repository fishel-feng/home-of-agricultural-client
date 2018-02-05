<template>
  <transition name="slide">
    <div class="user-question">
      <mt-header fixed title="我提问的问题">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <question-list baseUrl="http://localhost:7001/user/getQuestions/"/>
    </div>
  </transition>
</template>

<script>
import QuestionList from '@/components/abstract/question-list'
export default {
  components: {
    QuestionList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.user-question
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  padding-top 40px
</style>

