<template>
  <div class="chat">
    <mt-header fixed :title="this.$route.query.userName">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="messages">
      <!--todo-->
      <div class="message-item">
        <span>风蓬飘尽悲歌气，泥絮沾来薄幸名。</span>
      </div>
      <div class="message-item right">
        <span>风蓬飘尽悲歌气，泥絮沾来薄幸名。</span>
      </div>
      <div class="message-item right">
        <img @click.stop="showBigImage(`http://img.zcool.cn/community/01833455496f930000019ae96b17d9.jpg@1280w_1l_2o_100sh.webp`)" src="../../../assets/svg/search.svg" alt="" width="120px" height="120px">
      </div>
    </div>
    <div class="input-area">
      <div class="btn-add" @click="sendImage">+</div>
      <mt-field class="input-text" type="text" v-model="message"/>
      <mt-button @click.native="sendMessage" class="btn-submit" type="primary" size="small" >发送</mt-button>
    </div>
    <div @click="hideImage" v-if="showImage" class="image-wrapper">
      <img class="big-image" :src="currentImage" alt="">
    </div>
  </div>
</template>

<script>
  import { showImageMixin } from '@/common/js/mixin'
  export default {
    mixins: [ showImageMixin ],
    data () {
      return {
        message: ''
      }
    },
    methods: {
      sendImage () {
        // todo
      },
      sendMessage () {
        // todo
      }
    }
  }
</script>

<style lang="stylus" scoped>
.chat
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  .messages
    margin-top 40px
    margin-bottom 48px
    .right
      justify-content flex-end
    .left
      justify-content flex-start
    .message-item
      width 100%
      display flex
      span
        background #ccc
        margin 5px
        padding 10px
        max-width 60%
      img
        background #ccc
        margin 5px
        padding 10px
        max-width 60%
  .input-area
    width 100%
    height 48px
    display flex
    position fixed
    bottom 0
    .btn-add
      font-weight bolder
      font-size 35px
      text-align center
      line-height 40px
      width 45px
      height 45px
      border solid 1px #26a2ff
      border-radius 50%
      color #26a2ff
      background-color #fff
    .input-text
      flex 1
      border-radius 10px
      border #218dff solid 1px
    .btn-submit
      height 100%
      width 60px
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
