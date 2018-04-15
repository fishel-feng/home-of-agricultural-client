import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import axios from 'axios'
import moment from 'moment'
import { BASE_API_PATH } from '@/common/js/util'

export const loginMixin = {
  methods: {
    ...mapActions([
      'addToken',
      'saveUserInfo'
    ]),
    initUserInfo (token, callback) {
      this.$socket.emit('login', token)
      this.addToken(token)
      if (token) {
        axios.get(BASE_API_PATH + '/user/getUserIndex').then(res => {
          const user = res.data.data.user
          this.saveUserInfo(user)
          if (callback) {
            callback()
          }
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
          this.$router.push('/news')
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

export const goToRelativePathMixin = {
  methods: {
    goToRelativePath (path) {
      this.$router.push(this.$route.path + '/' + path)
    }
  }
}
