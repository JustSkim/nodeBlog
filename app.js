const express = require("express")
const mysql = require('mysql')
const util = require('./util.js')
const { db } = require('./db.js')
const user = require("./manage/user.js")
const blog = require("./manage/blog.js")
const app = express()

//设置静态资源路径
app.use('/static',express.static(__dirname + '/static'));
//注意，这里两个static必须有斜杠！！！

/*
express.static()
提供对静态资源文件(图片、csss文件、javascript文件)的服务。传递一个包含静态资源的目录给 express.static 中间件用于立刻开始提供文件。如下提供public目录下的图片、css文件和javascript文件：
app.use(express.static('public'));
express 会在静态资源目录下查找文件，所以不用把静态目录public作为url的一部分。访问项目public的子文件index.js：
http://localhost:3000/index.js
可以多次使用 express.static 中间件来添加多个静态资源目录，这时express 将会按照你设置静态资源目录的顺序来查找静态资源文件：
尤其注意：
the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use('/static', express.static(path.join(__dirname, 'public')))

*/

/*
1.负责页面跳转
2.负责业务数据处理
*/

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
app.get('/getUser',(req,resp)=>{
    const sql = 'select * from t_user';
    db(sql,null).then(res=>{
        resp.send(res)
    })
    /*
数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。这项技术能明显提高对数据库操作的性能。

    用 createConnection 创建 Mysql 连接，每执行一次 connection.query 都是一个全新的连接，会造成一个资源的极大浪费，降低性能。

连接池是另外的一种执行方法，它一次性的创建了多个连接，然后根据客户端的查询，自动的 分发、复用、管理 这些连接。

我们首先用mysql.createPool或mysql.createConnection建立一个连接池pool，然后使用pool.getConnection从创建的连接池中获取到一个我们需要的连接.
使用回调函数的参数connection来查询数据库。最后使用connection.realease()方法释放数据库连接
When connecting to other servers, you will need to provide an object of options, in the same format as tls.createSecureContext. Please note the arguments expect a string of the certificate, not a file name to the certificate.
    */
})

app.get('/addUser',(req,resp)=>{
    const sql = 'insert into t_user set ?';
    const sqlParams = {id:669,phone: '133505334444',password:'123456',nickname:'李云飞'}
    //注意，数据表t_user中id列不可为空，所以这一个数据必须有，其他的可以无
    db(sql,sqlParams).then(res=>{
        resp.send(res)
    })
});

app.listen(8080,()=>{
    console.log("sever is listening")
})


//------------业务------------
app.get('/user/getPhone',async (req,resp)=>{
    const use = await user.getUserByPhone('1503334444')//该方法返回一个数据库数据
    console.log("user: ",use);
})