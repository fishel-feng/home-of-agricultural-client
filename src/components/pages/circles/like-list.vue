<template>
  <transition name="slide">
    <div class="like-list">
      <mt-header title="点赞的人">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <person-list :data="likes"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import PersonList from '@/components/abstract/person-list'
  export default {
    data () {
      return {
        likes: []
      }
    },
    components: {
      PersonList
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        const circleId = this.$route.query.id
        this.$axios.get(`/circle/getLikeList/${circleId}`).then(res => {
          if (res.data.code === 200) {
            this.likes.push(...res.data.data.likes)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .like-list
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      position fixed
      overflow-y auto
      bottom 0
      top 40px
      width 100%
</style>
