<template>
  <div class="expert-list">
    <mt-header title="相关专家">
      <mt-button @click.native="$router.go(-1)" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <person-list @invite="inviteExpert" :showButton="true" :data="experts"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import PersonList from '@/components/person-list'
  export default {
    components: {
      PersonList
    },
    data () {
      return {
        experts: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get('http://127.0.0.1:7001/question/getExpertList/' + this.$route.query.tag).then(res => {
          if (res.data.code === 200) {
            this.experts = res.data.data.experts
          }
        })
      },
      inviteExpert (item) {
        console.log(item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.expert-list
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 100
  background #fff
</style>
