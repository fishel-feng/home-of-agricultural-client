<template>
  <div class="list-view">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li class="list-item" v-for="(item,index) in data" :key="index" @click="selectItem(item)">
        <slot></slot>
      </li>
      <div class="load-wrapper">
        <div class="load-more" v-show="!showLoading" v-text="loadMore"></div>
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
    loadMore: {
      type: String,
      default: '已无更多内容'
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-view
  padding-top 3px
  .list-item
    display block
    padding 15px
    color black
  .load-wrapper
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
</style>
