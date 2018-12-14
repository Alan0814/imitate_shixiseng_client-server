<template>
  <div class="header_container">
    <h1 class="header_title" :class="{on: '/profile'===$route.meta.parent}"
        @click="goTo('/profile')">深旅招聘企业版</h1>
    <ul class="header_guide">
      <li class="guide_item" :class="{on: '/profile'===$route.meta.parent}"
          @click="goTo('/profile')">HR中心</li>
      <li class="guide_item" :class="{on: '/post'===$route.meta.parent}"
          @click="goTo('/post')">发布职位</li>
      <li class="guide_item" :class="{on: '/employee'===$route.meta.parent}"
          @click="goTo('/employee')">人才信息</li>
    </ul>
    <div class="header_user">
      <div class="user_item" style="border-left:1px solid #cfcfcf;">
        <i class="iconfont icon-shouji"
           @click="showAlert('手机版正在开发中，请期待')"></i>
      </div>
      <div class="user_item">
        <i class="iconfont icon-bell"
           @click="showAlert('暂时没有新的消息')"></i>
      </div>
      <div class="user_item">
        <i class="iconfont icon-rencai">
          <ul class="user_info">
            <li>Hi,{{userInfo.realName||'您好'}}</li>
            <li @click="logout" style="cursor:pointer;color:red;">退出登陆</li>
          </ul>
        </i>
      </div>
    </div>
    <AlertTip :alertText="alertText" v-show="show" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import {reqLogout,reqPostUpdate} from "../../api";
  import AlertTip from '../AlertTip/AlertTip'
  import {mapState} from 'vuex'

  export default {
    name: "HeaderGuide",
    data() {
      return {
        alertText: '', // 提示文本
        show: false, // 是否显示警告框
      }
    },
    components: {
      AlertTip
    },
    methods:{
      async logout(){
        const result = await reqLogout()
        //退出登陆之后返回Msite
        this.$router.replace('/msite')
      },
      //弹出提示
      showAlert(alertText) {
        this.show = true
        this.alertText = alertText
      },
      // 关闭警告框
      closeTip () {
        this.show = false
        this.alertText = ''
      },
      goTo(path){
        if(!this.userInfo.isVerification){
          this.showAlert('完成企业验证之后才可以体验其他功能')
        } else {
          this.$router.push(path)
        }
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    async mounted(){
      //防止刷新之后丢失数据，先获取，然后监视，监视之后调用nextTick()
      this.$store.dispatch('getUserInfo')
      /*const result2 = await reqPostUpdate({post:'world',dailyWage:107},false)*/
      /*const result2 = await reqPostUpdate({post:'hello world', dailyWage:105,
        major:'it',_id:'5c11a446da0569125451c9d2'},true)
      console.log(result2)*/
      //获取postInfo用于展示，防止数据刷新后小时
      this.$store.dispatch('getPostInfo')
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .header_container
    clearFix()
    width 100%
    height 70px
    position relative
    font-size 18px
    line-height 70px

    border-bottom 1px #cfcfcf solid
    .header_title
      float left
      margin-left 130px
      font-size 24px
      font-weight bold
    .header_guide
      display inline-block
      margin-left 50px
      position relative
      color #9d9d9d
      .guide_item
        margin-left 70px
        float left
        height 67px
        &.on
          color #626262
          border-bottom 3px solid deepskyblue
        &:hover
          color #626262
          border-bottom 3px solid deepskyblue
          cursor default
    .header_user
      float right
      height 70px
      text-align center
      font-size 0
      margin-right 50px
      .user_item
        display inline-block
        height 70px
        border-right 1px solid #cfcfcf
        position relative
        .iconfont
          font-size 30px
          color #cfcfcf
          padding 0 20px
          &:hover
            color deepskyblue
            cursor default
            >.user_info
              display block
          .user_info
            display none
            width 70px
            position absolute
            border 1px solid #cfcfcf
            left -1px
            top 70px
            color #cfcfcf
            font-size 12px
            li
              border #cfcfcf 1px solid
              line-height 20px
              height 20px
              font-size 12px
</style>
