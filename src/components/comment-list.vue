<template>
  <transition name="slide">
    <div class="comment-list">
      <mt-header fixed title="评论详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="container">
        <ul>
          <li class="item">
            <div class="user-info">
              nickname
              <span>回复 nickname</span>
              :
            </div>
            <div class="content">风蓬飘尽悲歌气，泥絮沾来薄幸名。风蓬飘尽悲歌气，泥絮沾来薄幸名。风蓬飘尽悲歌气，泥絮沾来薄幸名。</div>
          </li><li class="item">
            <div class="user-info">nickname :</div>
            <div class="content">风蓬飘尽悲歌气，泥絮沾来薄幸名。</div>
          </li><li class="item">
            <div class="user-info">nickname 回复 nickname :</div>
            <div class="content">风蓬飘尽悲歌气，泥絮沾来薄幸名。</div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {}
</script>


<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)

  .comment-list
    position fixed
    overflow-y auto
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background #fff
    .container
      background #ccc
      margin-top 40px
      .item
        background #fff
        padding 10px
        margin 3px 0
        .user-info
          margin-bottom 15px
          font-size 16px
        .content
          line-height: normal
          font-size 18px
</style>
