<template>
  <div class="p_container">
    <h2 class="title">招聘信息管理</h2>
    <el-collapse v-model="activeNames" @change="handleChange" class="c_container">
      <el-collapse-item :title="post.post" :name="index" class="c_item"
                        v-for="(post,index) in postInfo" :key="index">
        <div>{{post.dailyWage}}/天&nbsp;&nbsp;|&nbsp;&nbsp;
          {{post.educationBg}}&nbsp;&nbsp;|&nbsp;&nbsp;
          {{post.workDay}}天/周&nbsp;&nbsp;|&nbsp;&nbsp;
          {{post.major}}&nbsp;&nbsp;|&nbsp;&nbsp;
          公司规模{{post.firmSize}}人</div>
        <div>工作地点：{{post.workAddress}}</div>
        <hr/>
        <div>工作职责：<br/>{{post.postDetail}}</div>
        <hr/>
        <div>任职要求：<br/>{{post.ability}}</div>
        <el-button class="btn" type="warning" @click="error">删除</el-button>
        <el-button class="btn" @click="modify(index)">修改</el-button>
      </el-collapse-item>
    </el-collapse>
    <div class="m_container" v-if="isModify">
      <h2 class="m_title">修改招聘信息</h2>
      <el-row :gutter="20">
        <el-col :span="8">
          <label for="firmName" class="item_label">所属公司：</label>
          <div class="grid-content ">
            <input id="firmName" class="input_inner" :value="userInfo.firm.firmName" readonly="readonly" />
          </div>
        </el-col>
        <el-col :span="4">
          <label for="major" class="item_label">从业领域：</label>
          <div class="grid-content ">
            <input id="major" class="input_inner" v-model="postInfo[modifyIndex].major"/>
          </div>
        </el-col>
        <el-col :span="4">
          <label for="firmSize" class="item_label">公司规模：</label>
          <div class="grid-content ">
            <input id="firmSize" class="input_inner" v-model="postInfo[modifyIndex].firmSize"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <label for="post" class="item_label">招聘职位：</label>
          <div class="grid-content ">
            <input id="post" class="input_inner" v-model="postInfo[modifyIndex].post"/>
          </div>
        </el-col>
        <el-col :span="4">
          <label for="dailyWage" class="item_label">日薪：</label>
          <div class="grid-content ">
            <input id="dailyWage" class="input_inner" v-model="postInfo[modifyIndex].dailyWage"/>
          </div>
        </el-col>
        <el-col :span="4">
          <label for="educationBg" class="item_label">学历要求：</label>
          <div class="grid-content ">
            <input id="educationBg" class="input_inner" v-model="postInfo[modifyIndex].educationBg"/>
          </div>
        </el-col>
        <el-col :span="4">
          <label for="workDay" class="item_label">每周工作天数：</label>
          <div class="grid-content ">
            <input id="workDay" class="input_inner" v-model="postInfo[modifyIndex].workDay"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <label for="workAddress" class="item_label">工作地点：</label>
          <div class="grid-content ">
            <input id="workAddress" class="input_inner" v-model="postInfo[modifyIndex].workAddress"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <label for="postDetail" class="item_label">职位描述：</label>
          <div class="grid-content-text ">
            <textarea id="postDetail" class="text_inner" v-model="postInfo[modifyIndex].postDetail"></textarea>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <label for="ability" class="item_label">任职要求：</label>
          <div class="grid-content-text ">
            <textarea id="ability" class="text_inner" v-model="postInfo[modifyIndex].ability"></textarea>
          </div>
        </el-col>
        <el-button class="btn" @click="isModify=!isModify">取消</el-button>
        <el-button class="btn" type="success" @click="submitModify">保存</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {reqPostUpdate} from '../../../api'
  export default {
    name: "PostShow",
    methods: {
      handleChange(val) {
        console.log(val)
      },
      modify(index){
        this.isModify=true
        this.modifyIndex=index
      },
      async submitModify(){
        //只要窗口还是打开的，isModify的值一定是true，把整个post上传即可
        const {modifyIndex,isModify} = this
        const result = await reqPostUpdate(this.postInfo[modifyIndex],isModify)
        //返回的是所有post，同步更新postInfo信息
        this.$store.dispatch('recordPost',result.data)
        this.$message({
          message: '信息修改成功',
          type: 'success'
        })
        setTimeout(()=>{
          this.isModify=false
        },500)

      },
      error(){
        this.$message({
          message: '功能尚在开发中',
          type: 'error'
        })
      }
    },
    computed:{
      ...mapState(['postInfo','userInfo'])
    },
    data() {
      return {
        activeNames: ['1'],
        isModify:false, //是否打开修改页面
        modifyIndex:'', //要修改的post的index
      }
    },
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
    .c_container
      position absolute
      width 81%
      left 9.5%
      top 20%
      background-color white
      margin-bottom 20px
      padding 0 20px
      border 0
      .c_item
        .btn
          position static
          width auto
          float right
          margin 10px 10px 10px 0
    .m_container
      width 50%
      height 430px
      background-color #FAFAFD
      position fixed
      left 25%
      top 25%
      border 1px deepskyblue solid
      .m_title
        position absolute
        font-size 18px
        font-weight bold
        left 40px
        top  20px
      .el-row
        width 100%
        left 6%
        top 10%
        margin-bottom: 0
        &:last-child
          margin-bottom: 0;
        .el-col
          border-radius: 2px;
          .grid-content
            background-color white
            margin-top 3px
            border-radius: 2px;
            min-height: 25px;
            border 1px solid #dcdfe6
            .input_inner
              width 100%
              height 25px
              line-height 25px
              font-size 12px
          .item_label
            font-size 12px
          .grid-content-text
            margin-top 5px
            border-radius: 2px;
            min-height: 25px;
            .text_inner
              font-size 12px
              width 100%
              height 80px
              resize none
      .btn
        margin-top 68px
        margin-left 5px

</style>
