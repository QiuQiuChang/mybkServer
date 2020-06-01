const express = require('express')

const router = express.Router()
//引入token生成秘钥
const SECRET = require('../secret/secret')
//引入userModel
let userModel = require('../model/userModel')
//引入加密
let bcrypt = require('bcryptjs')

//引入jwt生成token
const jwt = require("jsonwebtoken")
//登录业务路由
router.post('/login',async(request, response)=>{
    // console.log(request.body)
    const {nick_name,email,password} = request.body
    try {
        let findResult = await userModel.findOne({nick_name})
            //console.log(findResult)
            if(!findResult){
                return response.send({code:422,message:'该用户名不存在!'})
            }
            if(email !== findResult.email){
                return response.send({code:422,message:'邮箱地址输入错误!'})
            }
            const isPassWordValid = bcrypt.compareSync(password,findResult.password)
           if(!isPassWordValid){
               return response.send({code:422,message:'密码输入错误!'})
           }
            const token = jwt.sign({
                id:String(findResult._id)
            },SECRET)

           response.send({code:200,message:'登陆成功',token})
    }catch(err){
        response.send({code:500,message:'网络不稳定，请稍后重试!'})
    }
});
module.exports = router;