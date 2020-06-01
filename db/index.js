const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

//定义数据库名
const DB_NAME = 'test'
//定义数据库地址
const DB_URL = 'localhost:27017'
//连接并导出数据库
module.exports = mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log(`位于${DB_URL}上的${DB_NAME}数据库连接成功`)
    }).catch(() => {
        console.log(`位于${DB_URL}上的${DB_NAME}数据库连接失败`)
    })
