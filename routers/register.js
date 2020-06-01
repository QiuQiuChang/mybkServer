const express = require("express")

const router = express.Router()

//引入userModel
let userModel = require('../model/userModel')

//注册业务路由
router.post('/register',async(request,response)=>{
    //console.log(request.body)
    //获取用户的输入
    const {nick_name,email,password} = request.body
    //正则校验数据合法性
    const nickNameReg = /^(?!_)(?!.*?_$)[\u4E00-\u9FA5A-Za-z0-9_]{6,18}$/;
    const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const passwordReg = /^[a-zA-Z]\w{6,17}$/;

    //正则进行校验
    if(nick_name&&!nickNameReg.test(nick_name)){
        response.send("包含有汉字、数字、字母、下划线(6-18之间),不能以下划线或特殊字符开头和结尾")
        return
    }else if(email&&!emailReg.test(email)){
        response.send("请输入正确定的邮箱地址")
        return
    }else if(password&&!passwordReg.test(password)){
        response.send("以字母开头，长度在6~17 之间，只能包含字符、数字和下划线")
        return
    }
    //操作数据库是容易出现问题，try里面放可能出现错误的代码，一旦出现错误，会携带着错误信息来到catch中。
    try {
        if(nick_name&&email&&password){
            let result = await userModel.findOne({email})
            if(result){
                response.send({code:204,message:'该邮箱已经注册过!'})
                return
            }else{
                await userModel.create({nick_name,email,password})
                response.send({code:200,message:'注册成功'})
            }
        }else if(nick_name){
            let finResult = await userModel.findOne({nick_name})
            if(finResult){
                response.send({code:204,message:'该用户名已经被注册!'})
                return
            }else{
                response.send({code:200,message:'该用户名可用'})
                return
            }
        }else if(email){
            let finResult1 = await userModel.findOne({email})
            if(finResult1){
                response.send({code:204,message:'该邮箱已经注册过!'})
                return
            }else{
                response.send({code:200,message:'该邮箱可用'})
                return
            }
        }
    }catch (e) {
        response.send({code:500,message:'网络不稳定，请稍后重试!'})
    }
})
module.exports = router;