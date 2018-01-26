<template>
  <div class="person-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item.userId)">
        <div class="user-wrapper">
          <img :src="`http://localhost:7001/public/headImage/${item.headImage}`" width="70px" height="70px" alt="">
          <div class="text">
              <div class="nick-name">{{item.nickName}}</div>
              <div>{{item.description}}</div>
          </div>
        </div>
        <div v-if="showButton" class="btn-wrapper">
          <mt-button size="small" type="primary">邀请</mt-button>
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
    },
    showButton: {
      type: Boolean,
      default: false
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
    margin-bottom 3px
    padding 10px
    min-height 70px
    display flex
    background #fff
    justify-content space-between
    align-items center
    .user-wrapper
      display flex
      .text
        display flex
        flex-direction column
        justify-content space-around
        margin-left 10px
        font-size 12px
        .nick-name
          font-size 16px
    .btn-wrapper
      min-width 60px
</style>
