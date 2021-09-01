const mysql = require('mysql')

const config = {
    database:'blog',
    user:'root',
    password: '',
}
exports.db = (sql,sqlParams)=>{
    return new Promise((resolve,reject)=>{
        sqlParams = sqlParams == null ? [] :sqlParams;
        //connection.query函数调用参数为null(即查询操作)时候，可以直接不写
        //sqlParams = sqlParams || []  另外一种写法，是null的时候就取空数组
        const pool = mysql.createPool(config);
        pool.getConnection((err,conn)=>{
            if(!err){
                conn.query(sql,sqlParams,(e,results)=>{
                    //调用，参数为一个sql语句，一个写入数据，一个回调函数
                    if(!e){
                        console.log(results)
                        resolve(results)
                        conn.destroy()
                    }else{
                        console.log("sql: ",e)
                        reject(e)
                    }
                })
            }
            else{
                console.log("conn err:",err)
                reject(err)
            }
            //conn.destroy();
            /*
            If you would like to close the connection and remove it from the pool, use connection.destroy() instead. The pool will create a new connection the next time one is needed.
            */
            //conn.release();
        })
    });
}

