<template>
  <div class="wiki">
    <div class="search-container">
      <mt-search class="search" v-model="keyWord"></mt-search>
      <!--<img src="../../../assets/svg/search.svg" width="18px" height="18px" alt="">-->
      <!--<mt-field placeholder="在此输入查询关键词" v-model="keyWord"></mt-field>-->
      <mt-button @click.native="search" type="primary" class="btn-submit">搜索</mt-button>
    </div>
    <dl class="item-container">
      <dt class="title">粮食种植</dt>
      <div class="item-wrapper">
        <dd class="item" @click="getItem">水稻</dd>
        <dd class="item">小麦</dd>
        <dd class="item">玉米</dd>
        <dd class="item">大豆</dd>
        <dd class="item">花生</dd>
        <dd class="item">高粱</dd>
      </div>
      <dt class="title">蔬菜种植</dt>
      <div class="item-wrapper">
        <dd class="item">番茄</dd>
        <dd class="item">黄瓜</dd>
        <dd class="item">土豆</dd>
        <dd class="item">辣椒</dd>
        <dd class="item">茄子</dd>
        <dd class="item">萝卜</dd>
      </div>
      <dt class="title">水果种植</dt>
      <div class="item-wrapper">
        <dd class="item">苹果</dd>
        <dd class="item">香蕉</dd>
        <dd class="item">葡萄</dd>
        <dd class="item">樱桃</dd>
        <dd class="item">橘子</dd>
        <dd class="item">芒果</dd>
      </div>
      <dt class="title">其他</dt>
      <div class="item-wrapper">
        <dd class="item">病害防治</dd>
        <dd class="item">植保信息</dd>
        <dd class="item">农药信息</dd>
        <dd class="item">价格行情</dd>
      </div>
    </dl>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWord: ''
    }
  },
  methods: {
    search () {
      if (!this.keyWord.trim()) {
        return
      }
      this.$router.push('/wiki/content?keyWord=' + this.keyWord)
    },
    getItem () {
      this.$router.push('/wiki/content?keyWord=' + '水稻')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .wiki
    position absolute
    background $color-article-background
    top 0
    bottom 0
    width: 100%
    z-index 100
    .search-container
      display flex
      flex-direction column
      justify-content center
      align-items center
      position relative
      height 52px
      .search
        width 80%
        margin-right 60px
      .btn-submit
        position absolute
        top 5px
        bottom 0
        right 0
    .item-container
      padding 10px
      .title
        padding-bottom 5px
        border-bottom .5px solid #ccc;
      .item-wrapper
        margin 10px 0
        display flex
        justify-content space-around
        .item
          text-align center
          border #ccc 1px solid
          border-radius 5px
          padding 5px
</style>
