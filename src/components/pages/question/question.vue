<template>
  <div class="question">
    <mt-navbar v-model="selected">
      <mt-tab-item @click.native="select('all')" id="all">全部</mt-tab-item>
      <mt-tab-item @click.native="select(tag._id)" v-for="(tag,index) in tags" :key="index" :id="tag._id">{{tag.tagName}}</mt-tab-item>
      <mt-tab-item @click.native="selectItem">+</mt-tab-item>
    </mt-navbar>
    <router-view/>
    <div @click="addQuestion" class="btn-add">问</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      selected: this.$route.path.slice(this.$route.path.lastIndexOf('/') + 1)
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.items = this.tags
      this.selected = to.path.slice(10)
    }
  },
  methods: {
    addQuestion () {
      this.$router.push('/addQuestion')
    },
    selectItem () {
      this.$router.push('/question/selectItem')
    },
    select (id) {
      this.$router.push('/question/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.question
  margin-bottom 55px
  width: 100%
  .btn-add
    font-weight bold
    font-size 20px
    text-align center
    line-height 50px
    width 50px
    height 50px
    border-radius 50%
    position fixed
    right 10px
    bottom 65px
    color #fff
    background-color #26a2ff
</style>
