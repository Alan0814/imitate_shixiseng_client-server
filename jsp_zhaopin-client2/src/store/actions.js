/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_POST_INFO,
  RECEIVE_EMPLOYEE,
} from './mutation-types'
import {
  reqUserInfo,
  reqUpdate,
  reqPostUpdate,
  reqPostInfo,
  reqEmployee,
} from '../api'

export default {
  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步更新用户信息
  async upDate({commit}, userInfo) {
    const result = await reqUpdate(userInfo)
    if (result.code === 0) {
      console.log('更新成功action')
      //返回了包括_id在内的完整新的用户信息，用于更新state
      const userInfo = result.data
      commit(UPDATE_USER_INFO, {userInfo})
    }else{
      console.log('没有找到该用户')
    }
  },
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步修改或保存招聘信息
  async postInfoUpdate({commit},postInfo,isModify) {
    const result = await reqPostUpdate(postInfo,isModify)
    if (result.code === 0) {
      console.log('调用了postInfoUpdate，且成功了')
      const postInfo = result.data
      commit(UPDATE_POST_INFO, {postInfo})
    }
  },
  // 异步获取招聘信息
  async getPostInfo({commit}) {
    const result = await reqPostInfo()
    if (result.code === 0) {
      const postInfo = result.data
      commit(UPDATE_POST_INFO, {postInfo})
    }
  },
  // 同步记录用户信息
  recordPost({commit}, postInfo) {
    commit(UPDATE_POST_INFO, {postInfo})
  },
  // 异步获取应聘者信息
  async getEmployee({commit}) {
    const result = await reqEmployee()
    if (result.code === 0) {
      const employee = result.data
      commit(RECEIVE_EMPLOYEE, {employee})
    }
  },

 /* // 异步登出，直接了
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },*/
}
