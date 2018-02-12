<template>
  <transition name="slide">
    <div class="circle-add">
      <mt-header fixed title="发表动态">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
        <div slot="right" @click="submit">
          发表
        </div>
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
      <uploader @addImage="addImage" @success="uploadSuccess" @empty="clearImage" :src="'http://localhost:7001/upload/circle'"/>
    </div>
  </transition>
</template>

<script>
import {Toast} from 'mint-ui'
import Uploader from '@/components/abstract/uploader'
import {accountTestMixin} from '@/common/js/mixin'
export default {
  mixins: [ accountTestMixin ],
  data () {
    return {
      content: '',
      hasImage: false,
      images: []
    }
  },
  components: {
    Uploader
  },
  computed: {
    rest () {
      return 300 - this.content.length
    }
  },
  methods: {
    submit () {
      if (this.hasImage) {
        Toast({
          message: '有未上传的图片，请上传完毕或取消上传后再继续',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      this.$axios.post('/circle/addCircle', {
        content: this.content,
        images: this.images
      }).then(res => {
        if (res.data.code === 200) {
          this.$router.replace('/question/addCircle?flag=' + true)
          this.$router.go(-1)
        }
      })
    },
    clearImage () {
      this.hasImage = false
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
.circle-add
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
    color #4b4b4b
    padding 20px
    display flex
    justify-content space-between
    margin-top 20px
</style>
