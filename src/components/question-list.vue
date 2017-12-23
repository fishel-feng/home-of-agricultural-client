<template>
  <div class="question-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showQuestionInfo(item._id)">
        <img v-if="isSolved" class="solve" src="../assets/svg/solve.svg" width="40px" alt="">
        <div class="title">问题标题问题标题问题标题问题标题问题标题问题标题</div>
        <div class="content">问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容</div>
        <div class="image">
          <img @click.stop="showBigImage('http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png')" src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png" width="100px" height="100px" alt="">
          <img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png" width="100px" height="100px" alt="">
          <img src="../assets/svg/hot.svg" width="100px" alt="">
          <img src="../assets/svg/hot.svg" width="100px" alt="">
          <img src="../assets/svg/hot.svg" width="100px" alt="">
          <img src="../assets/svg/hot.svg" width="100px" alt="">
        </div>
        <div class="tail">
          <div class="tag">
            <img src="../assets/svg/tag.svg" width="12px" alt="">
            标签
          </div>
          <div class="answerCount">回答数量</div>
        </div>
      </li>
    </ul>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
  </div>
</template>

<script>
import { showImageMixin } from '@/common/js/mixin'
export default {
  mixins: [ showImageMixin ],
  props: {
    data: {
      type: Array,
      default: []
    },
    isSolved: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showQuestionInfo (id) {
      // console.log(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-list
  background #ccc
  .item
    position relative
    background #fff
    margin-bottom 3px
    padding 10px
    .solve
      right 0
      top auto
      bottom auto
      position absolute
    .title
      font-size 18px
      font-weight bold
    .content
      margin  5px
      margin-top 5px
      font-size 14px
      color #4b4b4b
    .image
      padding 10px
      display flex
      flex-wrap wrap
      justify-content space-around
      align-items flex-start
    .tail
      min-height 14px
      display flex
      justify-content space-between
      font-size 12px
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
