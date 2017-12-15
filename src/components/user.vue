<template>
  <div class="user">
    {{msg}}
    <button @click="submit">tijiao</button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
// import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      msg: 'Welcome to 我的页面',
      popupVisible: false
    }
  },
  methods: {
    submit () {
      axios.get('http://localhost:7001/user/getUserIndex', {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTI0MGNiMzhjZGJhNzEyNjkyY2NlZTMiLCJpYXQiOjE1MTIzNzQxNTJ9.u7p5OCus53SPszRqGgxN202pYMdJfLQYCMvH9phEnnI'
        }
      }).then(res => {
        console.log(res.data)
      })
      // axios.post('http://localhost:7001/news/addToCollections', {
      //   headers: {
      //     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTI0MGNiMzhjZGJhNzEyNjkyY2NlZTMiLCJpYXQiOjE1MTIzNzQxNTJ9.u7p5OCus53SPszRqGgxN202pYMdJfLQYCMvH9phEnnI'
      //   },
      //   data: {
      //     articleId: '1170325',
      //     title: '普查数据显示我国农业向规模化和专业化方向发展'
      //   }
      // }).then(res => {
      //   console.log(res.data)
      // })
    }
  },
  mounted () {
    // MessageBox.confirm('确定执行此操作?', {closeOnClickModal: false}).then(action => {
    //   console.log(action)
    // }).catch(e => {
    //   console.log(e)
    // })
    // MessageBox.confirm('登录可体验更多功能', {
    //   title: '未登录',
    //   confirmButtonText: '现在登录',
    //   cancelButtonText: '以后再说'
    // }).then(action => {
    //   console.log(0)
    // }).catch(e => {
    // })
  }
}
</script>

<style lang="stylus" scoped>
.user
  position fixed
  width 100%
  top 40px
  bottom 55px
</style>
