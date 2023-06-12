var express = require('express');
var router = express.Router();
var mysql = require('mysql')//导模块
var dbconfig = require('../config/dbconfig')//导入自定义模块

/* GET users listing. */
//验证账号密码
router.post('/', function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    console.log(password)
    let conn = mysql.createConnection(dbconfig);
    conn.query('select password,power from user where username=? ', [username], function (err, results, fields) {
        // console.log(JSON.parse(JSON.stringify(results)))//输出查询结果
        if (password == JSON.parse(JSON.stringify(results))[0].password) {
            res.send({
                code: 1002,
                info: '登录成功',
                power: JSON.parse(JSON.stringify(results))[0].power,
                username:username
            })
        }
        else{
            res.send({
                code: 1001,
                info: '账号或密码错误'
            })
        }
    })

    //3、关闭数据库的连接
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    }
    )
    return 

});

//注册
router.post('/register', function (req, res, next) {
    // 1、就是客户端的请求数据
    let username = req.body.username
    let password = req.body.password
    let id = req.body.id
    let telephone = req.body.telephone
    let power = "test"
    //2、将数据封装成对象
    let data = { id, username, password, power, telephone }
    console.log(data)
    //判断是否已经存在
    let result = findUser(username)
    console.log(11111)
    console.log(result)
    if (result ) {
        //3、创建数据库的连接对象
        let conn = mysql.createConnection(dbconfig);
        //4、将数据插入到数据库中
        conn.query('insert into user set ?', [data], function (err, result) {
            if (err) {
                res.send({
                    code: 1001,
                    info: '数据插入失败'
                })
            } else {
                res.send({
                    code: 1002,
                    info: '注册成功'
                })
            }
        })
        //5、关闭数据库连接
        conn.end((err) => {
            if (err) {
                console.log(err)
                return
            }
        })
    }
    else {
        res.send({
            code: 1003,
            info: '用户已存在'
        })
    }
    return 

})

function findUser(username) {
    let conn = mysql.createConnection(dbconfig);
    let results = conn.query('select * from user where username=? ', username, function (err, results, fields) {
        if (err) {
            throw err
        }
        console.log(88888)
        console.log(results)//输出查询结果    
        return results
    })
    //3、关闭数据库的连接
    conn.end((err) => {
        if (err) {
            console.log(err)
            return
        }
    }
    )
    return results
}


module.exports = router;
