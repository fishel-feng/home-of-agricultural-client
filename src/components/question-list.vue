<template>
  <div class="question-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item.userId)">
        <div class="title">问题标题</div>
        <div class="content">问题内容</div>
        <div>标签</div>
        <div>回答数量</div>
        <div>解决状态</div>
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
    background #fff
    margin-bottom 3px
    padding 10px
    .title
      font-size 18px
      font-weight bold
    .content
      margin-top 5px
      font-size 14px
      color #808080
</style>
