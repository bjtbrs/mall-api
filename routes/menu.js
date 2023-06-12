var express = require('express');
var router = express.Router();
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

//获取menu列表
router.get('/', function(req, res, next) {
    let conn = mysql.createConnection(dbconfig);
    conn.query('select * from menu',function(err,results,fields){
        if(err){
            throw err
        }
        console.log(results)//输出查询结果
        res.send(results)
    }
    )
});

//delete
router.delete('/delete',function(req,res,next){
    let id=req.body.id
    let conn = mysql.createConnection(dbconfig);
    conn.query('delete from menu where id=? ',[id],function(err,result){
        if(err){
            console.log(err)
            res.send({
                code:1001,
                info:'删除失败'
            })
        }else{
            res.send({
                code:1002,
                info:'数据删除成功'
            })
        }
    })
    conn.end((err)=>{
        if(err) {
            console.log(err)
            return
        }
    })
})

//批量删除
router.delete('/deletes',function(req,res,next){
    let begin=req.body.begin
    let end=req.body.end
    let conn = mysql.createConnection(dbconfig);
    conn.query('delete from menu where id between ? and ? ',[begin,end],function(err,result){
        if(err){
            console.log(err)
            res.send({
                code:1001,
                info:'删除失败'
            })
        }else{
            res.send({
                code:1002,
                info:'数据删除成功'
            })
        }
    })
    conn.end((err)=>{
        if(err) {
            console.log(err)
            return
        }
    })
})



module.exports = router;