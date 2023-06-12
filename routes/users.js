var express = require('express');
var router = express.Router();
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块



//获取用户列表
router.get('/', function(req, res, next) {
  console.log(111)
  let conn = mysql.createConnection(dbconfig);
  
  //2、调用数据库连接对象的query方法执行查询
  conn.query('select * from user',function(err,results,fields){
      if(err){
          throw err
      }
      console.log(results)//输出查询结果
      res.send(results)
  }
  )
});


//删除指定id的用户
router.delete('/remove',function(req, res,next)  {
  //1、获取客户端的请求数据
  let id = req.body.id
  console.log(id)
  console.log(444)
  //2、获取数据库的连接
  let conn = mysql.createConnection(dbconfig);
  //3、执行删除
  conn.query('delete from user where id=? ',[id],function(err,result){
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

// 更新指定id的用户
router.put('/update',function(req, res,next)  {
    //1、获取客户端的请求数据
    let id = req.body.id
    let name = req.body.username
    let telephone = req.body.telephone
    console.log(id)
    console.log(444)
    console.log(name)
    let conn = mysql.createConnection(dbconfig);
    //3、更新数据
    conn.query('update user set username=?,telephone=? where id=? ',[name,telephone,id],function(err,result){
        if(err){
            console.log(err)
            res.send({
                code:1001,
                info:'更新失败'
            })
        }else{
            res.send({
                code:1002,
                info:'数据更新成功'
            })
        }
    })
    conn.end((err)=>{
        if(err) {
            console.log(err)
            return
        }
    }
    )
})



module.exports = router;
