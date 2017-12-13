<template>
<div id="tail">
  <mt-tabbar @click.native="select" v-model="selected" class="tail">
    <mt-tab-item id="news">
        <img slot="icon" src="../assets/svg/home.svg"> 新闻
    </mt-tab-item>
    <mt-tab-item id="wiki">
      <img slot="icon" src="../assets/svg/wiki.svg"> 百科
    </mt-tab-item>
    <mt-tab-item id="question">
      <img slot="icon" src="../assets/svg/question.svg"> 问专家
    </mt-tab-item>
    <mt-tab-item id="circles/all">
      <img slot="icon" src="../assets/svg/circle.svg"> 农友圈
    </mt-tab-item>
    <mt-tab-item id="user">
      <img slot="icon" src="../assets/svg/user.svg"> 我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'news'
    }
  },
  methods: {
    select () {
      this.$emit('select', this.selected)
    }
  }
}
</script>

<style lang="stylus">
.tail
  position fixed
</style>
