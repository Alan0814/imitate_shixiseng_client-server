<template>
  <div class="s_container">
    <div class="s_left">
      <div class="=s_function">
        <h2>个人信息</h2>
        <el-button class="btn" :disabled="!writable" @click="writable=!writable">修改</el-button>
        <el-button class="btn" @click="saveAndSubmit">保存</el-button>
      </div>
      <div class="s_content">
        <form>
          <div class="form_item">
            <label for="name" class="item_label">用户名</label>
            <div class="item_input">
              <input type="text" :value="userInfo.username" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">真实姓名</label>
            <div class="item_input">
              <input type="text" :value="userInfo.realName" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item" v-if="writable">
            <label for="name" class="item_label">手机号码</label>
            <div class="item_input" >
              <input type="text" class="input_inner" :value="userInfo.phone"
                     :disabled="writable" placeholder="请输入您的手机号码（显示用）"/>
            </div>
          </div>
          <div class="form_item" v-else>
            <label for="name" class="item_label">手机号码</label>
            <div class="item_input">
              <input type="text" class="input_inner" v-model="phone"
                     :placeholder='userInfo.phone||"请输入您的手机号码"'/>
            </div>
          </div>
          <div class="form_item" v-if="writable">
            <label for="name" class="item_label">职位</label>
            <div class="item_input">
              <input type="text" class="input_inner" :value="userInfo.post"
                     :disabled="writable" placeholder="请输入您的职位（显示用）"/>
            </div>
          </div>
          <div class="form_item" v-else>
            <label for="name" class="item_label">职位</label>
            <div class="item_input">
              <input type="text" class="input_inner" v-model="post"
                     :placeholder='userInfo.post||"请输入您的职位"'/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">所属公司</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.firmName" class="input_inner" disabled="disabled"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Self",
    computed:{
      ...mapState(['userInfo']),
    },
    data() {
      return {
        writable: true,
        phone:'',
        post:'',
      }
    },
    methods:{
      saveAndSubmit(){
        this.writable=true
      }
    },
    watch:{
      phone(){
        const {phone} =this
        this.$store.dispatch('upDate',{phone})
      },
      post(){
        const {post} = this
        this.$store.dispatch('upDate',{post})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .s_container
    border-top 1px #cfcfcf solid
    clearFix()
    width 100%
    background-color #FAFAFD
    height 600px
    .s_left
      float left
      margin-left 200px
      margin-top 50px
      width 50%
      h2
        font-size 24px
        font-weight bold
        margin-right 30px
        margin-bottom 30px
        display inline-block
      .s_function
        .btn
          float left
      .s_content
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
          .item_btn
            margin-top 20px
            margin-right 20px
            float left
</style>
