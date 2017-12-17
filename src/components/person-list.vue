<template>
  <div class="person-list">
    <ul>
      <li class="item" v-for="item in data">
        <img :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="60px" alt="">
        <div class="text">
          <div class="nick-name">{{item.nickName}}</div>
          <div>{{item.description}}</div>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.person-list
  padding 10px
  .item
    height 80px
    display flex
    .text
      display flex
      flex-direction column
      justify-content space-around
      padding 10px
      font-size 12px
      .nick-name
        font-size 16px
</style>
