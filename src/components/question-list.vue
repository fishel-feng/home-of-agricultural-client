<template>
  <div class="question-list">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item" v-for="(item,index) in data" :key="index" @click="showQuestionInfo(item._id)">
          <img v-if="item.finishState" class="solve" src="../assets/svg/solve.svg" width="40px" alt="">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="image" v-for="(image,index) in item.images" :key="index">
            <img @click.stop="showBigImage(`http://127.0.0.1:7001/public/question/${image}`)" :src="`http://127.0.0.1:7001/public/question/${image}`" width="100px" height="100px" alt="">
          </div>
          <div class="tail">
            <div class="tag">
              <img src="../assets/svg/tag.svg" width="12px" alt="">
              {{item.tag.tagName}}
            </div>
            <div class="answerCount">回答 {{item.answerCount}}</div>
          </div>
        </li>
        <div class="load-wrapper">
          <div class="load-more" v-show="!showLoading">无更多内容</div>
          <mt-spinner class="loading" type="triple-bounce" v-show="showLoading"></mt-spinner>
        </div>
      </ul>
    </mt-loadmore>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { showImageMixin } from '@/common/js/mixin'
export default {
  mixins: [ showImageMixin ],
  props: {
    data: {
      type: Array,
      default: []
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showQuestionInfo (id) {
      this.$router.push(this.$route.path + '/' + id)
    },
    loadTop () {
      this.$emit('refresh', this.$refs.loadmore.onTopLoaded)
    },
    loadMore () {
      this.$emit('load')
    }
  }
}
</script>

<style lang="stylus" scoped>
.question-list
  background #ccc
  .item
    position relative
    background #fff
    margin-bottom 3px
    padding 10px
    .solve
      right 0
      top auto
      bottom auto
      position absolute
    .title
      font-size 18px
      font-weight bold
    .desc
      margin  5px
      margin-top 5px
      font-size 14px
      color #4b4b4b
    .image
      padding 10px
      display flex
      flex-wrap wrap
      justify-content space-between
      align-items flex-start
      img
        margin 3px
    .tail
      min-height 14px
      display flex
      justify-content space-between
      font-size 12px
  .load-wrapper
    padding-top 10px
    background #fff
    position relative
    width 100%
    height 30px
    text-align center
    font-size 14px
  .image-wrapper
    display flex
    align-items center
    position fixed
    background rgba(0, 0, 0, 0.8)
    z-index 200
    top 0
    right 0
    left 0
    bottom 0
    .big-image
      width 100%
</style>
