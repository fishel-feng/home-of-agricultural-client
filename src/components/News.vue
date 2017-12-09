<template>
  <div class="news">
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.news{
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 0;
}
</style>
