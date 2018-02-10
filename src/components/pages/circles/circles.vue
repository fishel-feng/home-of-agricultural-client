<template>
  <div class="circle">
    <mt-navbar @click.native="getPageContent" v-model="selected">
      <mt-tab-item id="">全部动态</mt-tab-item>
      <mt-tab-item id="attention">关注的人</mt-tab-item>
    </mt-navbar>
    <circle-list class="circle-list" @refresh="reload" @load="getCircleList" ref="circle-list" :circles="circles" :loading="loading" :showLoading="showLoading"/>
    <div class="btn-add" @click="addCircle">+</div>
  </div>
</template>

<script>
import axios from 'axios'
import CircleList from '@/components/pages/circles/circle-list'
import { accountTestMixin } from '@/common/js/mixin'
export default {
  mixins: [accountTestMixin],
  data () {
    return {
      selected: '',
      loading: false,
      showLoading: false,
      circles: []
    }
  },
  components: {
    CircleList
  },
  mounted () {
    this.getCircleList()
  },
  methods: {
    getCircleList (callback) {
      let url = this.selected ? `/getAttentionList/` : '/getCircleList/'
      let last = this.circles.length ? this.circles[this.circles.length - 1].time : new Date().toISOString()
      this.showLoading = true
      this.loading = true
      axios.get('http://localhost:7001/circle' + url + last).then(res => {
        this.circles.push(...res.data.data.circleList)
        if (callback) {
          callback()
        }
        setTimeout(() => {
          this.loading = false
          this.showLoading = false
        }, 2000)
      })
    },
    getPageContent () {
      this.circles = []
      this.getCircleList()
    },
    reload (callback) {
      this.questions = []
      this.getCircleList(callback)
    },
    addCircle () {
      this.verifyLogin(() => {
        this.$router.push('/circles/addCircle')
      })
    }
  },
  watch: {
    '$route' (to, from) {
      // if (to.path === '/circles/all') {
      //   this.selected = 'all'
      // } else if (to.path === '/circles/attention') {
      //   this.selected = 'attention'
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle
  margin-bottom 55px
  width: 100%
  .circle-list
    padding-top 3px
  .btn-add
    font-weight bolder
    font-size 35px
    text-align center
    line-height 45px
    width 50px
    height 50px
    border-radius 50%
    position fixed
    right 10px
    bottom 65px
    color #fff
    background-color #26a2ff
</style>
