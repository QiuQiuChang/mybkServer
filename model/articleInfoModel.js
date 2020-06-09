const mongoose = require('mongoose')

//引入约束Schema
let Schema = mongoose.Schema

//制定规则
articleSchema = new Schema({
    content: {type: String, required: true},
    num:{type:Number}
})
let articleInfo = mongoose.model('articleInfo', articleSchema)

// articleInfo.create({
//     content:``,
// num:12
// }).then((res)=>{
//     console.log(res)
// })
//导出model
module.exports = articleInfo