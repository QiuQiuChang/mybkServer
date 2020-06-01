const express = require("express")

const router = express.Router()

//引入articleModel
let  articleModel = require('../model/articleModel')

//获取文章路由
router.get('/article',(request,response)=>{
    try {
        articleModel.find({},{__v:0},{skip:0,limit:12}).then((data)=>{
            if(data){
                response.send({code:0,message:'请求成功',data})
            }
        })
    }catch (e) {
        response.send({code:500,message:'网络不稳定，请稍后重试!'})
    }
})
module.exports = router