const express = require("express")
const fs = require('fs')
const util = require('./util.js')

const app = express()




//发送get请求，使用回调函数
app.get('/',(req,resp)=>{
    util.read('pages/index.html')
    .then(res=>{
        resp.write(res)
        resp.end()
    })
})

app.get('/toLogin',async (req,resp)=>{
    const data = await util.read('pages/login.html')
    resp.end(data);
})

app.listen(3000,()=>{
    console.log("sever is listening")
})