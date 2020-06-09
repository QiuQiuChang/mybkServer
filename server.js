let express = require('express')
let path = require('path')
//let bodyParser = require("body-parser")
let app = express()
//允许8080端口请求（跨域解决）
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://www2.p2pd.com,http://www.p2pd.com,http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next();

});
 //引入数据库连接模块
let db = require('./db')
//引入注册路由
let register = require('./routers/register')
//引入登录路由
let login = require('./routers/login')

//引入文章路由
let article = require('./routers/article')

//引入文章信息路由
let articleInfo = require('./routers/articleInfo')

//引入个人信息路由
let profile = require('./routers/profile')

//引入上传图像路由
let picture = require('./routers/picture')
db.then(()=>{
    //开放静态资源库
    app.use(express.static(path.resolve(__dirname,"./public")))
    //使用express内置中间件用于获取post请求体参数
    app.use(express.urlencoded({extended:true}));
    app.use(register)
    app.use(login)
    app.use(article)
    app.use(articleInfo)
    app.use(profile)
    app.use(picture)
})



app.listen('9875',(err)=>{
    if(!err){
        console.log("服务器启动成功")
    }else{
        console.log(err)
    }
})
