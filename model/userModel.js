let mongoose = require('mongoose')
//引入加密
let bcrypt = require('bcryptjs')
//引入约束Schema
let Schema = mongoose.Schema
//制定规则
userSchema = new Schema({
    nick_name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        set(val){
            return bcrypt.hashSync(val)
        }
    },
    date:{
        type:Date,
        default:Date.now()
    },
    enable_flag:{
        type:String,
        default:'Y'
    }
})

//导出model
module.exports = mongoose.model('users',userSchema)