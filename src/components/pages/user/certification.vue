<template>
  <div class="certification">
    <mt-header fixed title="专家认证">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    专家认证
  </div>
</template>

<script>
export default {
  // todo
}
</script>

<style lang="stylus" scoped>
.certification
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  margin-top 40px
  background #fff
</style>


