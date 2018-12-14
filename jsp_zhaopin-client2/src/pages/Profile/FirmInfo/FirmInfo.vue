<template>
  <div class="f_container">
    <div class="f_left">
      <h2>信息详情</h2>
      <div class="f_content">
        <form>
          <div class="form_item">
            <label for="name" class="item_label">企业名称</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.firmName" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">企业法人</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.legalPerson" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">企业地址</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.firmAddress" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">企业邮箱</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.firmMail" class="input_inner" disabled="disabled"/>
            </div>
          </div>
          <div class="form_item">
            <label for="name" class="item_label">注册号</label>
            <div class="item_input">
              <input type="text" :value="userInfo.firm.registerNumber" class="input_inner" disabled="disabled"/>
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
    name: "FirmInfo",
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .f_container
    border-top 1px #cfcfcf solid
    clearFix()
    width 100%
    background-color #FAFAFD
    height 600px
    .f_left
      float left
      margin-left 200px
      margin-top 50px
      width 50%
      h2
        font-size 24px
        font-weight bold
        margin-bottom 30px
      .f_content
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
