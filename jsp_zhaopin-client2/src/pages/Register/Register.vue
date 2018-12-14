<template>
  <div class="register_container">
    <div class="guide_logo">
      <span class="item_logo">
        <i class="iconfont icon-jinandaxue"></i>
      </span>
      <span>深旅招聘</span>
    </div>
    <div class="register_part">
      <div class="register_container">
        <div class="registerInner">
          <div class="register_header">
            <h2 class="register_logo">用户名/邮箱注册</h2>
          </div>
          <div class="register_content">
            <form @submit.prevent="register">
              <div>
                <section>
                  <section class="register_message">
                    <input type="text" maxlength="11" placeholder="邮箱/用户名" v-model="username">
                  </section>
                  <section class="register_verification">
                    <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
                  </section>
                  <section class="register_verification">
                    <input type="password" maxlength="8" placeholder="再次确认密码"
                           v-model="re_pwd" @blur="showWarn">
                  </section>
                  <section class="register_hint" v-if="warning">
                    *两次输入的密码不一致
                  </section>
                  <section class="register_message">
                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                    <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha"
                         @click="getCaptcha" ref="captcha">
                  </section>
                  <section class="register_protocol">
                    <i class="iconfont icon-ok" ref="ok"
                       style="color:white;"@click="isOk"></i>
                    我已阅读并同意
                    <a href="javascript:;">《用户服务协议》</a>
                  </section>
                </section>
              </div>
              <button class="register_submit" @click="">注册</button>
            </form>
          </div>
        </div>
      </div>
      <div class="register_right"></div>
    </div>
    <AlertTip :alertText="alertText" v-show="show" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqPwdRegister} from "../../api"

  export default {
    name: "Register",
    data() {
      return {
        username: '', //用户名或者邮箱
        pwd:'', //密码
        re_pwd:'', //再次确认密码
        captcha:'', //图形验证码
        warning:false, //两次输入的密码是否一致
        alertText: '', // 提示文本
        show: false, // 是否显示警告框
        color:'', //判断是否勾选了用户协议
      }
    },
    methods:{
      //点击切换验证码
      getCaptcha () {
        // 每次指定的src要不一样
        this.$refs.captcha.src = 'http://localhost:3000/captcha?time='+Date.now()
      },
      //提示两次密码不一致
      showWarn(){
        const {pwd,re_pwd}=this
        if(pwd!==re_pwd){
          this.warning=true
        }else{
          this.warning=false
        }
      },
      //显示提示信息
      showAlert(alertText) {
        this.show = true
        this.alertText = alertText
      },
      // 关闭警告框
      closeTip () {
        this.show = false
        this.alertText = ''
      },
      // 异步注册
      async register () {
        let result
        // 前台表单验证
        const {username, pwd, captcha} = this
        if(!this.username) {
          // 用户名必须指定
          this.showAlert('用户名不能为空')
          return
        } else if(!pwd) {
          // 密码必须指定
          this.showAlert('密码不能为空')
          return
        } else if(!captcha) {
          // 验证码必须指定
          this.showAlert('验证码不能为空')
          return
        }else if(this.$refs.ok.style.color==='white') {
          // 验证码必须指定
          this.showAlert('请阅读用户协议之后勾选')
          return
        }
        // 发送ajax请求密码登陆
        result = await reqPwdRegister({username, pwd, captcha})
        this.getCaptcha()
        // 判断异步操作的结果
        if(result.code===1){ //code:为1，注册失败
          console.log(result)
          this.showAlert(result.msg)
          //清空验证码
          this.captcha=''
        }else{ //code为0，注册成功跳转页面
          /*console.log(result)*/
          //同步更新userInfo
          const userInfo = result.data
          this.$store.dispatch('recordUser', userInfo)
          this.$router.push('/profile')
        }
      },
      //切换用户协议
      isOk(){
        //点击之后改变ok的颜色，white不ok，skyblue为ok
        if(this.$refs.ok.style.color==='white'){
          this.$refs.ok.style.color='skyblue'
        } else {
          this.$refs.ok.style.color='white'
        }
      }
    },
    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register_container
    height 570px
    background-image url("./images/register_bg.png")
    background-color #fafafa
    background-repeat repeat-y
    padding-top 30px
    .guide_logo
      color deepskyblue
      margin-left 350px
      font-size 40px
      .icon-jinandaxue
        font-size 80px
        color green
    .register_part
      .register_container
        margin 0 auto
        width 40%
        padding-left 100px
        padding-bottom 20px
        height 100%
        background #fff
        .registerInner
          width 80%
          .register_header
            .register_logo
              font-size 30px
              font-weight bold
              color deepskyblue
              text-align center
            .register_header_title
              padding-top 20px
              text-align center
              >a
                color #333
                font-size 14px
                padding-bottom 4px
                &:first-child
                  margin-right 40px
                &.on
                  color deepskyblue
                  font-weight 700
                  border-bottom 2px solid deepskyblue
          .register_content
            >form
              >div
                display block
                &.on
                  display block
                input
                  width 100%
                  height 100%
                  padding-left 10px
                  box-sizing border-box
                  border 1px solid #ddd
                  border-radius 4px
                  outline 0
                  font 400 14px Arial
                  &:focus
                    border 1px solid deepskyblue
                .register_message
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                  .get_verification
                    position absolute
                    top 50%
                    right 10px
                    transform translateY(-50%)
                    border 0
                    color #ccc
                    font-size 14px
                    background transparent
                    &.right_phone
                      color black
                .register_verification
                  position relative
                  margin-top 16px
                  height 48px
                  font-size 14px
                  background #fff
                .register_hint
                  color red
                  font-size 12px
                .register_protocol
                  margin-top 12px
                  .icon-ok
                    font-size 12px
                    display inline-block
                    border 1px solid skyblue
              .register_submit
                display block
                width 100%
                height 42px
                margin-top 30px
                border-radius 4px
                background deepskyblue
                color #fff
                text-align center
                font-size 16px
                line-height 42px
                border 0
            .register
              display block
              font-size 12px
              margin-top 20px
              text-align center
              color deepskyblue
</style>
