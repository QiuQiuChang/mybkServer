const express = require("express")
//引入multer中间件
const multer = require("multer")

//引入jwttoken
const jwt = require('jsonwebtoken')

//引入token生成秘钥
const SECRET = require('../secret/secret')

//引入用户模型用于查找
const userModel = require('../model/userModel')

//引入个人中心模型
const profileModel = require('../model/profileModel')

const path = require('path')

const router = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/picture'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0])
    }
})

let upload = multer({storage}).single('file')

router.post('/picture', (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            res.send({code: 500})
        } else if (err) {
            res.send({code: 500})
        }
        const raw = req.headers.authorization
        const tokenData = jwt.verify(raw, SECRET)
        const {id} = tokenData
        try {
            if (id) {
                let result = await profileModel.findOne({id})
                //console.log(result)
                if (result) {
                    profileModel.updateOne({id}, {pic: `http://localhost:9875/picture/${req.file.filename}`}).then((response => {
                        //console.log(response)
                        res.send({code: 200, message: '更换成功！'})
                    }))
                } else {
                    profileModel.create({
                        id,
                        pic: `http://localhost:9875/picture/${req.file.filename}`
                    }).then(response => {
                        //console.log(response)
                        res.send({code: 200, message: '上传成功！'})
                    })

                }

            } else {
                res.send({code:300,message:'你已登录失效，请重新登录！'})
            }
        } catch (e) {
            res.send({code: 500, message: '网络不稳定，请稍后重试!'})
        }

    })

})

module.exports = router