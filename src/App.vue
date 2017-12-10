<template>
<div id="app">
  <mt-header fixed :title="selected"></mt-header>
  <mt-tab-container class="container" v-model="active">
    <mt-tab-container-item id="新闻">
      <news></news>
    </mt-tab-container-item>
    <mt-tab-container-item id="百科">
      <wiki></wiki>
    </mt-tab-container-item>
    <mt-tab-container-item id="问专家">
      <question></question>
    </mt-tab-container-item>
    <mt-tab-container-item id="农友圈">
      <circles></circles>
    </mt-tab-container-item>
    <mt-tab-container-item id="我的">
      <me></me>
    </mt-tab-container-item>
  </mt-tab-container>
  <mt-tabbar @click.native="changePage" v-model="selected" class="tail">
    <mt-tab-item id="新闻">
      <img slot="icon" src="./assets/svg/home.svg"> 新闻
    </mt-tab-item>
    <mt-tab-item id="百科">
      <img slot="icon" src="./assets/svg/wiki.svg"> 百科
    </mt-tab-item>
    <mt-tab-item id="问专家">
      <img slot="icon" src="./assets/svg/question.svg"> 问专家
    </mt-tab-item>
    <mt-tab-item id="农友圈">
      <img slot="icon" src="./assets/svg/circle.svg"> 农友圈
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="./assets/svg/me.svg"> 我的
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
import News from '@/components/News'
import Wiki from '@/components/Wiki'
import Question from '@/components/Question'
import Circles from '@/components/Circles'
import Me from '@/components/Me'
export default {
  name: 'app',
  data () {
    return {
      selected: '新闻',
      active: '新闻'
    }
  },
  components: {
    News,
    Wiki,
    Question,
    Circles,
    Me
  },
  methods: {
    changePage () {
      this.active = this.selected
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  bottom: 55px
.tail
  position fixed
</style>
