<template>
  <div class="router_container">
    <div class="profile_container">
      <ul class="profile_guide">
        <li class="guide_item" :class="{on: '/profile/firmInfo'===$route.path}"
            @click="goTo('/firmInfo')">公司信息</li>
        <li class="guide_item" :class="{on: '/profile/verification'===$route.path}"
            @click="goTo('/verification')">企业验证</li>
        <li class="guide_item" :class="{on: '/profile/self'===$route.path}"
            @click="goTo('/self')">个人中心</li>
      </ul>
    </div>
    <router-view></router-view>
    <AlertTip :alertText="alertText" v-show="show" @closeTip="closeTip"/>
  </div>

</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {mapState} from 'vuex'

  export default {
    name: "Profile",
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
          this.$router.push('/profile'+path)
        }
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
    .profile_container
      height 60px
      line-height 60px
      position relative
      width 90%
      font-size 16px
      .profile_guide
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
