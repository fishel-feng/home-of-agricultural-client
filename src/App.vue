<template>
<div id="app">
  <mt-header :title="selected"></mt-header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <tail @select="selectItem"></tail>
</div>
</template>

<script>
import Tail from '@/components/tail'
export default {
  name: 'app',
  data () {
    return {
      selected: 'news'
    }
  },
  components: {
    Tail
  },
  methods: {
    selectItem (selected) {
      this.selected = selected
      this.changeRouter()
    },
    changeRouter () {
      this.$router.push('/' + this.selected)
    }
  }
}
</script>

<style lang="stylus">

</style>
