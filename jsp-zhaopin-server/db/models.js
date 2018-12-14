/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/jsp_zhaopin',{ useNewUrlParser: true })
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', () => {
  console.log('db connect success!')
})

/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String}, // 用户名
  password: {type: String}, // 密码
  phone: {type: String}, //phone
  post: {type: String}, // 职位
  realName:{type:String}, //真名
  firm: {
    firmName: String,
    firmMail:String,
    legalPerson:String,
    firmAddress:String,
    registerNumber:String,
  }, // 公司名称
  isVerification:Boolean, //是否完成了验证
  postIds:[
    {postId:String} //存放着postSchema的某个_id
  ]
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合为: users
// 2.3. 向外暴露Model
exports.UserModel = UserModel

/*3. 定义出对应特定集合的Model并向外暴露*/
// 3.1. 定义职位Schema(描述文档结构)
const postSchema = mongoose.Schema({
  userId:{type:String}, //哪个hr发布的
  major: {type: String}, // 从业领域
  firmSize: {type: String}, // 公司规模
  post: {type: String}, //招聘职位
  dailyWage: {type: String}, // 日薪
  educationBg:{type:String}, //学历要求
  workDay:{type:String}, //每周工作天数
  workAddress:{type:String}, //工作地点
  postDetail:{type:String}, //职位描述
  ability:{type:String}, //任职要求
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const PostModel = mongoose.model('post', postSchema) // 集合为: users
// 2.3. 向外暴露Model
exports.PostModel = PostModel
