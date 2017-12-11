<template>
<div id="index">
  <mt-header fixed :title="selected"></mt-header>
  <main-content :active="selected"></main-content>
  <tail @select="selectItem"></tail>
</div>
</template>

<script>
import Tail from '@/components/tail'
import MainContent from '@/components/main-content'
export default {
  data () {
    return {
      selected: 'news',
      active: 'news'
    }
  },
  mounted () {
    this.changeRouter()
  },
  components: {
    Tail,
    MainContent
  },
  methods: {
    selectItem (selected) {
      this.selected = selected
      this.changeRouter()
    },
    changeRouter () {
      this.$router.push(this.selected)
    }
  }
}
</script>

<style lang="stylus">
.container
  margin-top 40px
  margin-bottom 55px
.tail
  position fixed
</style>
