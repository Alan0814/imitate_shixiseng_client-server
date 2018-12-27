<template>
  <div class="p_container">
    <h2 class="title">发布职位招聘信息</h2>
    <el-row :gutter="20">
      <el-col :span="4">
        <label for="firmName" class="item_label">所属公司：</label>
        <div class="grid-content ">
          <input id="firmName" class="input_inner" :value="userInfo.firm.firmName" readonly="readonly" />
        </div>
      </el-col>
      <el-col :span="4">
        <label for="major" class="item_label">从业领域：</label>
        <div class="grid-content ">
          <input id="major" class="input_inner" v-model="major"/>
        </div>
      </el-col>
      <el-col :span="4">
        <label for="firmSize" class="item_label">公司规模：</label>
        <div class="grid-content ">
          <input id="firmSize" class="input_inner" v-model="firmSize"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <label for="post" class="item_label">招聘职位：</label>
        <div class="grid-content ">
          <input id="post" class="input_inner" v-model="post"/>
        </div>
      </el-col>
      <el-col :span="4">
        <label for="dailyWage" class="item_label">日薪：</label>
        <div class="grid-content ">
          <input id="dailyWage" class="input_inner" v-model="dailyWage"/>
        </div>
      </el-col>
      <el-col :span="4">
        <label for="educationBg" class="item_label">学历要求：</label>
        <div class="grid-content ">
          <input id="educationBg" class="input_inner" v-model="educationBg"/>
        </div>
      </el-col>
      <el-col :span="4">
        <label for="workDay" class="item_label">每周工作天数：</label>
        <div class="grid-content ">
          <input id="workDay" class="input_inner" v-model="workDay"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <label for="workAddress" class="item_label">工作地点：</label>
        <div class="grid-content ">
          <input id="workAddress" class="input_inner" v-model="workAddress"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <label for="postDetail" class="item_label">职位描述：</label>
        <div class="grid-content-text ">
          <textarea id="postDetail" class="text_inner" v-model="postDetail"></textarea>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <label for="ability" class="item_label">任职要求：</label>
        <div class="grid-content-text ">
          <textarea id="ability" class="text_inner" v-model="ability"></textarea>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="btn" type="success" @click="submitPost">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "PostPublish",
    data() {
      return {
        major: "", //所属领域
        firmSize: '', // 公司规模
        post: '', //招聘职位
        dailyWage: '', // 日薪
        educationBg:'', //学历要求
        workDay:'', //每周工作天数
        workAddress:'', //工作地点
        postDetail:'', //职位描述
        ability:'', //任职要求
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      submitPost(){
        let {major,firmSize,post,dailyWage,educationBg,workDay,workAddress,postDetail,ability} = this
        const postInfo={major,firmSize,post,dailyWage,educationBg,workDay,workAddress,postDetail,ability}
        const isModify = false
        this.$store.dispatch('postInfoUpdate',postInfo,isModify)
        this.$message({
          message: '职位发布成功',
          type: 'success'
        })
        this.post= '' //招聘职位
        this.dailyWage= ''// 日薪
        this.educationBg='' //学历要求
        this.workDay='' //每周工作天数
        this.postDetail='' //职位描述
        this.ability='' //任职要求
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .p_container
    height 700px
    background-color #FAFAFD
    position relative
    border-top 1px #cfcfcf solid
    .title
      position absolute
      font-size 24px
      font-weight bold
      left 130px
      top  50px
    .el-row
      width 81%
      left 9.5%
      top 20%
      margin-bottom: 20px;
      &:last-child
        margin-bottom: 0;
      .el-col
        border-radius: 4px;
        .grid-content
          background-color white
          margin-top 5px
          border-radius: 4px;
          min-height: 36px;
          border 1px solid #dcdfe6
          .input_inner
            width 100%
            height 35px
            line-height 36px
            font-size 14px
        .grid-content-text
          margin-top 5px
          border-radius: 4px;
          min-height: 36px;
          .text_inner
            font-size 14px
            width 100%
            height 100px
            resize none
    .btn
      margin-top 87px
      margin-left 20px
</style>
