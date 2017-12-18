<template>
  <transition name="slide">
    <div class="select-item">
      <mt-header fixed title="选择问题分类">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <mt-checklist
        align="right"
        title="请选择问题分类，最多选择八项"
        v-model="value"
        :max="8"
        :options="['选项A', '选项B', '选项C']">
      </mt-checklist>
      <div class="btn-wrapper">
        <mt-button class="btn-submit" type="primary">确定</mt-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      value: ['选项A']
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.select-item
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  background #fff
  padding-top 40px
  .btn-wrapper
    padding 15px
    .btn-submit
      width 100%
</style>
