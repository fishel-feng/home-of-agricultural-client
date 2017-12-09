<template>
<div id="app">
  <mt-header fixed :title="selected"></mt-header>
  <router-view></router-view>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="新闻">
      <img slot="icon" src="./assets/home.svg"> 新闻
    </mt-tab-item>
    <mt-tab-item id="百科">
      <img slot="icon" src="./assets/wiki.svg"> 百科
    </mt-tab-item>
    <mt-tab-item id="专家">
      <img slot="icon" src="./assets/question.svg"> 问专家
    </mt-tab-item>
    <mt-tab-item id="农友圈">
      <img slot="icon" src="./assets/circle.svg"> 农友圈
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="./assets/me.svg"> 我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      selected: '新闻'
    }
  }
}
</script>

<style>

</style>
