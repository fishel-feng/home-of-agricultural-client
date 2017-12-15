import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import axios from 'axios'

export const loginMixin = {
  methods: {
    ...mapActions([
      'addToken',
      'saveCollections',
      'saveAttentions',
      'saveFollowings'
    ]),
    initUserInfo (token) {
      this.addToken(token)
      axios.get('http://127.0.0.1:7001/user/getUserIndex', {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTI0MGNiMzhjZGJhNzEyNjkyY2NlZTMiLCJpYXQiOjE1MTIzNzQxNTJ9.u7p5OCus53SPszRqGgxN202pYMdJfLQYCMvH9phEnnI'
        }
      }).then(res => {
        const user = res.data.data.user
        this.saveCollections(user.collections)
        this.saveAttentions(user.attentions)
        this.saveFollowings(user.followings)
      })
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
    verifyLogin () {
      if (!this.token) {
        MessageBox.confirm('登录可体验更多功能', {
          title: '未登录',
          confirmButtonText: '现在登录',
          cancelButtonText: '以后再说'
        }).then(action => {
          this.$router.push('/signIn')
        }).catch(e => {
        })
        return false
      }
      return true
    }
  }
}
