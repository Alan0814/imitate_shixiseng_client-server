<template>
  <div class="e_container">
    <h2 class="title">精选人才信息</h2>
    <el-button class="refresh" @click="getEmployee" type="success">换一批</el-button>
    <el-collapse v-model="activeNames" @change="handleChange" class="c_container">
      <el-collapse-item :title="employ.bg+'  |  '+employ.age+'  |  '+employ.name" :name="index" class="c_item"
                        v-for="(employ,index) in employee.employees" :key="index">
        <div>来自{{employ.city}}</div>
        <hr/>
        <div>自我介绍：<br/>{{employ.introduction}}</div>
        <hr/>
        <div>期望薪资：<br/>{{employ.wage}}</div>
        <el-button class="btn" @click="error"type="success">发送邀请</el-button>
        <el-button class="btn" @click="error" >查看简历</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Employee",
    mounted(){
      this.$store.dispatch('getEmployee')
    },
    computed:{
      ...mapState(['employee'])
    },
    methods:{
      error(){
        this.$message({
          message: '功能尚在开发中',
          type: 'error'
        })
      },
      getEmployee(){
        this.$store.dispatch('getEmployee')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .e_container
    width 100%
    height 1000px
    background-color #FAFAFD
    position relative
    border-top 1px #cfcfcf solid
    .title
      position absolute
      font-size 24px
      font-weight bold
      left 130px
      top  50px
    .refresh
      float right
      margin-right 6.5%
      margin-top 50px
    .c_container
      position absolute
      width 81%
      left 9.5%
      top 100px
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
</style>
