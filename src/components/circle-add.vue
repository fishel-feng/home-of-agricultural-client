<template>
  <!-- <transition name="top"> -->
    <div class="circle-add">
      <mt-header fixed title="发表动态">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <mt-field placeholder="输入此刻想法" :attr="{ maxlength: 300 }" type="textarea" rows="6" v-model="content"></mt-field>
      <div class="hint">
        <div>
          最多300字
        </div>
        <div>
          剩余{{rest}}字
        </div>
      </div>
      <div class="image-wrapper">
        <div class="image-button">
          <a href="javascript:;" class="file">
            <img src="../assets/svg/add.svg" width="90px" height="90px" alt="">
            <input type="file" name="" id="">
          </a>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data () {
    return {
      content: ''
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
.circle-add
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  margin-top 50px
  background #fff
  .hint
    color #4b4b4b
    padding 20px
    display flex
    justify-content space-between
    margin-top 20px
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
