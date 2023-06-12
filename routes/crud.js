var express = require('express');
var router = express.Router();
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(111)
  let conn = mysql.createConnection(dbconfig);
  console.log(conn)
  //2、调用数据库连接对象的query方法执行查询
  conn.query('select * from stu',function(err,results,fields){
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

//add
router.post('/add',function(req, res,next){
    //1、就是客户端的请求数据
    let id =req.body.s_id
    let name =req.body.s_name
    let age =req.body.s_age
    //2、将数据封装成对象
    let data ={id,name,age}
    console.log(data)
    //3、创建数据库的连接对象
    let conn = mysql.createConnection(dbconfig);
    //4、将数据插入到数据库中
    conn.query('insert into stu set ?',data,function(err,result){
        if(err){
            res.send({
                code:1001,
                info:'数据插入失败'
            })
        }else{
            res.send({
                code:1002,
                info:'数据插入成功'
            })
        }
    })
    //5、关闭数据库连接
    conn.end((err)=>{
        if(err){
            console.log(err)
            return
        }
    })
})

//delete

router.delete('/remove',function(req, res,next)  {
    //1、获取客户端的请求数据
    let id = req.body.s_id
    //2、获取数据库的连接
    let conn = mysql.createConnection(dbconfig);
    //3、执行删除
    conn.query('delete from stu where id=?',id,function(err,result){
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

//update
router.put('/modify',(req, res) => {

    //1、就是客户端的请求数据
    let id =req.body.s_id
    let name =req.body.s_name
    let age =req.body.s_age
    //2、创建数据库的连接对象
    let conn = mysql.createConnection(dbconfig);
    //3、将数据插入到数据库中
    conn.query('update stu set name=?,age=?, where id=?',[name,age,id],function(err,result){
        if(err){
            console.log(err)
            res.send({
                code:1001,
                info:'数据更新失败'
            })
        }else{
            res.send({
                code:1002,
                info:'数据更新成功'
            })
        }
    })
    //5、关闭数据库连接
    conn.end((err)=>{
        if(err){
            console.log(err)
            return
        }
    })
})



module.exports = router;
