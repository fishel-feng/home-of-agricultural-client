<template>
<div id="tail">
  <mt-tabbar v-model="selected" class="tail">
    <mt-tab-item @click.native="select(item)" :id="item.id" v-for="(item,index) in tailList" :key="index">
        <img slot="icon" :src="`http://127.0.0.1:7001/public/svg/${item.image}.svg`"> {{item.text}}
    </mt-tab-item>
  </mt-tabbar>
</div>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
    select (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="stylus">
.tail
  position fixed
</style>
