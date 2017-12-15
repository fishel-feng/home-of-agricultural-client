import { mapActions } from 'vuex'
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
