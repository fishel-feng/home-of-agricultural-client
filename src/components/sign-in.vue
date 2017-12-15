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
        <mt-button @click.native="signIn" class="submit" type="primary">登录</mt-button>
      </div>
      <div class="tail-wrapper">
        <router-link to="/signUp" replace>注册新用户</router-link>
        <router-link to="/resetPassword">找回密码</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
import { encryptPassword } from '@/common/js/util'
import { mapMutations } from 'vuex'
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN'
    }),
    signIn () {
      if (!this.phone || !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone) || !this.password) {
        Toast({
          message: '请输入正确的手机号或密码',
          position: 'bottom',
          duration: 3000
        })
        return
      }
      const password = encryptPassword(this.password)
      axios.post('http://127.0.0.1:7001/user/signIn', {
        tel: this.phone,
        password
      }).then(res => {
        if (res.data.code === 423) {
          Toast({
            message: '用户名或密码错误',
            position: 'bottom',
            duration: 5000
          })
        } else if (res.data.code === 200) {
          this.setToken(res.data.data.token)
          this.$router.go(-1)
        }
      })
    }
  }
}
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
