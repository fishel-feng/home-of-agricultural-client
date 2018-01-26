<template>
  <!-- <transition name="top"> -->
  <div class="question-add">
    <mt-header fixed title="添加回答">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <div slot="right" @click="submit">
        回答
      </div>
    </mt-header>
    <mt-field placeholder="在此输入答案" type="textarea" rows="6" v-model="content"/>
    <uploader @addImage="addImage" @success="uploadSuccess" :src="'http://localhost:7001/upload/answer'"/>
  </div>
  <!-- </transition> -->
</template>

<script>
  import Uploader from '@/components/uploader'
  import axios from 'axios'
  import { Toast } from 'mint-ui'
  import { accountTestMixin } from '@/common/js/mixin'
  export default {
    mixins: [ accountTestMixin ],
    data () {
      return {
        content: '',
        title: '',
        hasImage: false,
        images: []
      }
    },
    components: {
      Uploader
    },
    methods: {
      submit () {
        if (!this.content) {
          Toast({
            message: '内容不能为空',
            position: 'bottom',
            duration: 3000
          })
          return
        }
        axios.post('http://localhost:7001/question/addAnswer', {
          questionId: this.$route.query.questionId,
          content: this.content,
          images: this.images
        }, {
          headers: {
            Authorization: this.token
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.go(-1)
          }
        })
      },
      addImage () {
        this.hasImage = true
      },
      uploadSuccess (images) {
        this.images = images
        this.hasImage = false
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
</style>
