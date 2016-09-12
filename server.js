var app = require('koa')();
var Router = require('koa-router');
var json = require('koa-json');
var cors = require('koa-cors');
var co = require('co');
var serve = require('koa-static')
var session = require('koa-session');
// var mongoose = require('mongoose');

var routes = require('./routes/index')

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/blog');
// mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

app.use(json());
app.use(cors());
app.keys = ['some secret hurr'];
app.use(session(app));

routes(app);

app.use(serve('dist'))

app.listen(8888);
console.log("listen port 8888")
