<template>
  <!-- <transition name="top"> -->
    <div class="comment-add">
      <mt-header fixed title="添加评论">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <mt-field placeholder="在此写下评论" :attr="{ maxlength: 300 }" type="textarea" rows="6" v-model="content"></mt-field>
      <div class="hint">
        <div>
          最多300字
        </div>
        <div>
          剩余{{rest}}字
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
.comment-add
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
</style>
