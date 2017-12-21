<template>
  <!-- <transition name="top"> -->
    <div class="question-add">
      <mt-header fixed title="发起提问">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <mt-field placeholder="在此输入问题标题" v-model="title"></mt-field>
      <mt-field placeholder="在此输入问题详细描述" type="textarea" rows="6" v-model="content"></mt-field>
      <div class="tag-wrapper">
        <div>问题标签：{{tag}}</div>
        <mt-button @click.native="addItem" type="primary" size="small">选择问题标签</mt-button>
      </div>
      <div class="image-wrapper">
        <div class="image-button">
          <a href="javascript:;" class="file">
            <img src="../assets/svg/add.svg" width="90px" height="90px" alt="">
            <input type="file" name="" id="">
          </a>
        </div>
      </div>
      <!-- TODO 标签 -->
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data () {
    return {
      content: '',
      title: '',
      tag: ''
    }
  },
  methods: {
    addItem () {
      //
    }
  },
  computed: {
    rest () {
      return 300 - this.content.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.question-add
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  margin-top 50px
  background #fff
  .tag-wrapper
    display flex
    justify-content space-between
    padding 5px 20px
    align-items: center
  .image-wrapper
    display flex
    flex-wrap wrap
    justify-content space-between
    padding 20px
    .file
      position relative
      display inline-block
      background #ddd
      overflow hidden
      input
        display block
        width 90px
        height 90px
        position absolute
        right 0
        top 0
        opacity: 0
</style>
