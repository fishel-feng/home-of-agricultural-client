import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import moment from 'moment'

export const loginMixin = {
  methods: {
    ...mapActions([
      'addToken',
      'addMyId',
      'saveUserInfo'
    ]),
    initUserInfo (token) {
      this.$socket.emit('login', this.token)
      this.addToken(token)
      if (token) {
        axios.get('http://127.0.0.1:7001/user/getUserIndex', {
          headers: {
            Authorization: token
          }
        }).then(res => {
          const user = res.data.data.user
          this.addMyId(user._id)
          this.saveUserInfo(user)
        })
      }
    }
  }
}

export const accountTestMixin = {
  computed: {
    ...mapGetters([
      'token',
      'myId'
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

export const getTimeMixin = {
  methods: {
    getTime (time) {
      return moment(time).format('MM-DD HH:mm')
    }
  }
}

export const disableScrollMixin = {
  methods: {
    disable_scroll (id = 'scroll') {
      this.scrollTop = document.getElementById('scroll').scrollTop
      document.getElementById(id).classList.add('modal-show')
      document.getElementById(id).style.top = -this.scrollTop + 'px'
    },
    enable_scroll (id = 'scroll') {
      document.getElementById(id).classList.remove('modal-show')
      document.getElementById(id).scrollTop = this.scrollTop
    }
  }
}
