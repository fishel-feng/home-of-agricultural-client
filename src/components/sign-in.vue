<template>
  <transition name="slide">
    <div class="sign-in">
      <mt-header fixed title="用户登录">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="form-wrapper">
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-button @click.native="signUp" class="submit" type="primary">登录</mt-button>
      </div>
      <div class="tail-wrapper">
        <div>注册新用户</div>
        <div>找回密码</div>
      </div>
    </div>
  </transition>
</template>

<script>
// import { encryptPassword } from '@/common/js/util'
// import { mapMutations } from 'vuex'
// import axios from 'axios'
// import { Toast } from 'mint-ui'
// const TIME_COUNT = 10
// export default {
//   data () {
//     return {
//       captcha: '',
//       phone: '',
//       password: '',
//       repeatPassword: '',
//       waiting: false,
//       count: TIME_COUNT,
//       timer: null
//     }
//   },
//   methods: {
//     disabledButton () {
//       if (!this.timer) {
//         this.count = TIME_COUNT
//         this.waiting = true
//         this.timer = setInterval(() => {
//           if (this.count > 0 && this.count <= TIME_COUNT) {
//             this.count--
//           } else {
//             this.waiting = false
//             clearInterval(this.timer)
//             this.timer = null
//           }
//         }, 1000)
//       }
//     },
//     ...mapMutations({
//       setToken: 'SET_TOKEN'
//     }),
//     sendCode () {
//       if (this.phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)) {
//         this.disabledButton()
//         axios.post('http://127.0.0.1:7001/user/sendVerifyCode', {
//           tel: this.phone
//         }).then(res => {
//           if (res.data.code === 200) {
//             Toast({
//               message: '发送成功',
//               position: 'bottom',
//               duration: 5000
//             })
//           }
//           if (res.data.code === 455) {
//             Toast({
//               message: '此手机号已被注册',
//               position: 'bottom',
//               duration: 5000
//             })
//           }
//         })
//       } else {
//         Toast({
//           message: '请正确填写手机号',
//           position: 'bottom',
//           duration: 3000
//         })
//       }
//     },
//     signUp () {
//       if (!this.password) {
//         Toast({
//           message: '请输入密码',
//           position: 'bottom',
//           duration: 3000
//         })
//         return
//       }
//       if (this.password !== this.repeatPassword) {
//         Toast({
//           message: '两次输入的密码不一致',
//           position: 'bottom',
//           duration: 3000
//         })
//         return
//       }
//       if (this.password !== this.repeatPassword) {
//         Toast({
//           message: '两次输入的密码不一致',
//           position: 'bottom',
//           duration: 3000
//         })
//         return
//       }
//       if (!this.phone || !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone) || !this.captcha || !/^\d{6}$/.test(this.captcha)) {
//         Toast({
//           message: '手机号或验证码格式错误',
//           position: 'bottom',
//           duration: 3000
//         })
//         return
//       }
//       const password = encryptPassword(this.password)
//       axios.post('http://127.0.0.1:7001/user/signUp', {
//         tel: this.phone,
//         password,
//         code: this.captcha
//       }).then(res => {
//         if (res.data.code === 200) {
//           Toast({
//             message: '注册成功',
//             position: 'bottom',
//             duration: 5000
//           })
//           this.setToken(res.data.data.token)
//           this.$router.go(-1)
//         } else if (res.data.code === 457) {
//           Toast({
//             message: '验证码错误',
//             position: 'bottom',
//             duration: 5000
//           })
//         }
//       })
//     }
//   }
// }
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.sign-in
  position fixed
  overflow-y:auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background: #fff
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
  .tail-wrapper
    color #9cf
    margin-top 40px
    display flex
    justify-content space-between
</style>
