<template>
<div id="tail">
  <router-view></router-view>
</div>
</template>

<script>
import News from '@/components/News'
import Wiki from '@/components/Wiki'
import Question from '@/components/Question'
import Circles from '@/components/Circles'
import Me from '@/components/Me'
export default {
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  components: {
    News,
    Wiki,
    Question,
    Circles,
    Me
  }
}
</script>

<style lang="stylus">
.tail
  position fixed
</style>
