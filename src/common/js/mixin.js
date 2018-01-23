import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import axios from 'axios'

export const loginMixin = {
  methods: {
    ...mapActions([
      'addToken',
      'saveUserInfo'
    ]),
    initUserInfo (token) {
      this.addToken(token)
      if (token) {
        axios.get('http://127.0.0.1:7001/user/getUserIndex', {
          headers: {
            Authorization: token
          }
        }).then(res => {
          const user = res.data.data.user
          this.saveUserInfo(user)
        })
      }
    }
  }
}

export const accountTestMixin = {
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    verifyLogin (callback) {
      if (!this.token) {
        MessageBox.confirm('登录可体验更多功能', {
          title: '未登录',
          confirmButtonText: '现在登录',
          cancelButtonText: '以后再说'
        }).then(action => {
          this.$router.push('/signIn')
        }).catch(e => {
        })
      } else {
        callback()
      }
    }
  }
}

export const showImageMixin = {
  data () {
    return {
      currentImage: '',
      showImage: false
    }
  },
  methods: {
    showBigImage (src) {
      this.currentImage = src
      this.showImage = true
    },
    hideImage () {
      this.showImage = false
    }
  }
}
