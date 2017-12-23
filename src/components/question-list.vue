<template>
  <div class="question-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item.userId)">
        <div>问题标题</div>
        <div>问题内容</div>
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
.item
  padding 10px
</style>
