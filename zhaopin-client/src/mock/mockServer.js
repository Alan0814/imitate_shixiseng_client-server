/*使用mocksjs提供mock数据的接口*/
import Mock from 'mockjs'
import data from './data.json'


//返回employee数据的藉口
Mock.mock('/employee',{code:0,data:data})
