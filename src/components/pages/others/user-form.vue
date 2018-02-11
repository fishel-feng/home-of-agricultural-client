<template>
  <transition name="slide">
    <div class="user-form">
      <mt-header fixed :title="isNew?'用户注册':'找回密码'">
        <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      </mt-header>
      <div class="form-wrapper">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"/>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"/>
        <mt-field label="重复密码" placeholder="请再次输入密码" type="password" v-model="repeatPassword"/>
        <mt-field label="验证码" v-model="captcha">
          <mt-button v-if="!waiting" @click.native="sendCode" plain type="primary" class="btn-code" height="45px" width="100px">发送验证码</mt-button>
          <mt-button v-if="waiting" disabled plain type="primary" class="btn-code" height="45px" width="100px">{{count}}s后重新发送</mt-button>
        </mt-field>
        <mt-button v-if="isNew" @click.native="signUp" class="submit" type="primary">注册</mt-button>
        <mt-button v-if="!isNew" @click.native="resetPassword" class="submit" type="primary">找回密码</mt-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { loginMixin } from '@/common/js/mixin'
import { encryptPassword } from '@/common/js/util'
import { mapActions } from 'vuex'
import axios from 'axios'
import { Toast, MessageBox } from 'mint-ui'
const TIME_COUNT = 60
export default {
  mixins: [loginMixin],
  data () {
    return {
      captcha: '',
      phone: '',
      password: '',
      repeatPassword: '',
      waiting: false,
      count: TIME_COUNT,
      timer: null,
      isNew: false
    }
  },
  mounted () {
    this.isNew = (this.$route.path === '/signUp')
  },
  watch: {
    '$route' (to, from) {
      this.isNew = (this.$route.path === '/signUp')
    }
  },
  methods: {
    disabledButton () {
      if (!this.timer) {
        this.count = TIME_COUNT
        this.waiting = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.waiting = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    ...mapActions([
      'addToken'
    ]),
    sendCode () {
      if (this.phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)) {
        this.disabledButton()
        axios.post('http://127.0.0.1:7001/user/sendVerifyCode', {
          tel: this.phone,
          reset: !this.isNew
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '发送成功',
              position: 'bottom',
              duration: 3000
            })
          }
          if (res.data.code === 455) {
            Toast({
              message: '此手机号已被注册',
              position: 'bottom',
              duration: 3000
            })
            this.waiting = false
            clearInterval(this.timer)
            this.timer = null
          }
          if (res.data.code === 492) {
            Toast({
              message: '此用户不存在',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      } else {
        Toast({
          message: '请正确填写手机号',
          position: 'bottom',
          duration: 3000
        })
      }
    },
    verifyParams (phone, password, repeatPassword, captcha) {
      if (!password) {
        Toast({
          message: '请输入密码',
          position: 'bottom',
          duration: 3000
        })
        return false
      }
      if (password !== repeatPassword) {
        Toast({
          message: '两次输入的密码不一致',
          position: 'bottom',
          duration: 3000
        })
        return false
      }
      if (!phone || !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone) || !captcha || !/^\d{6}$/.test(captcha)) {
        Toast({
          message: '手机号或验证码格式错误',
          position: 'bottom',
          duration: 3000
        })
        return false
      }
      return true
    },
    signUp () {
      if (this.verifyParams(this.phone, this.password, this.repeatPassword, this.captcha)) {
        const password = encryptPassword(this.password)
        axios.post('http://127.0.0.1:7001/user/signUp', {
          tel: this.phone,
          password,
          code: this.captcha
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '注册成功',
              position: 'bottom',
              duration: 3000
            })
            const token = res.data.data.token
            this.initUserInfo(token)
            MessageBox.confirm('注册成功，是否完善个人信息', {
              closeOnClickModal: false,
              confirmButtonText: '现在',
              cancelButtonText: '以后'
            }).then(action => {
              this.$router.replace('/user')
            }).catch(e => {
              this.$router.go(-1)
            })
          } else if (res.data.code === 457) {
            Toast({
              message: '验证码错误',
              position: 'bottom',
              duration: 3000
            })
          } else if (res.data.code === 455) {
            Toast({
              message: '此手机号已被注册',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      }
    },
    resetPassword () {
      if (this.verifyParams(this.phone, this.password, this.repeatPassword, this.captcha)) {
        const password = encryptPassword(this.password)
        axios.post('http://127.0.0.1:7001/user/resetPassword', {
          tel: this.phone,
          password,
          code: this.captcha
        }).then(res => {
          if (res.data.code === 200) {
            Toast({
              message: '修改成功',
              position: 'bottom',
              duration: 3000
            })
            this.$router.go(-1)
          } else if (res.data.code === 457) {
            Toast({
              message: '验证码错误',
              position: 'bottom',
              duration: 3000
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.user-form
  position fixed
  overflow-y:auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
  padding 20px
  .form-wrapper
    margin-top 40px
    display flex
    flex-direction column
    .btn-code
      font-size 10px
    .submit
      margin-top 20px
      flex  1
</style>
