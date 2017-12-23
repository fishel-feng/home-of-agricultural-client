<template>
  <div class="person-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item.userId)">
        <img :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="70px" height="70px" alt="">
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
  },
  methods: {
    showUserCard (userId) {
      this.$router.push(`/user/${userId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.person-list
  background #ccc
  .item
    background #fff
    margin-bottom 3px
    padding 10px
    min-height 70px
    display flex
    .text
      display flex
      flex-direction column
      justify-content space-around
      margin-left 10px
      font-size 12px
      .nick-name
        font-size 16px
</style>
