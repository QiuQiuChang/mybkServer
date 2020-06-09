const mongoose = require('mongoose')

//引入约束Schema
let Schema = mongoose.Schema

//制定规则
articleSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    surface:{type:String,required:true},
    date:{type:Date,default:Date.now()}
})
let article  = mongoose.model('articles',articleSchema)
// article.create({
//     title:'《LOL》诡术妖姬乐芙兰背景故事',
//     content:`身为黑色玫瑰的首领，乐芙兰的身份和关于她的传闻一样不可捉摸，和赋予她形态的幻象一样转瞬即逝。或许连她自己也不知道自己的身份，毕竟她已历经数百年的模仿和欺骗......`,
//     surface:'http://localhost:9875/imgs/yaoji/0.jpg'
// })
//导出model
module.exports = article
