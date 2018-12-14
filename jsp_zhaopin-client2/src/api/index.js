/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api'

/*1.用户注册*/
export const reqPwdRegister = ({username, pwd,captcha}) => ajax(BASE_URL+'/register', {username, pwd,captcha}, 'POST')
/*2.用户登陆*/
export const reqPwdLogin = ({username, pwd,captcha}) => ajax(BASE_URL+'/login', {username, pwd,captcha}, 'POST')
/*3.获取验证码*/
export const reqSendCode = phone => ajax(BASE_URL+'/sendcode', {phone})
//4.手机号验证码登陆](#8手机号验证码登陆)
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST')
//5.自动登录，根据会话cookie获取用户info
export const reqUserInfo = () => ajax('/api/userinfo')
//6.用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')
//7.用户信息更新
export const reqUpdate = userInfo => ajax(BASE_URL+'/update',{userInfo},'POST')
//8.修改或保存post信息
export const reqPostUpdate = (postInfo,isModify)=>ajax(BASE_URL+'/updatePost',{postInfo,isModify},'POST')
//9.获取post信息
export const reqPostInfo = ()=>ajax(BASE_URL+'/postInfo')
//10.employee信息
export const reqEmployee = ()=>ajax('/employee') //不用匹配代理
