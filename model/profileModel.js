const mongoose = require('mongoose')

//引入约束Schema
let Schema = mongoose.Schema

//制定规则
profileSchema = new Schema({
    id: {type: String, required: true},
    pic: {type: String, required: true},
    tell: {type: Number, default: null},
    age: {type: Number, default: null},
    sex:{type: String, default: '保密'},
    signature: {type: String, default: '快说点什么吧......'}

})

module.exports = mongoose.model('profiles', profileSchema)