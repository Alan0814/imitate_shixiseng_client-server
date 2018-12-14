/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_POST_INFO,
  RECEIVE_EMPLOYEE,
} from './mutation-types'

export default {
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [UPDATE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [UPDATE_POST_INFO] (state, {postInfo}) {
    state.postInfo = postInfo
  },
  [RECEIVE_EMPLOYEE] (state, {employee}) {
    state.employee = employee
  },
}
