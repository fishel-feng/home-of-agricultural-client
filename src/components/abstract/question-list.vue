<template>
  <div class="question-list">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item" v-for="(item,index) in questions" :key="index" @click="showQuestionInfo(item._id)">
          <div class="title">
            {{item.title}}
            <span v-show="isMine(item.userId)" class="btn-del" @click.stop="deleteQuestion(item._id)">删除</span>
          </div>
          <div class="desc">{{item.desc}}</div>
          <div class="image">
            <div v-for="(image,index) in item.images" :key="index">
              <img @click.stop="showBigImage(`http://127.0.0.1:7001/public/question/${image}`)" :src="`http://127.0.0.1:7001/public/question/${image}`" width="100px" height="100px" alt="">
            </div>
          </div>
          <div class="tail">
            <div class="tag">
              <img src="../../assets/svg/tag.svg" width="12px" alt="">
              {{item.tag.tagName}}
            </div>
            <div class="answerCount">{{getTime(item.time)}} 回答 {{item.answerCount}}</div>
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
  import { Toast, MessageBox } from 'mint-ui'
  import { showImageMixin, accountTestMixin, getTimeMixin, goToRelativePathMixin } from '@/common/js/mixin'
  export default {
    mixins: [ showImageMixin, accountTestMixin, getTimeMixin, goToRelativePathMixin ],
    props: {
      questions: {
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
        this.goToRelativePath(id)
      },
      loadTop () {
        this.$emit('refresh', this.$refs.loadmore.onTopLoaded)
      },
      isMine (userId) {
        return userId === this.myId
      },
      loadMore () {
        this.$emit('load')
      },
      deleteQuestion (questionId) {
        MessageBox.confirm('确定删除这条内容吗？', {
          title: '提示',
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(() => {
          this.$axios.post('/question/deleteQuestion', {
            questionId: questionId
          }).then(res => {
            if (res.data.code === 200) {
              let index = this.questions.findIndex(item => {
                return item._id === questionId
              })
              this.questions.splice(index, 1)
              Toast({
                message: '删除成功',
                position: 'bottom',
                duration: 2000
              })
            }
          })
        }).catch(e => {})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/stylus/variable"
  .question-list
    background $color-background
    .item
      position relative
      background $color-list-item-background
      margin-bottom 3px
      padding 10px
      .title
        padding-right 30px
        font-size $font-size-large
        font-weight bold
        position relative
        .btn-del
          font-size $font-size-small-s
          position absolute
          right 0
          top 0
      .desc
        margin  5px
        font-size $font-size-medium
        color $color-hint
      .image
        padding 10px
        overflow hidden
        img
          float left
          margin 5px
      .tail
        min-height 14px
        display flex
        justify-content space-between
        font-size $font-size-small
    .load-wrapper
      padding-top 10px
      background $color-load-wrapper-background
      position relative
      width 100%
      height 30px
      text-align center
      font-size $font-size-medium
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
