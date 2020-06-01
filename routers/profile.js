const express = require("express")

const router = express.Router()
//引入模型用于查找
const userModel = require('../model/userModel')

//引入个人中心模型
const profileModel = require('../model/profileModel')

//引入token生成秘钥
const SECRET = require('../secret/secret')

//引入jwttoken
const jwt = require('jsonwebtoken')
//获取个人信息路由
router.get('/profile', async (req, res) => {
    //console.log(req.headers.authorization)
    const raw = req.headers.authorization.split(' ').pop()
    const tokenData = jwt.verify(raw, SECRET)
    const {id} = tokenData
    // console.log(tokenData)
    try {
        let result = await userModel.findById(id)
        let result1 = await profileModel.findOne({id})
        //console.log(result, result1)
        if (result && result1) {
            res.send({
                code: 200,
                name: result.nick_name,
                email: result.email,
                pic: result1.pic,
                tell: result1.tell,
                age: result1.age,
                sex: result1.sex,
                signature: result1.signature
            })
        }
        if(result && !result1){
            res.send({
                code:200,
                name: result.nick_name,
                email: result.email})
        }
    } catch (e) {
        res.send({code: 500, message: '网络不稳定，请稍后重试!'})
    }

})

router.post('/profile',async (req,res)=>{
    console.log(req.body)
    const {sex,age,phoneNumber,signature,email} = req.body
    //手机号正则匹配
    const phoneNumberReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    try{
        let result = await userModel.findOne({email})
        const {id} = result
        //console.log(result)
        if(sex && age && phoneNumber && signature){
            if(age<0 || age>100 ){
                res.send({code:416,message:'请输入正确的年龄!'})
                return
            }else if(!phoneNumberReg.test(phoneNumber) ){
                res.send({code:416,message:'请输入正确的手机号!'})
                return
            }else{
                let result = await profileModel.updateOne({id},{sex,age,tell:phoneNumber,signature})
            }
        }
        if(sex){
            let result = await profileModel.updateOne({id},{sex})
        }
        if(signature){
            let result = await profileModel.updateOne({id},{signature})
        }
        if(age<0 || age>100){
            res.send({code:416,message:'请输入正确的年龄!'})
            return
        }else if(age>0 && age<=100){
            let result = await profileModel.updateOne({id},{age})
        }
        if(phoneNumber && !phoneNumberReg.test(phoneNumber)){
            res.send({code:416,message:'请输入正确的手机号!'})
            return
        }else if(phoneNumber && phoneNumberReg.test(phoneNumber)){
            let result = await profileModel.updateOne({id},{tell:phoneNumber})
        }
        res.send({code:200,message:'更新成功!'})
    }catch (e) {
        res.send({code:500,message:'网络不稳定，请稍后重试!'})
    }

})
module.exports = router