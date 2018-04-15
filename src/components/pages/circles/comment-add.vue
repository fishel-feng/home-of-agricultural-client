<template>
   <transition name="slide">
    <div class="comment-add">
      <mt-header fixed :title="this.$route.query.targetId ? `回复评论 ${this.$route.query.targetName}` : '添加评论'">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
        <div slot="right" @click="submit">
          发表
        </div>
      </mt-header>
      <mt-field :placeholder="this.$route.query.targetId ? '在此添加回复' : '在此写下评论'" :attr="{ maxlength: 300 }" type="textarea" rows="6" v-model="content"></mt-field>
      <div class="hint">
        <div>
          最多300字
        </div>
        <div>
          剩余{{rest}}字
        </div>
      </div>
    </div>
   </transition>
</template>

<script>
  import { BASE_API_PATH } from '@/common/js/util'
  import {accountTestMixin} from '@/common/js/mixin'
  export default {
    mixins: [ accountTestMixin ],
    data () {
      return {
        content: ''
      }
    },
    computed: {
      rest () {
        return 300 - this.content.length
      }
    },
    methods: {
      submit () {
        this.$axios.post(BASE_API_PATH + '/circle/addComment', {
          circleId: this.$route.query.id,
          content: this.content,
          targetId: this.$route.query.targetId ? this.$route.query.targetId : ''
        }).then(res => {
          if (res.data.code === 200) {
            let url = this.$route.query.targetId ? `${this.$route.path}?flag=true` : `${this.$route.path}?index=${this.$route.query.index}&flag=true`
            this.$socket.emit('comment', this.token, this.$route.query.id, this.$route.query.targetId)
            this.$router.replace(url)
            this.$router.go(-1)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../assets/stylus/variable"
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
    padding-top 50px
    background #fff
    .hint
      color $color-hint
      padding 20px
      display flex
      justify-content space-between
      margin-top 20px
</style>
