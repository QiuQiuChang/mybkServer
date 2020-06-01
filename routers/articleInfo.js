const express = require("express")

const router = express.Router()

//引入articleInfoModel
let  articleInfoModel = require('../model/articleInfoModel')

//故去文章信息路由
router.get('/articleInfo/:id',async(req,res)=>{
    //console.log(req.params)
    const {id} = req.params
    try {
     let result  = await articleInfoModel.findOne({num:id})
        res.send(result)
    }catch (e) {
        response.send({code:500,message:'网络不稳定，请稍后重试!'})
    }

})

module.exports = router