<template>
  <!-- <transition name="top"> -->
    <div class="question-add">
      <mt-header fixed title="发起提问">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <div slot="right" @click="submit">
          提问
        </div>
      </mt-header>
      <mt-field placeholder="在此输入问题标题" :attr="{ maxlength: 20 }" v-model="title"/>
      <mt-field placeholder="在此输入问题详细描述" type="textarea" rows="6" v-model="content"/>
      <div class="tag-wrapper">
        <div>问题标签：{{tag}}</div>
        <mt-button @click.native="tagRadio = true" type="primary" size="small">选择问题标签</mt-button>
      </div>
      <uploader @addImage="addImage" @success="uploadSuccess" :src="'http://localhost:7001/upload/question'"/>
      <mt-popup @click.native="tagRadio = false" v-model="tagRadio" class="tag-radio">
        <mt-radio align="right" v-model="tag" :options="tags"/>
      </mt-popup>
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
      tag: '',
      tags: [],
      value: '',
      tagRadio: false,
      content: '',
      title: '',
      hasImage: false,
      images: []
    }
  },
  components: {
    Uploader
  },
  mounted () {
    this.getTag()
  },
  methods: {
    submit () {
      if (!this.title || !this.content) {
        Toast({
          message: '标题或内容不能为空',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      if (!this.tag) {
        Toast({
          message: '请选择问题标签',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      axios.post('http://localhost:7001/question/addQuestion', {
        title: this.title,
        content: this.content,
        tag: this.tag,
        images: this.images
      }, {
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$router.replace(`/question/all/${res.data.data.question._id}`)
        }
      })
    },
    addImage () {
      this.hasImage = true
    },
    uploadSuccess (images) {
      this.images = images
      this.hasImage = false
    },
    getTag () {
      axios.get('http://localhost:7001/questions/getTags').then(res => {
        if (res.data.code === 200) {
          res.data.data.forEach(element => {
            this.tags.push(element.tagName)
          })
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
  .tag-radio
    width 90%
    overflow-y auto
    height 80%
    background-color #fff
</style>
