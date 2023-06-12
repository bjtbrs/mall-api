var createError = require('http-errors');
//导入express
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var crudRouter =require('./routes/crud')
var loginRouter =require('./routes/login')
var menuRouter =require('./routes/menu')

//创建web服务器
var app = express();
var http = require('http')
var server = http.createServer(app)
// var cors=require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());//解析json格式的数据
app.use(express.urlencoded({ extended: false }));//解析urlencoded格式的数据（固定格式）
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//定义静态资源
// app.use(cors())
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});




app.use('/', indexRouter);
app.use('/users', usersRouter);//第一个参数表示路由前缀
app.use('/crud',crudRouter);
app.use('/login',loginRouter);
app.use('/menu',menuRouter);

// catch 404 and forward to error handler全局中间件函数（有next的函数），即当客户端发送请求时都会经过
app.use(function(req, res, next) {
  next(createError(404));//进入下一个阶段
});

// error handler错误级别中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//
server.listen("3001")

module.exports = app;
