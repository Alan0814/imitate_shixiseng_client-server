<template>
  <div class="router_container">
    <div class="post_container">
      <ul class="post_guide">
        <li class="guide_item" :class="{on: '/post/publish'===$route.path}"
            @click="goTo('/publish')">发布招聘信息</li>
        <li class="guide_item" :class="{on: '/post/show'===$route.path}"
            @click="goTo('/show')">招聘信息管理</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "post",
    data() {
      return {
      }
    },
    methods:{
      goTo(path){
          this.$router.push('/post'+path)
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .router_container
    z-index 0
    .post_container
      height 60px
      line-height 60px
      position relative
      width 90%
      font-size 16px
      .post_guide
        display inline-block
        margin-left 51px
        position relative
        color #9d9d9d
        .guide_item
          margin-left 79px
          float left
          height 57px
          &.on
            color #393939
            border-bottom 3px solid deepskyblue
          &:hover
            color #626262
            border-bottom 3px solid deepskyblue
            cursor default
</style>
