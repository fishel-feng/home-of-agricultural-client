<template>
  <div class="user-edit">
    <mt-header fixed title="编辑个人资料">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="container">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="nickName"/>
      <div class="head-image-container">
        <span>头像</span>
        <img :src="`http://localhost:7001/public/headImage/${headImage}`" width="40px" height="40px" alt="">
        <uploader @success="uploadSuccess" :src="'http://localhost:7001/upload/headImage'"/>
      </div>
      <mt-field label="个人简介" placeholder="在此输入个人简介" :attr="{ maxlength: 40 }" type="textarea" rows="3" v-model="description"/>
      <div class="gender">
        <span>性别</span>
        <mt-radio
          v-model="gender"
          :options="['男', '女', '保密']">
        </mt-radio>
      </div>
      <mt-field label="年龄" type="number" placeholder="输入年龄" v-model="age"/>
      <mt-field label="地区" placeholder="输入所在地区" v-model="location"/>
      <mt-field label="职业" placeholder="输入您的职业" v-model="job"/>
      <mt-button @click.native="submit" type="primary" class="btn-submit">保存修改</mt-button>
    </div>
  </div>
</template>

<script>
  import Uploader from '@/components/abstract/uploader'
  import { accountTestMixin } from '@/common/js/mixin'
  import axios from 'axios'
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
        headImage: ''
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
        axios.get(`http://127.0.0.1:7001/user/getUserInfo/${this.myId}`).then(res => {
          if (res.data.code === 200) {
            let user = res.data.data.user
            this.nickName = user.nickName
            this.description = user.description
            this.gender = user.gender
            this.age = user.age
            this.location = user.location
            this.job = user.job
            this.headImage = user.headImage
          }
        })
      },
      uploadSuccess () {
        // todo
      },
      submit () {
        // todo
      }
    }
  }
</script>

<style lang="stylus" scoped>
.user-edit
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  .container
    margin-top 40px
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
