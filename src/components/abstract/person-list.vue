<template>
  <div class="person-list">
    <ul>
      <li class="item" v-for="(item,index) in data" :key="index" @click="showUserCard(item)">
        <div class="user-wrapper">
          <img :src="`http://39.106.41.253:7001/public/headImage/${item.headImage}`" width="70px" height="70px" alt="">
          <div class="text">
              <div class="nick-name">{{item.nickName}}</div>
              <div>{{item.description}}</div>
          </div>
        </div>
        <div v-if="showButton" class="btn-wrapper">
          <mt-button @click.natve.stop="select(item)" size="small" :type="item.newMessage ? 'danger':'primary'">{{item.newMessage?'新消息':text}}</mt-button>
        </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import {goToRelativePathMixin} from '@/common/js/mixin'
  export default {
    mixins: [goToRelativePathMixin],
    props: {
      data: {
        type: Array,
        default: []
      },
      showButton: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      showUserCard (item) {
        const id = item.userId ? item.userId : item._id
        this.goToRelativePath('userCard?userId=' + id)
      },
      select (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable"
  .person-list
    background $color-background
    .item
      margin-bottom 3px
      padding 10px
      min-height 70px
      display flex
      background $color-list-item-background
      justify-content space-between
      align-items center
      .user-wrapper
        display flex
        .text
          display flex
          flex-direction column
          justify-content space-around
          margin-left 10px
          font-size $font-size-small
          .nick-name
            font-size $font-size-medium-x
      .btn-wrapper
        min-width 60px
</style>
