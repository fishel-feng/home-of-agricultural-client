<template>
  <transition name="slide">
    <div class="select-item">
      <mt-header fixed title="选择问题分类">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <mt-checklist
        align="right"
        title="请选择问题分类，至少一项，最多7项"
        v-model="value"
        :max="7"
        :options="options">
      </mt-checklist>
      <div class="btn-wrapper">
        <mt-button @click.native="submit" class="btn-submit" type="primary">确定</mt-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      options: [],
      value: []
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  },
  mounted () {
    this.initData()
  },
  methods: {
    submit () {
      this.setTags(this.value)
      // todo 登录发请求
      this.$router.go(-1)
    },
    initData () {
      axios.get('http://localhost:7001/questions/getTags').then(res => {
        if (res.data.code === 200) {
          res.data.data.forEach(element => {
            this.options.push({
              label: element.tagName,
              value: element
            })
          })
        }
      })
      this.value = this.tags
    },
    ...mapMutations({
      setTags: 'SET_TAGS'
    })
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
.select-item
  position fixed
  overflow-y auto
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  background #fff
  padding-top 40px
  .btn-wrapper
    padding 15px
    .btn-submit
      width 100%
</style>
