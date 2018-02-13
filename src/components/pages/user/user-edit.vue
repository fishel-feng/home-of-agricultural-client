<template>
  <transition name="slide">
    <div class="user-edit">
      <mt-header fixed title="编辑个人资料">
        <mt-button @click.native="back" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="container">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="nickName"></mt-field>
        <div class="head-image-container">
          <span>头像</span>
          <img :src="`http://localhost:7001/public/headImage/${headImage}`" width="40px" height="40px" alt="">
          <uploader :once="true" @addImage="addImage" @success="uploadSuccess" @empty="clearImage" :src="'/upload/headImage'"/>
          &nbsp;上传头像
        </div>
        <mt-field label="个人简介" placeholder="在此输入个人简介" :attr="{ maxlength: 40 }" type="textarea" rows="3" v-model="description"></mt-field>
        <div class="gender">
          <span>性别</span>
          <mt-radio
            v-model="gender"
            :options="['男', '女', '保密']">
          </mt-radio>
        </div>
        <mt-field label="年龄" type="number" placeholder="输入年龄" v-model="age"></mt-field>
        <mt-field label="地区" placeholder="输入所在地区" v-model="location"></mt-field>
        <mt-field label="职业" placeholder="输入您的职业" v-model="job"></mt-field>
        <mt-button @click.native="submit" type="primary" class="btn-submit">保存修改</mt-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import Uploader from '@/components/abstract/uploader'
  import { accountTestMixin } from '@/common/js/mixin'
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    mixins: [accountTestMixin],
    data () {
      return {
        nickName: '',
        description: '',
        gender: '',
        age: 0,
        location: '',
        job: '',
        headImage: '',
        hasImage: false
      }
    },
    components: {
      Uploader
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        this.$axios.get(`/user/getUserInfo/${this.myId}`).then(res => {
          if (res.data.code === 200) {
            let user = res.data.data.user
            this.nickName = user.nickName || ''
            this.description = user.description || ''
            this.gender = user.gender || ''
            this.age = user.age || 0
            this.location = user.location || ''
            this.job = user.job || ''
            this.headImage = user.headImage || ''
          }
        })
      },
      uploadSuccess (images) {
        this.headImage = images[0]
        this.hasImage = false
      },
      clearImage () {
        this.hasImage = false
      },
      addImage () {
        this.hasImage = true
      },
      back () {
        MessageBox.confirm('是否保存修改', {
          closeOnClickModal: true,
          confirmButtonText: '保存',
          cancelButtonText: '不保存'
        }).then(action => {
          this.submit()
        }).catch(e => {
          this.$router.go(-1)
        })
      },
      submit () {
        if (this.hasImage) {
          Toast({
            message: '有未上传的图片，请上传完毕或取消上传后再继续',
            position: 'bottom',
            duration: 3000
          })
          return
        }
        this.$axios.post(`/user/modifyUserInfo`, {
          nickName: this.nickName,
          gender: this.gender,
          age: this.age,
          job: this.job,
          location: this.location,
          description: this.description,
          headImage: this.headImage
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '修改信息成功',
              position: 'bottom',
              duration: 2000
            })
            this.$router.replace('/user/edit?flag=' + true)
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
  .user-edit
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-article-background
    .container
      z-index 200
      position fixed
      overflow-y auto
      top 40px
      bottom 0
      width 100%
      padding 10px
      .head-image-container
        display flex
        align-items center
        span
          margin-left 10px
          margin-right 60px
        img
          margin-right 10px
      .gender
        margin-left 10px
        display flex
        flex-direction row
        align-items center
        span
          margin-right 50px
      .btn-submit
        margin-top 10px
        width 100%
</style>
