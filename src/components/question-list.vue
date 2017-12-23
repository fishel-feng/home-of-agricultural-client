<template>
  <div class="question-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item.userId)">
        <img v-if="isSolved" class="solve" src="../assets/svg/solve.svg" width="40px" alt="">
        <div class="title">问题标题问题标题问题标题问题标题问题标题问题标题</div>
        <div class="content">问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容问题内容</div>
        <div class="tail">
          <div class="tag">
            <img src="../assets/svg/tag.svg" width="12px" alt="">
            标签
          </div>
          <div class="answerCount">回答数量</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
    //
  }
}
</script>

<style lang="stylus" scoped>
.question-list
  padding-top 3px
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
    .tail
      min-height 14px
      display flex
      justify-content space-between
      font-size 12px
</style>
