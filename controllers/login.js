const Monk = require('monk')
//
const db=new Monk('localhost/DYsystem') //链接到库
const user = db.get('user');//表

 const regist_fn = async (ctx,next)=>{
     let query = ctx.request.body
     console.log(await students.findOne({userId:query.userId}))
     if(await user.findOne({userId:query.userId})){
        ctx.body = {
            code:0,
            err_msg:"已注册或正在审核"
        }
    }else{
        await students.insert(query)
        ctx.body = {
            code:1,
            err_msg:"注册成功"
        }
    }
  }
  const login_fn =  async (ctx, next) => {
    let
        userId = ctx.request.body.userId || '',
        keyWord = ctx.request.body.keyWord || '';
    console.log(`signin with name: ${userId}, password: ${keyWord}`);
    let users = await user.findOne({userId:userId})
    if(users){
        if(users.keyWord == keyWord){
            if(users.canLogin){
                ctx.body = {
                    code:0,
                    err_msg:"登陆成功"
                }
               await user.update({userId:userId},{$set:{'isLogin':true}})
            }else{
                ctx.body = {
                    code:1,
                    err_msg:"管理员审核中"
                }
            }
        }else{
            ctx.body = {
                code:3,
                err_msg:"密码错误"
            }
        }
    }else{
        ctx.body = {
            code:2,
            err_msg:"尚未注册"
        }
    }
  }

  const auto_login_fn = async (ctx,next)=>{
    let userId = ctx.query.userId
    if(userId){
        let users = await user.findOne({userId:userId,isLogin:true})
        if(users){
            ctx.body = {
                code:0
            }
        }
    }else{
        ctx.body = {
            code:1
        }
    }
    
  }
  module.exports={
      'POST/regist':regist_fn,
      'POST/login':login_fn,
      'GET/login':auto_login_fn,
  }