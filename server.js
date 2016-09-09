var app = require('koa')();
var Router = require('koa-router');
var json = require('koa-json');
var cors = require('koa-cors');
var co = require('co');
var serve = require('koa-static')
var session = require('koa-session');

var routes = require('./routes/index')

app.use(json());
app.use(cors());
// app.use(session(app));
app.keys = ['some secret hurr'];
app.use(session(app));

routes(app);

app.use(serve('dist'))

app.listen(8888);
console.log("listen port 8888")
