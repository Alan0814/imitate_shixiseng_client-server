<template>
  <div class="v_container">
    <div class="v_left">
      <h2>企业验证流程</h2>
      <div class="v_list">
        <div class="list_step">
          <div class="step_icon">
            <i class="iconfont icon-step-line" :class="{on:step>=2}"></i>
            <i class="iconfont icon-step1" :class="{on:step>=1}"></i>
          </div>
          <div class="step_name" :class="{on:step>=1}">
            公司信息验证
          </div>
        </div>
        <div class="list_step">
          <div class="step_icon ">
            <i class="iconfont icon-step-line" :class="{on:step>=3}"></i>
            <i class="iconfont icon-step1" :class="{on:step>=2}"></i>
          </div>
          <div class="step_name" :class="{on:step>=2}">
            公司证件验证
          </div>
        </div>
        <div class="list_step">
          <div class="step_icon">
            <i class="iconfont icon-step1" :class="{on:step>=3}"></i>
          </div>
          <div class="step_name" :class="{on:step>=3}">
            验证信息审核
          </div>
        </div>
      </div>
    </div>
    <div class="v_right" v-if="step===1">
      <h2>信息验证</h2>
      <div class="v_content">
        <form>
          <div class="form_item">
            <label for="name" class="item_label">真实姓名</label>
            <div class="item_input">
              <input type="text" placeholder="请输入您的真实姓名" class="input_inner"
                     v-model="realName" @blur="!realName?error1=true:error1=false" v-focus="true"
              ref="step1"/>
              <div class="text_error" :class="{error:error1}">该选项必须填写</div>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">公司全称</label>
            <div class="item_input">
              <input type="text" placeholder="请填写公司的法定名称" class="input_inner"
                     v-model="firmName" @blur="!firmName?error2=true:error2=false"/>
              <span class="text_error" :class="{error:error2}">请输入公司名称（营业执照上全称）</span>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">企业邮箱</label>
            <div class="item_input">
              <input type="text" placeholder="请输入企业邮箱" class="input_inner"
                     v-model="firmMail"
                     @blur="/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(firmMail)?error3=false:error3=true"/>
              <div class="text_error" :class="{error:error3}">邮箱格式错误</div>
            </div>
          </div>
          <div class="form_item">
            <div class="item_btn">
              <el-button @click="nextStepOne()">下一步</el-button>
            </div>
          </div>
          <div class="form_item"></div>
        </form>
      </div>
    </div>
    <div class="v_right" v-else-if="step===2">
      <h2>证件验证</h2>
      <div class="v_content">
        <form>
          <div class="form_item">
            <label for="name" class="item_label">法人/股东</label>
            <div class="item_input">
              <input type="text" placeholder="请输入法人/股东名称（与营业执照上一致）"
                     class="input_inner" v-model="legalPerson" @blur="!legalPerson?error4=true:error4=false"
                     ref="step2" v-focus="true"/>
              <div class="text_error" :class="{error:error4}">该选项必须填写</div>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">公司地址</label>
            <div class="item_input">
              <input type="text" placeholder="请输入公司地址" class="input_inner"
                     v-model="firmAddress" @blur="!firmAddress?error5=true:error5=false"/>
              <div class="text_error" :class="{error:error5}">请输入公司地址</div>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">注册号</label>
            <div class="item_input">
              <input type="text" placeholder="请输入企业法人注册号" class="input_inner"
                     v-model="registerNumber" @blur="!registerNumber?error6=true:error6=false"/>
              <div class="text_error" :class="{error:error6}">请输入企业法人注册号</div>
            </div>
          </div>
          <div class="form_item">
            <div class="item_btn">
              <el-button @click="forwardStep()">上一步</el-button>
            </div>
            <div class="item_btn">
              <el-button @click="nextStepTwo()">下一步</el-button>
            </div>
          </div>
          <div class="form_item"></div>
        </form>
      </div>
    </div>
    <div class="v_right" v-else-if="step===3">
      <h2>验证信息审核</h2>
      <div class="v_content">
          确认信息无误后，请提交检验信息，等待审核<br/>
          <div class="form_item">
            <div class="item_btn">
              <el-button @click="forwardStep()">上一步</el-button>
            </div>
            <div class="item_btn">
              <el-button @click="update()">提交</el-button>
            </div>
          </div>
          <div class="form_item"></div>
      </div>
    </div>
    <div class="v_right" v-else>
      <h2>验证信息审核通过</h2>
      <div class="v_content">
        所有的功能都已经开放，祝您办公愉快<br/>
        <div class="form_item">
            <el-button type="warning" @click="modify()">修改信息</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {Loading } from 'element-ui'
  import {mapState} from 'vuex'

  export default {
    name: "verification",
    data() {
      return {
        step: 1, //表示验证流程的进度
        isVerification: 'false', //是否完成了验证
        realName: '', //真实姓名
        firmName: '',//公司名称
        firmMail: '',
        legalPerson: '',
        firmAddress: '',
        registerNumber: '',
        error1: false, error2: false, error3: false, error4: false, error5: false, error6: false,///表单是否填写
      }
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          /*console.log(el,{value})*/
          if (value) {
            el.focus();
          }
        }
      }
    },
    methods: {
      //下一步1
      nextStepOne() {
        const {realName, firmName, firmMail, error1, error2, error3} = this
        console.log(error1, error2, error3)
        if (!error1 && !error2 && !error3) {
          //全都是false才可以执行下一步
          this.step++
        }

      },
      //下一步2
      nextStepTwo() {
        const {error4, error5, error6} = this
        console.log(error4, error5, error6)
        if (!error4 && !error5 && !error6) {
          //全都是false才可以执行下一步
          this.step++
        }
      },
      //上一步
      forwardStep() {
        this.step--
      },
      //发送表单数据，更新用户信息
      update() {
        //整理用户数据
        const {realName, firmName, firmMail, legalPerson, firmAddress, registerNumber} = this
        const userInfo = {
          realName,
          firm: {
            firmName, firmMail, legalPerson, firmAddress, registerNumber
          },
          isVerification: true
        }
        //创建loading，用户等待
        const updating = Loading.service({
          lock: true,
          text: '正在审核，请稍等',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        //发送actions请求，更新用户信息
        this.$store.dispatch('upDate', userInfo)
        /*//更新操作完成，跳转个人信息页面
        this.$router.push('/profile/self')*/
        //更新操作完成关闭loading
        setTimeout(() => {
          updating.close()
        }, 750)
      },
      //修改表单数据
      modify(){
        this.$confirm('更新企业信息需要重新验证, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //先使得是否验证通过为false，再令step为1
          this.userInfo.isVerification=false
          this.step=1
        })
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted(){
      if(this.userInfo.isVerification){
        this.step=4
      } else {
        this.step=1
      }
    },
    watch:{
      userInfo(){
        if(this.userInfo.isVerification){
          this.step=4
        } else {
          this.step=1
        }
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .v_container
    border-top 1px #cfcfcf solid
    clearFix()
    width 100%
    height 600px
    background-color #FAFAFD
    .v_left
      float left
      margin-left 200px
      margin-top 50px
      h2
        font-size 24px
        font-weight bold
        margin-bottom 30px
      .v_list
        .list_step
          margin-bottom 85px
          clearFix()
          color #9d9d9d
          .step_icon
            float left
            position relative
            .icon-step1
              color #9d9d9d
              &.on
                color deepskyblue
            .icon-step-line
              font-size 11px
              position absolute
              left -6px
              top 50px
              color #9d9d9d
              &.on
                color deepskyblue
          .step_name
            float left
            margin-left 5px
            &.on
              color deepskyblue
    .v_right
      float left
      margin-left 200px
      margin-top 50px
      width 50%
      h2
        font-size 24px
        font-weight bold
        margin-bottom 30px
      .v_content
        .form_item
          margin-top 20px
          margin-bottom 22px
          height 40px
          width 100%
          .item_label
            text-align right
            width 80px
            font-size 14px
            line-height 40px
            padding-right 14px
            float left
            display inline
          .item_input
            display inline-block
            position relative
            height 40px
            border 1px solid #dcdfe6
            /*通过改变border的颜色提醒用户*/
            border-radius 4px
            background-color #fff
            .input_inner
              width 500px
              font-size 14px
              line-height 40px
              padding 0 20px
              &::-webkit-input-placeholder
                color #999ba2
                font-size 14px
            .text_error
              display none
              color red
              &.error
                display block
          .item_btn
            margin-top 20px
            margin-right 20px
            float left
</style>
