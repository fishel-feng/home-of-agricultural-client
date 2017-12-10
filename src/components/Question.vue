<template>
  <div class="news">
    <ul>
      <li>
        <div class="listItem">
          <h2 class="title">title</h2>
          <p class="desc">desc</p>
          <span class="date">date</span>
          <span class="read">read</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to 问专家页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.news
  position: fixed
  width: 100%
  top: 40px
  bottom: 55px
  .listItem
    overflow hidden
    padding 10px
    .title
      font-size 24px
    .desc
      font-size 20px
    .date
      font-size 14px
    .read
      float right
      font-size 14px
</style>
