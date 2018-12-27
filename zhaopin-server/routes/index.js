var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha')
const sms_util = require('../util/sms_util')
const users = {}
const md5 = require('blueimp-md5')

const filter = {password: 0, __v: 0} // 指定过滤的属性
const UserModel = require('../db/models').UserModel
const {PostModel} = require('../db/models')

const mongoose = require('mongoose') //引入mongoose，用于id的类型转换

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*用户注册*/
router.post('/register',(req,res)=>{
  // 读取请求参数数据
  const {username,pwd} = req.body
  const captcha = req.body.captcha.toLowerCase()
  //判断验证码是否正确
  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  if(captcha!==req.session.captcha) {
    return res.send({code: 1, msg: '验证码不正确'})
  }
  // 删除保存的验证码
  delete req.session.captcha

  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  UserModel.findOne({username}, function (err, user) {
    // 如果user有值(已存在)
    if(user) {
      // 返回提示错误的信息
      res.send({code: 1, msg: '此用户已存在'})
    } else { // 没值(不存在)
      //保存用户信息
      // 先对密码进行加密
      new UserModel({username,password:md5(pwd)}).save(
        function (err, user) {
          //返回包含user的JSON数据,但是不能返回密码
          const data = {username,_id:user._id}
          //用户注册成功，帮他登陆，并且标识用户已经登陆
          //方法一：cookie
          //生成一个 cookie(userid: user._id), 并交给浏览器保存
          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
          //前者是用户的user._id，后两者指定持久化 cookie, 浏览器会保存在本地文件
          //方法二：session，参考vue项目
          res.send({code:0,data:data})
        }
      )
    }
  })
})

/*一次性图形验证码*/
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1l',
    noise: 2,
    color: true
  });
  req.session.captcha = captcha.text.toLowerCase();
  console.log(req.session.captcha)
  /*res.type('svg');
  res.status(200).send(captcha.data);*/
  res.type('svg');
  res.send(captcha.data)
});


//密码登陆路由
router.post('/login',(req,res)=>{
  const{username,pwd}= req.body
  const captcha = req.body.captcha.toLowerCase()
  //判断验证码是否正确
  if(captcha!==req.session.captcha) {
    return res.send({code: 1, msg: '验证码不正确'})
  }
  // 删除保存的验证码
  delete req.session.captcha
  //根据username和password查询数据库users
  UserModel.findOne({username,password:md5(pwd)},filter,function (err, user) {
    if(user){
      //user存在，登陆成功
      req.session.userid = user._id
      res.send({code:0,data:user})
    } else {
      //user不存在，登陆失败
      res.send({code:1,msg:"用户名或密码不正确"})
    }
  })
})


/*发送验证码短信*/
router.get('/sendcode', function (req, res, next) {
  //1. 获取请求参数数据
  var phone = req.query.phone;
  //2. 处理数据
  //生成验证码(6位随机数)
  var code = sms_util.randomCode(6);
  //发送给指定的手机号
  console.log(`向${phone}发送验证码短信: ${code}`);
  sms_util.sendCode(phone, code, function (success) {//success表示是否成功
    if (success) {
      users[phone] = code
      console.log('保存验证码: ', phone, code)
      res.send({"code": 0})
    } else {
      //3. 返回响应数据
      res.send({"code": 1, msg: '短信验证码发送失败'})
    }
  })
})

/*短信登陆*/
router.post('/login_sms', function (req, res, next) {
  var phone = req.body.phone;
  var code = req.body.code;
  console.log('/login_sms', phone, code);
  if (users[phone] != code) {
    res.send({code: 1, msg: '手机号或验证码不正确'});
    return;
  }
  UserModel.findOne({phone}, function (err, user) {
    if (user) {
      req.session.userid = user._id
      res.send({code: 0, data: user})
    } else {
      //存储数据
      const userModel = new UserModel({phone})
      console.log('phone用户信息创建成功')
      userModel.save(function (err, user) {
        console.log(123)
        req.session.userid = user._id
        res.send({code: 0, data: user})
      })
    }
  })
  //删除保存的code
  delete users[phone];
})

/*自动登陆，根据sesion中的userid, 查询对应的user*/
router.get('/userinfo', function (req, res) {
  // 取出userid
  const userid = req.session.userid
  // 查询
  UserModel.findOne({_id: userid}, filter, function (err, user) {
    // 如果没有, 返回错误提示
    if (!user) {
      // 清除浏览器保存的userid的cookie
      delete req.session.userid

      res.send({code: 1, msg: '请先登陆'})
    } else {
      // 如果有, 返回user
      console.log('获取到了userInfo并成功返回')
      res.send({code: 0, data: user})
    }
  })
})

//退出登陆，通过删除session中的cookie信息达到退出登录的效果
router.get('/logout', function (req, res) {
  // 清除浏览器保存的userid的cookie
  delete req.session.userid
  // 返回数据
  res.send({code: 0})
})


//更新用户信息的路由
router.post('/update',(req,res)=>{
  //从请求的cookie中得到userid
  const userId = req.session.userid
  /*if(!userId){
    //用户id不存在，直接返回一个提示信息
    return res.send({code:1,msg:'请先登陆'})
  }
  //用户存在，根据查询结果更新user*/

  //接受一个userInfo对象
  const {userInfo} = req.body //不含userid
  UserModel.findOneAndUpdate({_id:userId},userInfo,{new:true},function (err, newUser) {
    if (!err){
      if(!newUser){
        //userId不正确，cookie出错了，可能被人篡改了
        //通知浏览器删除userId的cookie
        console.log(newUser)
        res.clearCookie('userid')
        res.send({code:1,msg:'请先登陆',data:newUser})
      } else {
        /*const {_id, username} = oldUser*/
        // 合并用户信息，缺少登陆用的username和_id
        /*const data = Object.assign({_id, username},userInfo)*/
        // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
        // res.send({code: 0, innerUser:user,oloUser:oldUser,assignUser:data})
        res.send({code: 0, data:newUser})
        console.log('更新成功')
        /*console.log(data)*/
      }
    }else{
      res.send({code:1,msg:'没有找到该用户'})
      console.log(typeof newUser)
    }

  })
})

//保存职位信息的路由，添加hrID，创建好post文档，找到对应的user，把post文档的id添加到postShow数组中
router.post('/updatePost',(req,res)=>{
  const userId = req.session.userid
  const {postInfo,isModify}=req.body
  if(isModify){
    const id = mongoose.Types.ObjectId(postInfo._id)
    //修改文档，根据post._id找到对应的文档即可
    PostModel.findOneAndUpdate({_id:id},postInfo,{new:true},function(err,post) {
      if(!err){
        if(post){
          console.log("找到了文档，并且修改成功")
          /*//返回修改后的文档，前端根据index更新局部,这样的话又要action接受两个参数，不知道怎么搞
          res.send({code:0,data:post})*/
          //修改成功，返回所有为userId的post文档，用于前端显示
          PostModel.find({userId:userId},function (err, postInfo) {
            res.send({code:0,data:postInfo})
          })
        }else{
          console.log('没有找到该文档')
          res.send({code:1,msg:'没有找到该文档'})
        }
      }else{
        //修改失败
        res.send({code:1,mgs:'post修改请求失败'})
      }
    })
  }else{
    //创建并保存文档
    //把userId添加到postInfo中
    Object.assign(postInfo,{userId})
    //创建post文档
    new PostModel(postInfo).save(
      function (err, post) {
        if(!err){
          //post文档创建并保存成功，把postId保存在相应的user文档中
          UserModel.findOneAndUpdate({_id:userId},{$push:{postIds:{postId:post._id}}},{new:true},
            function(err,newUser) {
              if (!err) {
                /*console.log(typeof userId)//string
                console.log(typeof newUser._id) //Object
                console.log(userId===newUser._id) //false */
                //更新成功，返回所有为userId的post文档，用于前端显示
                PostModel.find({userId: userId}, function (err, postInfo) {
                  res.send({code: 0, data: postInfo})
                })
              } else {
                res.send({code: 1, msg: '保存请求失败，无法更新user'})
              }
            }
          )
        }else{
          res.send({code:1,msg:'保存请求失败，无法创建post'})
        }
      }
    )
  }


})

//mounted，获取职位信息通过userid，找到postModel中所有userId值的文档，并返回数组
router.get('/postInfo',(req,res)=>{
  //获取会话中的userId，用于查询
  const userId = req.session.userid
  PostModel.find({userId:userId},function(err,postInfo){
    if(!err){
      //找到了文档，返回即可
      res.send({code:0,data:postInfo})
    }else{
      res.send({code:1,msg:'没有找到相关的文档'})
    }
  })
})


//获取职位信息，查找对应的user，找到postShow数组下所有的post文档，并返回


module.exports = router;
