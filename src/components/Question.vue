<template>
  <div class="question">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">选项</mt-tab-item>
      <mt-tab-item id="2">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item id="3">选项</mt-tab-item>
      <mt-tab-item @click.native="selectItem">+</mt-tab-item>
    </mt-navbar>
    <router-view></router-view>
    <div @click="addQuestion" class="btn-add">问</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to 问专家页面',
      selected: 1
    }
  },
  methods: {
    main_log (val) {
      console.log('main_log', val)
    },
    addQuestion () {
      this.$router.push('/addQuestion')
    },
    selectItem () {
      this.$router.push('/question/selectItem')
    }
  }
}
</script>

<style lang="stylus" scoped>
.question
  // margin-top 40px
  margin-bottom 55px
  width: 100%
  .btn-add
    text-align center
    line-height 50px
    width 50px
    height 50px
    border-radius 50%
    position fixed
    right 10px
    bottom 65px
    color #fff
    background-color #26a2ff
</style>
