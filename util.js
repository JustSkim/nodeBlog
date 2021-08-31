const fs = require('fs')

//封装文件操作
module.exports={
    read: (url)=>{
        return new Promise((resolve,rejects)=>{
            fs.readFile(url,(err,data)=>{
                if(!err){
                    resolve(data)
                }
                else{
                    console.log(err)
                    rejects(err)
                }
            })
        })
    }
}
