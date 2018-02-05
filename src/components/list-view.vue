<template>
  <div class="list-view">
    <ul
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      :infinite-scroll-distance="distance"
      infinite-scroll-immediate-check="false">
      <slot name="item" v-for="item in data" :item="item"></slot>
      <div class="load-wrapper">
        <div class="load-more" v-show="!showLoading" v-text="moreText"></div>
        <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
      </div>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      showLoading: {
        type: Boolean,
        default: false
      },
      moreText: {
        type: String,
        default: '已无更多内容'
      },
      loading: {
        type: Boolean,
        default: false
      },
      distance: {
        type: Number,
        default: 10
      },
      disableScroll: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      loadMore () {
        this.$emit('load')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // .list-view
  // padding-top 3px
  .load-wrapper
    padding-top 10px
    background #fff
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
