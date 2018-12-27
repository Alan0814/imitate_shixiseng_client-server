<template>
  <div id="app">
    <!--当不是msite和register的时候显示header-->
    <HeaderGuide v-if="!$route.meta.showHeader"/>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderGuide from './components/HeaderGuide/HeaderGuide'
import {reqUserInfo} from "./api";
import {Loading } from 'element-ui'

export default {
  name: 'App',
  components:{
    HeaderGuide
  },
  data() {
    return {
    }
  },
  async mounted(){
    //自动登录，自动跳转相应页面
    //发送ajax请求，请求用户信息
    const result = await reqUserInfo()
    if('/msite'===this.$route.path&&result.code===0){
      // console.log(result)
      //同步更新userInfo
      const userInfo = result.data
      console.log(userInfo)
      this.$store.dispatch('recordUser', userInfo)
      //有对应的user信息，跳转profile
      const loading = Loading.service({
        lock: true,
        text: '已经登录，正在跳转',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(()=>{
        //判断是否通过验证
        if(userInfo.isVerification){
          this.$router.replace('/profile/self')
        } else {
          this.$router.replace('/profile')
        }
        loading.close()
      },750)
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
