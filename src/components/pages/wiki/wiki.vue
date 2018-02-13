<template>
  <div class="wiki">
    <div class="container">
      <img src="../../../assets/svg/search.svg" width="180px" height="180px" alt="">
      <mt-field placeholder="在此输入查询关键词" v-model="keyWord"></mt-field>
      <mt-button @click.native="search" type="primary" class="btn-submit">搜索</mt-button>
    </div>
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
      // todo
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
  .wiki
    position absolute
    background $color-background
    top 0
    bottom 0
    width: 100%
    .container
      padding 50px 0
      display flex
      flex-direction column
      justify-content center
      align-items center
      .btn-submit
        margin-top 20px
</style>
