<template>
  <transition name="slide">
    <div class="question-info">
      <mt-header fixed title="问题详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="content-wrapper">
        <div class="question-title">这里是问题标题</div>
        <div class="question-content">这里是问题描述</div>
        <div class="question-image">
          <img src="../assets/svg/hot.svg" width="100px" height="100px"  alt="">
        </div>
        <div class="questioner-info">
          <img src="../assets/svg/hot.svg" width="30px" height="30px" alt="">
          <div class="questioner-desc">
            <div class="nick-name">nickName</div>
            <div class="location">地区</div>
            <div>时间</div>
          </div>
          <mt-button class="btn-attention" type="primary" size="small">关注问题</mt-button>
        </div>
        <div class="btn-question">
          <div>邀请专家</div>
          <div>我要回答</div>
        </div>
        <ul class="answer-container">
          <li class="answer-item">
            <div>
              <div>回答内容balabala</div>
              <img src="../assets/svg/hot.svg" width="100px" height="100px"  alt="">
            </div>
            <img src="../assets/svg/hot.svg" width="30px" height="30px" alt="">
            <div>
              <span>昵称</span>
            </div>
          </li>
          <li class="answer-item">
            <div>
              <div>回答内容balabala</div>
              <img src="../assets/svg/hot.svg" width="100px" height="100px"  alt="">
            </div>
            <img src="../assets/svg/hot.svg" width="30px" height="30px" alt="">
            <div>
              <span>昵称</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  //
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.question-info
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  background #fff
  .content-wrapper
    margin-top 40px
    .question-title
      padding 10px
      font-size 20px
    .question-image
      padding 10px
    .question-content
      padding 10px
      font-size 16px
    .questioner-info
      padding 10px
      display flex
      justify-content space-between
      img
        margin-right 10px
      .questioner-desc
        flex 1
        display flex
        align-items center
        font-size 12px
      .nick-name
        color #0f0
      .location
        margin-left 10px
        margin-right 10px
    .btn-question
      display flex
      div
        border-radius 5px
        color white
        border 1px solid #cdcdcd
        line-height 40px
        height 40px
        text-align center
        flex 1
        background #26a2ff
    .answer-container
      background #ccc
      .answer-item
        margin 3px 0
        background: #fff
</style>
