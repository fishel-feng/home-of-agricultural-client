<template>
<div id="app">
  <mt-header fixed :title="title"></mt-header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <mt-tabbar v-model="selected" class="tail">
    <mt-tab-item @click.native="selectItem(item)" :id="item.id" v-for="(item,index) in tailList" :key="index">
        <img slot="icon" :src="`http://127.0.0.1:7001/public/svg/${item.image}.svg`"> {{item.text}}
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      selected: 'news',
      title: '新闻',
      tailList: [
        {
          id: 'news',
          text: '新闻',
          image: 'home'
        },
        {
          id: 'wiki',
          text: '百科',
          image: 'wiki'
        },
        {
          id: 'question',
          text: '问专家',
          image: 'question'
        },
        {
          id: 'circles/all',
          text: '农友圈',
          image: 'circle'
        },
        {
          id: 'user',
          text: '我的',
          image: 'user'
        }
      ]
    }
  },
  methods: {
    selectItem (item) {
      this.selected = item.id
      this.title = item.text
      this.$router.push('/' + this.selected)
    }
  },
  watch: {
    '$route' (to, from) {
      this.tailList.forEach(element => {
        if (to.path.substring(1).startsWith(element.id)) {
          this.selected = element.id
          this.title = element.text
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.tail
  position fixed
</style>
