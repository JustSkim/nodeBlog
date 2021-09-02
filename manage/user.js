const { db } = require('../db.js');


//用户模块的数据持久化操作

module.exports = {
    //根据手机号获取用户信息
    getUserByPhone: async (phone)=>{
        const sql = 'select id,phone,password,nickname,head_img,personal_sign,level_id from t_user where phone = ?';
        return await db(sql,[phone])
    },
    //添加用户信息
    addUser: (user) => {
        //{name:'',phone:''}
    },
    //更新用户信息
    update: (arr) => {
        //[user,id]=>[{nickname:'',age:''},id]
    },
    //删除用户信息
    del:(id) => {
        //删除用户信息正常情况下不会真是地删除数据，都是通过伪删除操作
        this.update([{id_del:1},id])
        //设置对应参数id_del为1，人为定义让这一行数据不会被系统查询到
    },
    //获取所有用户信息
    getAll: ()=>{
        
    }
}