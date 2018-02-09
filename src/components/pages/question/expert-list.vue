<template>
  <transition name="slide">
    <div class="expert-list">
      <mt-header title="相关专家">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <person-list @select="inviteExpert" :showButton="true" :text="'邀请'" :data="experts"/>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import { accountTestMixin } from '@/common/js/mixin'
  import PersonList from '@/components/abstract/person-list'
  export default {
    mixins: [ accountTestMixin ],
    components: {
      PersonList
    },
    data () {
      return {
        experts: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get('http://127.0.0.1:7001/question/getExpertList/' + this.$route.query.tag).then(res => {
          if (res.data.code === 200) {
            this.experts = res.data.data.experts
          }
        })
      },
      inviteExpert (item) {
        this.$socket.emit('invite', this.token, item._id, this.$route.query.questionId)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
  .expert-list
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
</style>
