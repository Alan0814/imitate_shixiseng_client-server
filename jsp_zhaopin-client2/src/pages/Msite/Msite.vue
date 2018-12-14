<template>
  <div class="bg_image">
    <div class="msite_container">
      <div class="header_guide">
        <div class="guide_logo" @click="goTo('/msite')">
          <span class="item_logo">
            <i class="iconfont icon-jinandaxue"></i>
          </span>
          <span>深旅招聘</span>
        </div>
        <a href="javascript:;" class="guide_item" :class="{on: '/profile'===$route.path}" 
           @click="showAlert('请先登陆')">
          <span>HR中心</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on: '/resume'===$route.path}"
           @click="showAlert('请先登陆')">
          <span>简历管理</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on: '/post'===$route.path}"
           @click="showAlert('请先登陆')">
          <span>发布职位</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on: '/employee'===$route.path}"
           @click="showAlert('请先登陆')">
          <span >人才信息</span>
        </a>
      </div>
      <div class="login_container">
        <div class="loginInner">
          <div class="login_header">
            <h2 class="login_logo">深旅招聘</h2>
            <div class="login_header_title">
              <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
              <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
            </div>
          </div>
          <div class="login_content">
            <form @submit.prevent="login">
              <div :class="{on: loginWay}">
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!rightPhone" class="get_verification"
                          :class="{right_phone: rightPhone&&abled}" @click.prevent="getCode">
                    {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
                  </button>
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                </section>
                <section class="login_hint">
                  温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="{on: !loginWay}">
                <section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="邮箱/用户名" v-model="username">
                  </section>
                  <section class="login_verification">
                    <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                    <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                    <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                      <div class="switch_circle" :class="{right: showPwd}"></div>
                      <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                    <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha"
                         @click="getCaptcha" ref="captcha">
                  </section>
                  <a href="javascript:;" class="register" @click="goTo('/register')">点击免费注册</a>
                </section>
              </div>
              <button class="login_submit">登录</button>
            </form>
          </div>
        </div>
      </div>
      <div class="footer_intro">
        <div class="short_intro">
          <section>选择深旅招聘</section>
          <span>提供校园内最新最热的实习、兼职</span>
        </div>
        <div class="advantage_container">
            <div class="advantage_item">
              <i class="iconfont icon-jingzhun"></i>
              <span>精准高效</span>
            </div>
            <div class="advantage_item">
              <i class="iconfont icon-icon6"></i>
              <span>完全免费</span>
            </div>
            <div class="advantage_item">
              <i class="iconfont icon-rencai"></i>
              <span>优质人才</span>
            </div>
            <div class="advantage_item">
              <i class="iconfont icon-shishishuju"></i>
              <span>实时数据</span>
            </div>
        </div>
      </div>
      <div class="copyright">
      </div>
    </div>
    <AlertTip :alertText="alertText" v-show="show" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqPwdLogin,reqSmsLogin,reqSendCode} from "../../api"

  export default {
    name: "Miste",
    data () {
      return {
        loginWay: false, // true代表短信登陆, false代表密码
        computeTime: 0, // 计时的时间
        abled:true, //获取短信验证码 是否可以再次点击
        showPwd: false, // 是否显示密码
        phone: '', // 手机号
        code:'', // 短信验证码
        username: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图形验证码
        alertText: '', // 提示文本
        show: false, // 是否显示警告框
      }
    },
    computed:{
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods: {
      //跳转页面
      goTo(path){
        this.$router.push(path)
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
      // 获取一个新的图片验证码
      getCaptcha () {
        // 每次指定的src要不一样
        this.$refs.captcha.src = 'http://localhost:3000/captcha?time='+Date.now()
      },
      // 异步获取短信验证码
      async getCode () {
        // 如果当前没有计时
        if(!this.computeTime) {
          // 启动倒计时
          this.computeTime = 30
          this.abled=false
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
              this.abled=true
            }
          }, 1000)
          // 发送ajax请求(向指定手机号发送验证码短信)
          const result = await reqSendCode(this.phone)
          if(result.code===1) {
            // 显示提示
            this.showAlert(result.msg)
            // 停止计时
            if(this.computeTime) {
              //令用户马上可以再次获取
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
              this.abled=true
            }
          }
        }
      },
      // 异步登陆
      async login () {
        let result
        // 前台表单验证
        if(this.loginWay) {  // 短信登陆
          const {rightPhone, phone, code} = this
          if(!this.rightPhone) {
            // 手机号不正确
            this.showAlert('手机号不正确')
            return
          } else if(!/^\d{6}$/.test(code)) {
            // 验证必须是6位数字
            this.showAlert('验证必须是6位数字')
            return
          }
          // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)
          //根据结果处理
          if(result.code===1){ //code:为1，登陆失败
            console.log(result)
            this.showAlert(result.msg)
          }else{ //code为0，登陆成功跳转页面
            const userInfo = result.data
            //console.log(result)
            this.$store.dispatch('recordUser', userInfo)
            //判断是否通过验证
              if(userInfo.isVerification){
                this.$router.replace('/profile/self')
              } else {
                this.$router.replace('/profile')
              }

          }

        } else {// 密码登陆
          const {username, pwd, captcha} = this
          if(!this.username) {
            // 用户名必须指定
            this.showAlert('用户名必须指定')
            return
          } else if(!this.pwd) {
            // 密码必须指定
            this.showAlert('密码必须指定')
            return
          } else if(!this.captcha) {
            // 验证码必须指定
            this.showAlert('验证码必须指定')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin({username, pwd, captcha})
          this.getCaptcha ()
          //根据结果处理
          if(result.code===1){ //code:为1，登陆失败
            console.log(result)
            this.showAlert(result.msg)
            //清空验证码和密码
            this.captcha=''
            this.pwd=''
          }else{ //code为0，登陆成功跳转页面
            const userInfo = result.data
            /*console.log(result)*/
            this.$store.dispatch('recordUser', userInfo)
            //判断是否通过验证
            if(userInfo.isVerification){
              this.$router.replace('/profile/self')
            } else {
              this.$router.replace('/profile')
            }
          }
        }
        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
        /*// 根据结果数据处理
        if(result.code===0) {
          const user = result.data
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user)
        }
        }*/
      },
    },
    components: {
     AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .bg_image
    background-image url("./images/msite-banner.png")
    background-position-x 50%
    background-size-y 100%
    background-repeat no-repeat
    display flex
    justify-content center
    .msite_container
      width 80%
      .header_guide
        z-index 100
        display flex
        justify-content center
        align-items center
        .guide_logo
          display flex
          flex-direction column
          align-items center
          color white
          .iconfont
            font-size 40px
            color white
        .guide_item
          padding-left 50px
          color white
          &.on
            color deepskyblue
          &:hover
            color deepskyblue
    .login_container
      margin-top 10px
      margin-left 65%
      width 25%
      height 400px
      background #fff
      .loginInner
        padding-top 20px
        width 70%
        margin 0 auto
        .login_header
          .login_logo
            font-size 30px
            font-weight bold
            color deepskyblue
            text-align center
          .login_header_title
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
        .login_content
          >form
            >div
              display none
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
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  width 40%
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 12px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background deepskyblue
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color deepskyblue
            .login_submit
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
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
    .footer_intro
      width 100%
      margin-top 37px
      .short_intro
        width 100%
        text-align center
        section
          font-size 23px
          font-weight blod
        span
          font-size 15px
      .advantage_container
        margin-top 12px
        width 100%
        display flex
        flex-direction row
        justify-content center
        font-size 15px
        .advantage_item
          display flex
          flex-direction column
          align-items center
          padding 0 50px
          .iconfont
            color #00B7FF
            font-size 35px
</style>
