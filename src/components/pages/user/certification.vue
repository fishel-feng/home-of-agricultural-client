<template>
  <transition name="slide">
    <div class="certification">
      <mt-header fixed title="专家认证">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div v-if="certification" class="container">
        <div class="success">
          <span>我的认证状态</span>
          <span class="expert-state">
            <img src="../../../assets/svg/v.svg" width="12px" height="12px" alt="">
            {{certification}}专家
          </span>
        </div>
      </div>
      <div v-if="!certification" class="container">
        <div class="title">你可以申请认证成为专家，帮助更多人解决问题</div>
        <div class="guide">申请认证需要填写实名信息和申请理由，我们会在三个工作日内为您处理</div>
        <div class="tag-wrapper">
          <div>认证标签：{{tag}}</div>
          <mt-button @click.native="tagRadio = true" type="primary" size="small">选择认证标签</mt-button>
        </div>
        <div class="uploader">
          上传身份证正反两面照片：
          <uploader @success="uploadSuccess" :src="'/upload/expert'"/>
        </div>
        <mt-popup @click.native="tagRadio = false" v-model="tagRadio" class="tag-radio">
          <mt-radio align="right" v-model="tag" :options="tags"></mt-radio>
        </mt-popup>
        <mt-field label="姓名" placeholder="请输入真实姓名" v-model="realName"></mt-field>
        <mt-field label="身份证号" placeholder="请输入身份证号码" v-model="idCardNumber"></mt-field>
        <mt-field label="申请理由" placeholder="请填写申请条件" type="textarea" rows="8"  v-model="message"></mt-field>
        <div class="btn-wrapper">
          <mt-button @click.native="submit" class="btn-submit" type="primary">提交认证信息</mt-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import Uploader from '@/components/abstract/uploader'
  export default {
    data () {
      return {
        tag: '',
        tags: [],
        tagRadio: false,
        realName: '',
        idCardNumber: '',
        message: '',
        images: []
      }
    },
    mounted () {
      this.getTag()
    },
    components: {
      Uploader
    },
    computed: {
      ...mapGetters([
        'certification'
      ])
    },
    methods: {
      getTag () {
        this.$axios.get('/question/getTags').then(res => {
          if (res.data.code === 200) {
            res.data.data.forEach(element => {
              this.tags.push(element.tagName)
            })
          }
        })
      },
      uploadSuccess (images) {
        this.images.push(...images)
        Toast({
          message: '上传图片成功',
          position: 'bottom',
          duration: 2000
        })
      },
      submit () {
        if (!this.realName) {
          Toast({
            message: '姓名不可为空',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (!this.idCardNumber || !/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(this.idCardNumber)) {
          Toast({
            message: '身份证号码不合法',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (!this.message) {
          Toast({
            message: '请输入申请理由',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (!this.tag) {
          Toast({
            message: '请选择认证标签',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        if (!this.images.length) {
          Toast({
            message: '请上传照片',
            position: 'bottom',
            duration: 2000
          })
          return
        }
        this.$axios.post('/user/applyCertification', {
          realName: this.realName,
          idCardNumber: this.idCardNumber,
          urls: this.images,
          tag: this.tag,
          message: this.message
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '申请成功，将在三个工作日内收到回复',
              position: 'bottom',
              duration: 3000
            })
            this.$router.go(-1)
          } else if (res.data.code === 444) {
            Toast({
              message: '您已申请认证，请耐心等待',
              position: 'bottom',
              duration: 3000
            })
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
  .certification
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    padding-top 40px
    background $color-article-background
    .container
      width 100%
      position fixed
      top 40px
      bottom 0
      overflow-y auto
      .success
        display flex
        flex-direction column
        align-items center
        justify-content center
        span
          margin 10px
      .title
        text-align center
        color $color-user-name
        margin 2px 0
      .guide
        padding 5px
      .expert-state
        color $color-expert-font
        font-size $font-size-large-x
        background $color-expert-background
        padding 10px 20px
        border-radius 10px
      .uploader
        padding 5px
      .tag-wrapper
        display flex
        justify-content space-between
        padding 5px
        align-items: center
      .tag-radio
        width 90%
        overflow-y auto
        height 80%
        background-color $color-article-background
      .btn-wrapper
        padding 10px 5px
        .btn-submit
          width 100%
</style>


