var express = require('express');
var router = express.Router();
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

/* GET users listing. */
//获取
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    // console.log(111)
   
    let conn = mysql.createConnection(dbconfig);
    console.log(conn)
    //2、调用数据库连接对象的query方法执行查询
    conn.query('select * from user',function(err,results,fields){
        if(err){
            throw err
        }
        console.log(results)//输出查询结果
        res.send(results)
    })
    //3、关闭数据库的连接
    conn.end((err)=>{
        if(err){
            console.log(err)
            return
        }
    })
});