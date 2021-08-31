const express = require("express")
const fs = require('fs')


const app = express()

//发送get请求，使用回调函数
app.get('/',(req,resp)=>{
    fs.readFile('pages/index.html',(err,data)=>{
        if(!err){
            resp.end(data)
        }
        else{
            console.log(err)
        }
    })
    /*
    node.js中的http.response.end方法使用说明
https://www.jb51.net/article/58468.htm

http.response.end结束响应，告诉客户端所有消息已经发送。当所有要返回的内容发送完毕时，该函数必须被调用一次。

如果不调用该函数，客户端将永远处于等待状态。
语法：
response.end([data], [encoding])
接收参数：
data ： end()执行完毕后要输出的字符，如果指定了 data 的值，那就意味着在执行完 response.end() 之后，会接着执行一条 response.write(data , encoding);
encoding： 对应data的字符编码 
     
    */
})

app.get('/toLogin',(req,resp)=>{
    fs.readFile('pages/login.html',(err,data)=>{
        if(!err){
            resp.end(data)
        }
        else{
            console.log(err)
        }
    })
})

app.listen(3000,()=>{
    console.log("sever is listening")
})